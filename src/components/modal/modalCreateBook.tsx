import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { FC, useState } from 'react'
import { useCreateBook } from '../../customHooks/useCreateBook'
import { Toaster, toast } from 'sonner'

interface ModalCreateBookProps {
  cerrarModal: () => void
  fetchData: () => void
}

interface DataBook {
  author: string
  title: string
  imageUrl: string
  gender: string
  language: string
}

export const ModalCreateBook: FC<ModalCreateBookProps> = ({ cerrarModal, fetchData }) => {
  const [author, setAuthor] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [imageUrl, setUrlImage] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [language, setLanguage] = useState<string>('')

  const { createBook } = useCreateBook()

  const data: DataBook = {
    author,
    title,
    imageUrl,
    gender,
    language,
  }

  const closeModal = () => {
    cerrarModal()
  }

  const fetchCreateBook = async (data: DataBook) => {
    if (!author || !title || !imageUrl || !gender || !language) {
      toast.error('Todos los campos son obligatorios.')
      return
    }

    await createBook(data)

    toast.success('Libro creado correctamente.')
    fetchData()
    closeModal()
  }

  const handleSubmit = () => {
    fetchCreateBook(data)
  }

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      <Modal isOpen={true} onOpenChange={closeModal}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Crea tu libro</ModalHeader>
            <ModalBody>
              <form action="post" className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <Input type="text" name="author" label="Autor del libro" size="sm" onChange={(e) => setAuthor(e.target.value)} isRequired />
                <Input type="text" name="title" label="Titulo del libro" size="sm" onChange={(e) => setTitle(e.target.value)} isRequired />
                <Input type="text" name="urlImage" label="URL de la imagen" size="sm" onChange={(e) => setUrlImage(e.target.value)} isRequired />
                <Input type="text" name="gender" label="Género/s del libro" size="sm" onChange={(e) => setGender(e.target.value)} isRequired />
                <Input type="text" name="gender" label="Idiomas disponibles del libro" size="sm" onChange={(e) => setLanguage(e.target.value)} isRequired />
              </form>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button color="secondary" onPress={handleSubmit}>
                Crear libro
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
