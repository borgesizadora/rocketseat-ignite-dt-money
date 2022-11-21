import { ReactNode, useEffect, useState } from 'react'

import { api } from '~/lib/axios'
import { createContext } from 'use-context-selector'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}
interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}
interface TransactionsContextType {
  transactionList: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionsContextType)

interface TransactionContextProviderProps {
  children: ReactNode
}

export const TransactionProvider = ({ children }: TransactionContextProviderProps) => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactionList(response.data)
  }

  async function createTransaction({ category, description, price, type }: CreateTransactionInput) {
    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date()
    })
    setTransactionList((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionContext.Provider value={{ transactionList, fetchTransactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}
