import React, { useState } from 'react'
import { Container, Nav, Navbar, Modal, Button, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/users/auth-slice'


function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((store) => store.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
  


  return (
    <>
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">The Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {userInfo && 
          <Nav className="me-auto">
            <Nav.Link href="/upload"><i className='fas fa-upload'></i>Upload</Nav.Link>
            <Nav.Link onClick={handleShow}><i className='fas fa-bell'></i>Notes</Nav.Link>
          </Nav>
        }
            

            {userInfo ? (
              <NavDropdown title={userInfo.username} id='username'>
                <LinkContainer to={`/profile/${userInfo.username}`}>
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
              </NavDropdown>
            ): (
              <Nav>
                <Nav.Link href="/register" className='ml-auto'><i className='fas fa-user-plus'></i>register</Nav.Link>
                <Nav.Link href="/login" className='ml-auto'><i className='fas fa-user'></i>Login</Nav.Link> 
              </Nav>
            )}
          
      </Container>
    </Navbar>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sinazo Commented on your Post</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
      </Modal>
    </>
    
  )
}

export default Header
