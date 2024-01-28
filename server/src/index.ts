import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from "../gql/schema";
import { db } from "./database/client";
import { importTicker } from "./queue/sqs";
import { typeDefs } from "./type-defs";
import { startTimestamp1MonthAgo, startTimestamp1WeekAgo, startTimestamp3MonthsAgo } from "./utils/timestamp";



const resolvers: Resolvers = {
  Query: {
    history: async (parent, args, context) => {
      const { range } = args; 
      let where = { quoteSymbol: args.quoteSymbol, AND: {} };

      if (range == "1wk") where.AND = { date: { gte: startTimestamp1WeekAgo } };
      if (range == "1mo") where.AND = { date: { gte: startTimestamp1MonthAgo } };
      if (range == "3mo") where.AND = { date: { gte: startTimestamp3MonthsAgo } };

      const history = await db.history.findMany({
        where,
        orderBy: { date: "asc" },
      });

      if (history.length < 5 && range == "1wk") await importTicker(args.quoteSymbol);
      if (history.length < 22 && range == "1mo") await importTicker(args.quoteSymbol);
      if (history.length < 62 && range == "3mo") await importTicker(args.quoteSymbol);
      
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
