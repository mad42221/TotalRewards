import { React, useState } from 'react'
import { historyData } from '../data/transactionMockData';

export default function Home() {

    const [transcationdata, setTranscationData] = useState(historyData);
    const [totalRewards, setTotalRewards] = useState(null);
    const [monthlyRewards, setMonthlyRewards] = useState(null);
    const [totalCustomerOrders, setTotalCustomerOrders] = useState([]);
    const [customerMonthlyOrders, setCustomerMonthlyOrders] = useState(null);

    function RewardsCalculation(amount) {
        let totalPoints = 0;
        if (amount > 100) {
            totalPoints = (amount - 100) * 2 + 50;
        } else if (amount > 50 && amount <= 100) {
            totalPoints = amount - 50;
        } else {
            totalPoints = 0;
        }
        return totalPoints;

    }

    function monthlyTransactions() {
        // totalCustomerOrders.forEach(element => {
        transcationdata.map((item, index) => {
            const extractedMonth = new Date(item.dateOfTransaction).getMonth();
            item.monthOfOrder = extractedMonth;
        })
        // });
        console.log('updated transactions', transcationdata)
    }

    let mainResult;
    function customerBasedOrders() {
        mainResult = transcationdata.reduce(function (hash) {
            return function (r, individualTransaction) {
                if (!hash[individualTransaction.customerName]) {
                    hash[individualTransaction.customerName] = [];
                    r.push(hash[individualTransaction.customerName]);
                }
                hash[individualTransaction.customerName].push(individualTransaction)
                return r;
            };
        }(Object.create(null)), []);

        return setTotalCustomerOrders(mainResult)

    }
    console.log('customer based orders', totalCustomerOrders);

    let monthlyOrderResults;

    function monthlyOrders() {
        // monthlyOrderResults = totalCustomerOrders.forEach(item => {
        monthlyOrderResults = transcationdata.reduce(function (hash) {
            return function (r, individualTransaction) {
                if (!hash[individualTransaction.monthOfOrder]) {
                    hash[individualTransaction.monthOfOrder] = [];
                    r.push(hash[individualTransaction.monthOfOrder]);
                }
                hash[individualTransaction.monthOfOrder].push(individualTransaction)
                return r;
            };
        }(Object.create(null)), []);

        return setCustomerMonthlyOrders(monthlyOrderResults)
        // })
    }

    console.log('customer based monthly orders', customerMonthlyOrders);

    const totalTranscationData = [];
    function totalRewardsCalculation() {
        totalCustomerOrders.forEach(transaction => {
            let totalRewards = 0;
            const name = transaction[0].customerName;
            transaction.map((item, index) => {
                const rewardsPerTranscation = RewardsCalculation(parseInt(item.orderAmount));
                totalRewards = totalRewards + rewardsPerTranscation;
            })
            totalTranscationData.push({ nameOfcustomer: name, totalRewards: totalRewards });

        })

        return setTotalRewards(totalTranscationData);

    }

    console.log('Total Rewards', totalRewards);

    const monthlyRewardsForCustomers = [];
    function monthlyCustomerRewards() {
        customerMonthlyOrders.forEach(transaction => {
            let totalRewards = 0;
            let customer;
            const month = transaction[0].monthOfOrder;
            transaction.map((item, index) => {
                const rewardsPerTranscation = RewardsCalculation(parseInt(item.orderAmount));
                totalRewards = totalRewards + rewardsPerTranscation;
                customer = item.customerName;
                if (index < transaction.length && item.customerName !== transaction[index + 1].customerName) {
                    monthlyRewardsForCustomers.push({ indexOfMonth: month + 1, nameOfcustomer: customer, totalRewards: totalRewards });
                }
            })
            monthlyRewardsForCustomers.push({ indexOfMonth: month + 1, nameOfcustomer: customer, totalMonthlyRewards: totalRewards });

        })

        return setMonthlyRewards(monthlyRewardsForCustomers);

    }

    console.log('Monthly Rewards', monthlyRewards);



    return (
        <div>
            <div>
                <button onClick={monthlyTransactions}>Update Orders to reflect months</button>
                <button onClick={customerBasedOrders}>Individual Customer Orders</button>
                <button onClick={monthlyOrders}>Monthly Customer Orders</button>
                <button onClick={totalRewardsCalculation}>Total Rewards</button>
                <button onClick={monthlyCustomerRewards}>Monthly Rewards</button>
            </div>

            <div>
                {totalRewards && (
                    <ul>
                        {totalRewards.map((transcation, index) => {
                            <li key={index}>
                                <p>{transcation.customerName} has total of {transcation.totalRewardsOfMonths}</p>

                            </li>
                        })}
                    </ul>
                )}
            </div>

        </div>

    )
}
