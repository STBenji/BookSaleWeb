import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'

interface IModal {
  cerrarModal: () => void
}

export default function ModalComponent({ cerrarModal }) {
  const closeModal = () => {
    cerrarModal()
  }

  return (
    <>
      <Modal isOpen={true} onOpenChange={closeModal}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Editar libro</ModalHeader>
            <ModalBody>
              <form action="post" className="flex flex-col gap-5">
                <Input type="text" name="author" placeholder="Pepito Perez" />
                <Input type="text" name="title" placeholder="Título del libro" />
                <Input type="text" name="urlImage" placeholder="Digite la url de la imagen" />
                <Input type="text" name="gender" placeholder="Digite los generos del libro" />
                <Input type="text" name="gender" placeholder="Idiomas del libro" />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onPress={closeModal}>
                Confirmar cambios
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
