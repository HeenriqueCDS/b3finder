import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from "../gql/schema";
import { db } from "./database/client";
import { importTicker } from "./queue/sqs";

const typeDefs = `#graphql
  scalar Date
  type History {
    quoteSymbol: String!
    date: Int!
    open: Float!
    high: Float!
    low: Float!
    volume: Int!
    adjustedClose: Float!
  }
  type Query {
    history(quoteSymbol: String!): [History]
  }

  type Quote {
    symbol: String!
    currency: String!
    shortName: String!
    longName: String!
    regularMarketPrice: Float!
    regularMarketChange: Float!
    regularMarketChangePercent: Float!
    logoUrl: String!
    updatedAt: Date!
    fiftyTwoWeekLow: Float!
    fiftyTwoWeekHigh: Float!
    marketCap: Float!
    regularMarketVolume: Float!
    regularMarketOpen: Float!
    regularMarketDayHigh: Float!
    regularMarketDayLow: Float!
    regularMarketPreviousClose: Float!
  }
  type Query {
    quotes: [Quote!]!
  }
  type Query {
    quote(symbol: String!): Quote
  }
`;

const resolvers: Resolvers = {
  Query: {
    history: async (parent, args, context) => {
      const history = await db.history.findMany({where: {quoteSymbol: args.quoteSymbol}, orderBy: {date: "asc"}});
      return history;
    },
    quotes: async (parent, args, context) => {
      const quotes = await db.quote.findMany({});
      return quotes;
    },
    quote: async (parent, args, context) => {
      const quote = await db.quote.findUnique({where: {symbol: args.symbol}});

      if (!quote) {
        await importTicker(args.symbol)
        return null
      }

      return quote;
    },

  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
