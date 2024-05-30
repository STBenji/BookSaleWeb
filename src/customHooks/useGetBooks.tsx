import { useState, useEffect } from 'react'

interface IBooks {
  id: number
  title: string
  author: string
  imageUrl: string
  gender: string
  language: string
}

const url = 'http://localhost:5096/api/Books'

export const useGetBooks = () => {
  const [data, setData] = useState<IBooks[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Inautorizado, por favor inicie sesión.')
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
    fetchData()
  }, [])

  return { data, loading, error, fetchData }
}
