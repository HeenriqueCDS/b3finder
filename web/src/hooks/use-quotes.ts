import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

interface QuotesQuery {
  quotes: {
    symbol: string;
    longName: string;
    logoUrl: string;
    regularMarketPrice: number;
    currency: string;
  }[];
}

const listQuotesQueryDocument = gql`
  query quotes {
    quotes {
      symbol
      longName
      regularMarketPrice
      logoUrl
      currency
    }
  }
`;
export const useQuotes = () => useQuery({
  queryKey: ["quotes"],
  queryFn: async () => {
    const { quotes } = await request<QuotesQuery>(
      "http://localhost:4000",
      listQuotesQueryDocument
    );
    return quotes;
  },
});
