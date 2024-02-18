import { Resolvers } from "../gql/schema";
import { db } from "./database/client";
import { importTicker } from "./queue/sqs";
import { startTimestamp1MonthAgo, startTimestamp1WeekAgo, startTimestamp3MonthsAgo } from "./utils/timestamp";

const resolvers: Resolvers = {
  Query: {
    history: async (parent, args, context) => {
      const { range } = args;
      const history = await db.history.findMany({
        where: { quoteSymbol: args.quoteSymbol },
        orderBy: { date: "asc" },
      });
      if (history.length < 10) return [];
      const filteredHistory = history.filter((h) => {
        if (range == "1wk") return h.date >= startTimestamp1WeekAgo;
        if (range == "1mo") return h.date >= startTimestamp1MonthAgo;
        if (range == "3mo") return h.date >= startTimestamp3MonthsAgo;
        return true;
      });
      // if (filteredHistory.length < 5 && range == "1wk")
      //   await importTicker(args.quoteSymbol);
      // if (filteredHistory.length < 22 && range == "1mo")
      //   await importTicker(args.quoteSymbol);
      // if (filteredHistory.length < 62 && range == "3mo")
      //   await importTicker(args.quoteSymbol);
      return filteredHistory;
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

export { resolvers };
