import { useTransactionsContext } from '~/contexts/TransactionsContext'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { useTheme } from 'styled-components'

import * as S from './styles'

export const Summary = () => {
  const theme = useTheme()

  const { transactionList } = useTransactionsContext()

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
  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={theme['green-300']} />
        </header>
        <strong>{summary.income}</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={theme['red-300']} />
        </header>
        <strong>{summary.outcome}</strong>
      </S.SummaryCard>
      <S.SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={theme.white} />
        </header>
        <strong>{summary.total}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  )
}
