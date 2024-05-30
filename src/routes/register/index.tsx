import { Button, Input, Link } from '@nextui-org/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'

export const Route = createFileRoute('/register/')({
  component: Register,
})

const url = 'http://localhost:5096/register'

function Register() {
  const [email, setEmail] = useState<string | null>('')
  const [password, setPassword] = useState<string | null>('')
  const [confirmPassword, setConfirmPassword] = useState<string | null>('')

  const navigate = useNavigate()

  const registerFetch = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error('Los campos son obligatorios.')
      return
    }

    if (password != confirmPassword) {
      toast.error('Las contraseñas deben ser iguales.')
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
        if (response.status === 400) {
          toast.error(`El usuario ya existe`)
        }
        return
      }

      navigate({
        to: '/',
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
      <div className="grid h-screen place-content-center">
        <h2 className="text-3xl font-bold mb-14 text-secondary md:min-w-[28rem]">Nos alegra que te quieras unir :)</h2>
        <form action="POST" className="grid gap-4" onSubmit={registerFetch}>
          <Input placeholder="Ingrese el correo" name="email" type="email" autoCapitalize="off" onChange={(e) => setEmail(e.target.value)}></Input>
          <Input placeholder="Ingrese la contraseña" name="password" type="password" autoCapitalize="off" onChange={(e) => setPassword(e.target.value)}></Input>
          <Input placeholder="Confirme la contraseña" name="password" type="password" autoCapitalize="off" onChange={(e) => setConfirmPassword(e.target.value)}></Input>

          <Button color="secondary" onClick={registerFetch}>
            Registrate
          </Button>
          <Button color="secondary" variant="bordered" as={Link} href="/">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </section>
  )
}
