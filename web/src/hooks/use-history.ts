import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { History } from "../types/history";

export interface HistoryQuery {
    history: History[]
  }
export interface useHistoryParams {
    symbol: string;
    chartRange: '1wk' | '1mo' | '3mo' | '';
}

const getHistoryQueryDocument = gql`
query history ($quoteSymbol: String!, $range: String) {
  history (quoteSymbol: $quoteSymbol, range: $range) {
    date,
    open,
    high,
    low,
    adjustedClose,
    volume
  }
}   
`

const useHistory = ({symbol, chartRange}: useHistoryParams) => useQuery({
  queryKey: [`${symbol}-history`],
  queryFn: async () => {
    const { history } = await request<HistoryQuery>(
      "http://localhost:4000",
      getHistoryQueryDocument,
      { quoteSymbol: symbol, range: chartRange }
    );
    return history;
  },
});

export { useHistory };
