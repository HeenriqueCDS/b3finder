/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type History = {
  __typename?: 'History';
  adjustedClose: Scalars['Float']['output'];
  date: Scalars['Int']['output'];
  high: Scalars['Float']['output'];
  low: Scalars['Float']['output'];
  open: Scalars['Float']['output'];
  quoteSymbol: Scalars['String']['output'];
  volume: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  history?: Maybe<Array<Maybe<History>>>;
  quote?: Maybe<Quote>;
  quotes: Array<Quote>;
};


export type QueryHistoryArgs = {
  quoteSymbol: Scalars['String']['input'];
};


export type QueryQuoteArgs = {
  symbol: Scalars['String']['input'];
};

export type Quote = {
  __typename?: 'Quote';
  currency: Scalars['String']['output'];
  fiftyTwoWeekHigh: Scalars['Float']['output'];
  fiftyTwoWeekLow: Scalars['Float']['output'];
  logoUrl: Scalars['String']['output'];
  longName: Scalars['String']['output'];
  marketCap: Scalars['Float']['output'];
  regularMarketChange: Scalars['Float']['output'];
  regularMarketChangePercent: Scalars['Float']['output'];
  regularMarketDayHigh: Scalars['Float']['output'];
  regularMarketDayLow: Scalars['Float']['output'];
  regularMarketOpen: Scalars['Float']['output'];
  regularMarketPreviousClose: Scalars['Float']['output'];
  regularMarketPrice: Scalars['Float']['output'];
  regularMarketVolume: Scalars['Float']['output'];
  shortName: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};
