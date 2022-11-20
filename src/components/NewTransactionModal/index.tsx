import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

import * as S from './styles'

export const NewTransactionModal = () => {
  return (
    <Dialog.Portal>
      <S.Overlay />
      <S.Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>

        <form action="">
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />
          <S.TransactionType>
            <S.TransactionTypeButton type="button" variant="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </S.TransactionTypeButton>
            <S.TransactionTypeButton type="button" variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saida
            </S.TransactionTypeButton>
          </S.TransactionType>
          <button type="submit">Cadastrar</button>
        </form>
      </S.Content>
    </Dialog.Portal>
  )
}
