import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from "../gql/schema";
import { db } from "./database/client";
import { importTicker } from "./queue/sqs";
import { typeDefs } from "./type-defs";

const resolvers: Resolvers = {
  Query: {
    history: async (parent, args, context) => {
      const history = await db.history.findMany({
        where: { quoteSymbol: args.quoteSymbol },
        orderBy: { date: "asc" },
      });
      return history;
    },
    quotes: async (parent, args, context) => {
      const quotes = await db.quote.findMany({});
      return quotes;
    },
    quote: async (parent, args, context) => {
      const quote = await db.quote.findUnique({
        where: { symbol: args.symbol },
      });

      if (!quote) {
        await importTicker(args.symbol);
        return null;
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
