import { Header } from '~/components/Header'
import { Summary } from '~/components/Summary'
import { TransactionContext } from '~/contexts/TransactionsContext'
import { dataFormatter, priceFormatter } from '~/utils/formatter'
import { useContextSelector } from 'use-context-selector'

import { SearchForm } from './components/SearchForm'
import * as S from './styles'

export const Transactions = () => {
  const transactionList = useContextSelector(
    TransactionContext,
    (context) => context.transactionList
  )

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
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </S.PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dataFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  )
}
