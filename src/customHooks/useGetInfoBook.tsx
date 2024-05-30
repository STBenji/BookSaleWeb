import { useState, useEffect } from 'react'

interface IBooks {
  id: number
  title: string
  author: string
  imageUrl: string
  gender: string
  language: string
}

export const useGetInfoBooks = () => {
  const [data, setData] = useState<IBooks>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [idBook, setIdBook] = useState<number | undefined>(undefined) 

  const fetchDataInfoBook = async (id?: number) => {
    if (id === undefined || id === null) return 
    const url = `http://localhost:5096/api/Books/${id}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      setData(result)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataInfoBook(idBook)
  }, [idBook])

  return { data, loading, error, fetchDataInfoBook, setIdBook }
}
