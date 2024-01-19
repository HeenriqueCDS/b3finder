import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
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
    updatedAt: String!
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
`;

const resolvers = {
  Query: {
    history: async (parent, args, context) => {
      return [
        {
          quoteSymbol: "AAPL",
          date: 1697547600,
          open: 17700,
          high: 17700,
          low: 17700,
          volume: 17700,
          adjustedClose: 17700,
        },
      ];
    },
    quotes: async (parent, args, context) => {
      return [
        {
          symbol: "AAPL",
          currency: "USD",
          shortName: "Apple Inc.",
          longName: "Apple Inc.",
          regularMarketPrice: 0,
          regularMarketChange: 0,
          regularMarketChangePercent: 0,
          logoUrl: "https://logo.clearbit.com/apple.com",
          updatedAt: "2021-03-19T20:00:00.000Z",
          fiftyTwoWeekLow: 0,
          fiftyTwoWeekHigh: 0,
          marketCap: 0,
          regularMarketVolume: 0,
          regularMarketOpen: 0,
          regularMarketDayHigh: 0,
          regularMarketDayLow: 0,
          regularMarketPreviousClose: 0,
        },
      ];
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
