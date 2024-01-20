import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  quote: Quote;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  History: ResolverTypeWrapper<History>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Quote: ResolverTypeWrapper<Quote>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  History: History;
  Int: Scalars['Int']['output'];
  Query: {};
  Quote: Quote;
  String: Scalars['String']['output'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type HistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['History'] = ResolversParentTypes['History']> = {
  adjustedClose?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  high?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  low?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quoteSymbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  history?: Resolver<Maybe<Array<Maybe<ResolversTypes['History']>>>, ParentType, ContextType, RequireFields<QueryHistoryArgs, 'quoteSymbol'>>;
  quote?: Resolver<ResolversTypes['Quote'], ParentType, ContextType, RequireFields<QueryQuoteArgs, 'symbol'>>;
  quotes?: Resolver<Array<ResolversTypes['Quote']>, ParentType, ContextType>;
};

export type QuoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Quote'] = ResolversParentTypes['Quote']> = {
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fiftyTwoWeekHigh?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  fiftyTwoWeekLow?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  logoUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  longName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  marketCap?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  regularMarketChange?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  regularMarketChangePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  regularMarketDayHigh?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  regularMarketDayLow?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  regularMarketOpen?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  regularMarketPreviousClose?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  regularMarketPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  regularMarketVolume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  shortName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  History?: HistoryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Quote?: QuoteResolvers<ContextType>;
};

