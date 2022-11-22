import { memo } from 'react'
import { useForm } from 'react-hook-form'

import { TransactionContext } from '~/contexts/TransactionsContext'
import { MagnifyingGlass } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import * as zod from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './styles'

const searchFormSchema = zod.object({
  query: zod.string()
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

const SearchFormComponent = () => {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => context.fetchTransactions
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Busque por transações" {...register('query')} />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
