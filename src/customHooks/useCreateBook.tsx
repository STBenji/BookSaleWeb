import { useState } from 'react'

interface DataBook {
  author: string
  title: string
  imageUrl: string
  gender: string
  language: string
}

const url = 'http://localhost:5096/api/Books'

export const useCreateBook = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBook = async (data: DataBook) => {
    setLoading(true)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })

      if (!response.ok) {
        setError('Error en la respuesta del servidor')
      }

      
    } catch (error) {
      setError('Hubo un error al crear el libro.')
    } finally {
      setLoading(false)
    }
  }

  return { createBook, loading, error }
}
