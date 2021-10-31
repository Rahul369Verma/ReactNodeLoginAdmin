import { useContext, useState } from "react"
import { Context } from '../context';
import RegisterAdmin from './RegisterAdmin'
import { Link,  } from 'react-router-dom'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';




const Navigator = () => {
  const { state } = useContext(Context)
  const [toggle, setToggle] = useState(false)



  const toggleModal = () => {
    setToggle(!toggle);
  }

  useState(()=>{},[state])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {(state.type === "admin") ? (
              <Nav.Link
                onClick={toggleModal} >
                Register Admin
              </Nav.Link>
            ) : (
              (state.type === "normal") ? (
                <></>
              ) : (
                ((window.location.pathname) === "/" || (window.location.pathname) === "/login" || (window.location.pathname) === "/register" ) && (
                  <>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                  </>
                )
              )
            )}
            <RegisterAdmin isOpen={toggle} toggleModal={toggleModal} />
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/user">User</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {(state.email || state.username) && (
            <Nav>
              <li style={{ float: "left", paddingRight: "5px" }}>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </li>
              <Nav.Link className="">
                <li className="text-center" >
                  <span className="p-2 avatar avatar-32 rounded bg-danger">{state.username}
                  </span>
                </li>
              </Nav.Link>
            </Nav>
          )}

        </Navbar.Collapse>
      </Container >
    </Navbar >
  )
}

export default Navigator
