import { Button, Input, Link, Image } from '@nextui-org/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'

export const Route = createFileRoute('/')({
  component: Page,
})

const url = 'http://localhost:5096/login?useCookies=true&useSessionCookies=true'

function Page() {
  const [email, setEmail] = useState<string | null>('')
  const [password, setPassword] = useState<string | null>('')

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const navigate = useNavigate()

  const loginFetch = async () => {
    if (!email || !password) {
      toast.error('Los campos de correo electrónico o contraseña están vacíos.')
      return
    }

    const data = {
      email,
      password,
    }

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
        if (response.status === 401) {
          toast.error('La contraseña es incorrecta')
        } else {
          toast.error(`Error: ${response.statusText}`)
        }
        return
      }

      navigate({
        to: '/dashboard',
      })
    } catch (error) {
      toast.error('Oppss!!', {
        description: 'Ha habido un problema con su operación de fetch.',
      })
    }
  }

  return (
    <section className="px-5 text-center ">
      <Toaster position="top-right" closeButton richColors />
      <div className="grid h-screen place-content-center ">
        <h2 className="text-3xl font-bold mb-14 text-secondary md:min-w-[28rem]">Bienvenido a CBook</h2>
        <form action="POST" className="grid gap-4" onSubmit={loginFetch}>
          <Input placeholder="Ingrese el correo" name="email" type="email" autoCapitalize="off" onChange={(e) => setEmail(e.target.value)}></Input>
          <Input placeholder="Ingrese la contraseña" name="password" type={isVisible ? 'text' : 'password'} autoCapitalize="off" onChange={(e) => setPassword(e.target.value)} endContent={<Image src="eye.svg" onClick={toggleVisibility} className="cursor-pointer" />}></Input>

          <Button color="secondary" onClick={loginFetch}>
            Iniciar sesión
          </Button>
          <Button color="secondary" variant="bordered" as={Link} href="/register">
            Registrate
          </Button>
        </form>
      </div>
    </section>
  )
}
