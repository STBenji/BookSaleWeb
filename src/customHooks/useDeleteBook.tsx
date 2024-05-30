import { useEffect, useState } from 'react'

export const useDeleteBook = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [idBook, setIdBook] = useState<number | undefined>(undefined) // Inicializar con null

  const deleteBook = async (id?: number) => {
    const url = `http://localhost:5096/api/Books/${id}`
    if (id === undefined || id === null) return
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (!response.ok) {
        setError('Network response was not ok')
      }
    } catch (error: any) {
      setError('Error al borrar el libro')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    deleteBook(idBook)
  }, [idBook])

  return { error, loading, deleteBook, setIdBook }
}
