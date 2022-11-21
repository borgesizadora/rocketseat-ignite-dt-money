import { useEffect, useState } from 'react'

import { Header } from '~/components/Header'
import { Summary } from '~/components/Summary'
import { useTransactionsContext } from '~/contexts/TransactionsContext'

import { SearchForm } from './components/SearchForm'
import * as S from './styles'

export const Transactions = () => {
  const { transactionList } = useTransactionsContext()

  return (
    <div>
      <Header />
      <Summary />
      <S.TransactionsContainer>
        <SearchForm />
        <S.TransactionsTable>
          <tbody>
            {transactionList.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <S.PriceHighlight variant={transaction.type}>
                      {transaction.price}
                    </S.PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  )
}
