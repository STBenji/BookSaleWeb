import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, CardHeader, CardFooter, Image, Pagination, Spinner, Link } from '@nextui-org/react'
import { NavbarComponent } from '../../components/navbar/navbar'
import { useState } from 'react'
import { ModalComponent } from '../../components/modal/modal'
import { useGetBooks } from '../../customHooks/useGetBooks'
import { ModalCreateBook } from '../../components/modal/modalCreateBook'
import Swal from 'sweetalert2'
import { useDeleteBook } from '../../customHooks/useDeleteBook'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [isOpenBook, setIsOpenBook] = useState<Boolean>(false)
  const [idBook, setIdBook] = useState<number>(0)
  const { data, loading, error, fetchData } = useGetBooks()

  const { deleteBook } = useDeleteBook()

  const modalEdit = () => {
    setIsOpen(!isOpen)
  }

  const openEditModal = (id: number) => {
    setIdBook(id)
    setIsOpen(true)
  }

  const modalCreateBook = () => {
    setIsOpenBook(!isOpenBook)
  }

  const itemsPerPage = 4

  if (loading) {
    return (
      <div className="grid h-screen gap-4 place-content-center">
        <Spinner size="lg" />
        <h2 className="font-bold">Cargando...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid h-screen gap-2 place-content-center">
        <h2 className="text-2xl font-bold">Error: {error}</h2>
        <Button variant="bordered" color="secondary" as={Link} href="/">
          Volver al inicio de sesión
        </Button>
      </div>
    )
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleBooks = data.slice(startIndex, startIndex + itemsPerPage)

  const deleteBookId = (id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este libro?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBook(id)
        fetchData()
        Swal.fire('¡Eliminado correctamente!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se guardaron los cambios', '', 'info')
      }
    })
  }

  return (
    <section className="relative min-h-screen">
      <NavbarComponent />
      {isOpen && <ModalComponent cerrarModal={modalEdit} idBook={idBook} fetchData={fetchData} />}
      {isOpenBook && <ModalCreateBook cerrarModal={modalCreateBook} fetchData={fetchData} />}
      <div className="flex justify-around mt-10">
        <h2 className="text-2xl font-bold">Tus libros</h2>
        <Button color="secondary" onClick={modalCreateBook}>
          Crear libro
        </Button>
      </div>
      <section className="flex flex-wrap items-center justify-center gap-3 mb-12 p-7 md:mb-0">
        {visibleBooks.map((item) => (
          <Card isFooterBlurred className="relative w-full sm:w-1/2 md:w-2/5 lg:w-1/5 group" key={item.id}>
            <CardHeader className="absolute z-10 flex-col items-start p-2 transition-opacity duration-300 rounded-md opacity-0 group-hover:opacity-100 bg-gradient-to-b from-black/100 to-transparent">
              <p className="font-bold uppercase text-tiny text-white/60">{item.author}</p>
              <h4 className="text-xl font-medium text-white/90">{item.title}</h4>
            </CardHeader>
            <Image removeWrapper alt={item.title} className="z-0 object-cover w-full h-[50vh]" src={item.imageUrl} />
            <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex items-center flex-grow gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-tiny text-white/60">{item.gender}</p>
                  <p className="font-bold text-white text-tiny">{item.language}</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Button
                  radius="full"
                  size="sm"
                  onClick={() => {
                    openEditModal(item.id)
                  }}
                >
                  Editar
                </Button>
                <Button radius="full" size="sm" color="secondary" onClick={() => deleteBookId(item.id)} className="z-50">
                  Eliminar
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
      <div className="fixed left-0 z-20 w-full bottom-5">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <p className="text-white sm:text-black">Página actual: {currentPage}</p>
            <Pagination total={Math.ceil(data.length / itemsPerPage)} color="secondary" page={currentPage} onChange={setCurrentPage} />
            <div className="flex gap-2">
              <Button size="sm" variant="bordered" color="secondary" onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}>
                Anterior
              </Button>
              <Button size="sm" variant="bordered" color="secondary" onClick={() => setCurrentPage((prev) => (prev < Math.ceil(data.length / itemsPerPage) ? prev + 1 : prev))}>
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
