export interface Quote {
    symbol: string
    currency: string
    shortName: string
    longName: string
    regularMarketPrice: number
    regularMarketChange: number
    regularMarketChangePercent: number
    logoUrl: string
    updatedAt: Date | string
    fiftyTwoWeekLow: number
    fiftyTwoWeekHigh: number
    marketCap: number
    regularMarketVolume: number
    regularMarketOpen: number
    regularMarketDayHigh: number
    regularMarketDayLow: number
    regularMarketPreviousClose: number
}