import { useContextSelector } from 'use-context-selector'

import { TransactionContext } from './../contexts/TransactionsContext'

export function useSummary() {
  const transactionList = useContextSelector(
    TransactionContext,
    (context) => context.transactionList
  )

  const summary = transactionList.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }
      return acc
    },
    { income: 0, outcome: 0, total: 0 }
  )
  return summary
}
