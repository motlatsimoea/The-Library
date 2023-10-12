import React, { useEffect } from 'react'
import { Row, Col, Container, Card} from 'react-bootstrap'
import { MDBTypography } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Book from '../components/Book'
import { useNavigate, Link } from 'react-router-dom'
import { userprofile } from '../features/users/profile-slice'

function ProfileScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userProfile = useSelector((store) => store.profile)
    const {loading, error, user, userbooks } = userProfile

    const userLogin = useSelector((store) => store.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            dispatch(userprofile(user.username))
        }
    }, [dispatch, navigate, userInfo, user])

  return (
    <div>
        {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
        :(
            <Container>
            <h1>Profile Page</h1>
            <Row className='justify-content-left align-items-center h-100'>
                <Col lg={12} xl={12}>
                    <Card>
                        <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                            <div className='ms-4 mt-5 d-flex flex-column' style={{ width: '150px' }}>
                                <Card.Img src={ user.profile.image }
                                alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }}/>
                            </div>
                            <div className="ms-3" style={{ marginTop: '110px' }}>
                                <MDBTypography tag="h5">{user.username}</MDBTypography>
                                <MDBTypography tag="h5">{user.email}</MDBTypography>
                                <Card.Text>New York, USA</Card.Text>
                            </div>
                        </div>
                        <div className='p-4 text-black' style={{ backgroundColor: '#f8f9fa' }}>
                            <div className="d-flex justify-content-end text-center py-1">
                                <div className="px-3">
                                    {userInfo.id === user.id &&

                                    <Link to={'/profile/edit'} outline variant="dark" className="btn" style={{height: '35px', overflow: 'visible'}}>
                                        Edit Profile
                                    </Link>
                                    }
                                </div>
                                
                            </div>
                        </div>

                        <Card.Body className="text-black p-4">
                            <div className="mb-5">
                                <h3 className="lead fw-normal mb-1">About</h3>
                                <div className="mb-1" style={{ backgroundColor: '#f8f9fa' }}>
                                    <Card.Text as='p' className="mb-1">{ user.profile.bio }</Card.Text>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Card.Text className="lead fw-normal mb-0"><h3>My Books/Scripts</h3></Card.Text>
                            </div>

                            <Row>
                            {userbooks.map(book => (
                                <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
                                    <Book book={book} />
                                </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        ) 
        
      }
    </div>
    
  )
}

export default ProfileScreen
