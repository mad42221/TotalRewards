import { rest } from 'msw'

export const handlers = [
    rest.get('/transactionData', (_req, res, ctx) => {
        return res(
            ctx.json([
                {
                    customerId: 187,
                    customerName: "John Smith",
                    orderAmount: 120,
                    transactionDate: "05-01-2020"
                },
                {
                    customerId: 187,
                    customerName: "John Smith",
                    orderAmount: 75,
                    transactionDate: "05-21-2020"
                },
                {
                    customerId: 187,
                    customerName: "John Smith",
                    orderAmount: 94,
                    transactionDate: "05-21-2020"
                },
                {
                    customerId: 187,
                    customerName: "John Smith",
                    orderAmount: 10,
                    transactionDate: "06-01-2020"
                },
                {
                    customerId: 187,
                    customerName: "John Smith",
                    orderAmount: 75,
                    transactionDate: "06-21-2020"
                },
                {
                    customerId: 414,
                    customerName: "Mike",
                    orderAmount: 125,
                    transactionDate: "05-01-2020"
                },
                {
                    customerId: 414,
                    customerName: "Mike",
                    orderAmount: 75,
                    transactionDate: "05-21-2020"
                },
                {
                    customerId: 414,
                    customerName: "Mike",
                    orderAmount: 10,
                    transactionDate: "06-01-2020"
                },
                {
                    customerId: 414,
                    customerName: "Mike",
                    orderAmount: 75,
                    transactionDate: "06-21-2020"
                },
                {
                    customerId: 414,
                    customerName: "Mike",
                    orderAmount: 224,
                    transactionDate: "07-21-2020"
                },
                {
                    customerId: 207,
                    customerName: "Peter",
                    orderAmount: 120,
                    transactionDate: "05-21-2020"
                },
                {
                    customerId: 207,
                    customerName: "Peter",
                    orderAmount: 190,
                    transactionDate: "07-21-2020"
                },
                {
                    customerId: 207,
                    customerName: "Peter",
                    orderAmount: 80,
                    transactionDate: "6-21-2020"
                }
            ])
        )
    }),
]