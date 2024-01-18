export default {
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
            ]
        }
    }
}