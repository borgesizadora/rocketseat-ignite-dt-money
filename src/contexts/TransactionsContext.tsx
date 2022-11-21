import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}
interface TransactionsContextType {
  transactionList: Transaction[]
}

export const TransactionContext = createContext({} as TransactionsContextType)

interface TransactionContextProviderProps {
  children: ReactNode
}

export const TransactionProvider = ({ children }: TransactionContextProviderProps) => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactionList(data)
      })
  }, [])

  return (
    <TransactionContext.Provider value={{ transactionList }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionsContext = () => useContext(TransactionContext)
