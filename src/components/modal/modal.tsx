import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { FC, useEffect, useState } from 'react'
import { useGetInfoBooks } from '../../customHooks/useGetInfoBook'
import { useEditBook } from '../../customHooks/useEditBook'
import { Toaster, toast } from 'sonner'

interface ModalCreateBookProps {
  cerrarModal: () => void
  fetchData: () => void
  idBook: number
}

interface DataBook {
  id: number
  author: string
  title: string
  imageUrl: string
  gender: string
  language: string
}

export const ModalComponent: FC<ModalCreateBookProps> = ({ cerrarModal, idBook, fetchData }) => {
  const [author, setAuthor] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [imageUrl, setUrlImage] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [language, setLanguage] = useState<string>('')

  const { data, fetchDataInfoBook } = useGetInfoBooks()
  const { editBook } = useEditBook()

  const dataEdit: DataBook = {
    id: idBook,
    author,
    title,
    imageUrl,
    gender,
    language,
  }

  const closeModal = () => {
    cerrarModal()
  }

  const fetchEditBook = async (dataEdit: DataBook) => {
    if (!author || !title || !imageUrl || !gender || !language) {
      toast.error('Todos los campos son obligatorios.')
      return
    }
    await editBook(dataEdit, idBook)

    toast.success('Libro editado correctamente.')
    fetchData()
    closeModal()
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchDataInfoBook(idBook)
    }

    if (idBook !== null) {
      fetch()
    }
  }, [idBook])

  useEffect(() => {
    if (data) {
      setAuthor(data.author)
      setTitle(data.title)
      setUrlImage(data.imageUrl)
      setGender(data.gender)
      setLanguage(data.language)
    }
  }, [data])

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      <Modal isOpen={true} onOpenChange={closeModal}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Editar libro</ModalHeader>
            <ModalBody>
              <form action="post" className="flex flex-col gap-5">
                <Input type="text" name="author" label="Autor del libro" size="sm" onChange={(e) => setAuthor(e.target.value)} isRequired value={author} />
                <Input type="text" name="title" label="Titulo del libro" size="sm" onChange={(e) => setTitle(e.target.value)} isRequired value={title} />
                <Input type="text" name="urlImage" label="URL de la imagen" size="sm" onChange={(e) => setUrlImage(e.target.value)} isRequired value={imageUrl} />
                <Input type="text" name="gender" label="Género/s del libro" size="sm" onChange={(e) => setGender(e.target.value)} isRequired value={gender} />
                <Input type="text" name="language" label="Idiomas disponibles del libro" size="sm" onChange={(e) => setLanguage(e.target.value)} isRequired value={language} />
              </form>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button color="secondary" onClick={() => fetchEditBook(dataEdit)}>
                Editar libro
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <Toaster position="top-right" />
    </>
  )
}
