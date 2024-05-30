import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, CardHeader, CardFooter, Image, Pagination } from '@nextui-org/react'
import { NavbarComponent } from '../../components/navbar/navbar'
import { useState } from 'react'
import ModalComponent from '../../components/modal/modal'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const modalEdit = () => {
    setIsOpen(!isOpen)
  }
  const itemsPerPage = 4

  const books = [
    { author: 'Stiven', link: 'https://m.media-amazon.com/images/I/61iOugQFnGL._AC_UF1000,1000_QL80_.jpg', title: 'Damian', gender: 'Acción, Ciencia ficción', language: 'Español, Inglés, Aleman' },
    { author: 'Stiven', link: 'https://m.media-amazon.com/images/I/61iOugQFnGL._AC_UF1000,1000_QL80_.jpg', title: 'Damian', gender: 'Acción, Ciencia ficción', language: 'Español, Inglés, Aleman' },
    { author: 'Stiven', link: 'https://m.media-amazon.com/images/I/61iOugQFnGL._AC_UF1000,1000_QL80_.jpg', title: 'Damian', gender: 'Acción, Ciencia ficción', language: 'Español, Inglés, Aleman' },
    { author: 'Stiven', link: 'https://m.media-amazon.com/images/I/61iOugQFnGL._AC_UF1000,1000_QL80_.jpg', title: 'Damian', gender: 'Acción, Ciencia ficción', language: 'Español, Inglés, Aleman' },
    { author: 'Stiven', link: 'https://m.media-amazon.com/images/I/61iOugQFnGL._AC_UF1000,1000_QL80_.jpg', title: 'Damian', gender: 'Acción, Ciencia ficción', language: 'Español, Inglés, Aleman' },
    { author: 'Stiven', link: 'https://m.media-amazon.com/images/I/61iOugQFnGL._AC_UF1000,1000_QL80_.jpg', title: 'Damian', gender: 'Acción, Ciencia ficción', language: 'Español, Inglés, Aleman' },
    { author: 'Stiven', link: 'https://m.media-amazon.com/images/I/61iOugQFnGL._AC_UF1000,1000_QL80_.jpg', title: 'Damian', gender: 'Acción, Ciencia ficción', language: 'Español, Inglés, Aleman' },
  ]

  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleBooks = books.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="relative min-h-screen">
      <NavbarComponent />
      {isOpen && <ModalComponent cerrarModal={modalEdit} />}
      <section className="flex flex-wrap items-center justify-center gap-3 mb-12 p-7 md:mb-0">
        {visibleBooks.map((item, index) => (
          <Card isFooterBlurred className="w-full sm:w-1/2 md:w-1/5 lg:w-1/5" key={index}>
            <CardHeader className="absolute z-10 flex-col items-start top-1">
              <p className="font-bold uppercase text-tiny text-white/60">{item.author}</p>
              <h4 className="text-xl font-medium text-white/90">{item.title}</h4>
            </CardHeader>
            <Image removeWrapper alt="Relaxing app background" className="z-0 object-cover w-full h-full" src={item.link} />
            <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex items-center flex-grow gap-2">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">{item.gender}</p>
                  <p className="text-tiny text-white/60">{item.language}</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <Button radius="full" size="sm" onClick={modalEdit}>
                  Editar
                </Button>
                <Button radius="full" size="sm" color="secondary">
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
            <Pagination total={Math.ceil(books.length / itemsPerPage)} color="secondary" page={currentPage} onChange={setCurrentPage} />
            <div className="flex gap-2">
              <Button size="sm" variant="bordered" color="secondary" onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}>
                Anterior
              </Button>
              <Button size="sm" variant="bordered" color="secondary" onClick={() => setCurrentPage((prev) => (prev < Math.ceil(books.length / itemsPerPage) ? prev + 1 : prev))}>
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
