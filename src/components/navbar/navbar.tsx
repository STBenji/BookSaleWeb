import { Button, Link, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle, Navbar, NavbarMenuItem } from '@nextui-org/react'
import { useState } from 'react'

export const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [{ name: 'Libros', link: '/dashboard' }]

  const url = 'http://localhost:5096/api/Auth/signOut'

  const logOut = async () => {
    try {
      await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        <NavbarBrand>
          <p className="font-bold text-inherit">Cbook</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="/dashboard">
            Libros
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="secondary" href="/" variant="flat" onClick={logOut}>
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="foreground" className="w-full" href={item.link} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
