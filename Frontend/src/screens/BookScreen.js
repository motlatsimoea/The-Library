import React from 'react'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams, Link } from 'react-router-dom'
import CommentScreen from './CommentScreen'
import { useSelector } from 'react-redux'

function BookScreen() {
  const bookDetails = useSelector((store) => store.bookDetails)

  const { loading:book_loading, error:book_error, book:book_details } = bookDetails
  const { id:Book_id } = useParams()
  return (

    <div>
      <Link to='/' className='btn btn-dark my-3'>Go Back</Link>

       {book_loading ? 
          <Loader />
          : book_error ?
          <Message variant='danger'>{book_error}</Message>
          :
          (
            <>
              <Row>
                <Col md={3}>
                    <Image src={book_details.image} alt={book_details.title} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup>
                      <ListGroup.Item>
                        Title: <h3>{book_details.title}</h3>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Author: <h4>{book_details.author}</h4>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Synopsis: <h4>{book_details.description}</h4>
                      </ListGroup.Item>
                      
                    </ListGroup>
                </Col>
              </Row>

              <Row className='pt-3'>
                <h3>Comments</h3>
                <CommentScreen Book_id={Book_id} bookComments={book_details.comments} />
              </Row>
            </>
          )
       } 

      

    </div>
  )
}

export default BookScreen
