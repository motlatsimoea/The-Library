import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams, Link } from 'react-router-dom'
import CommentScreen from './CommentScreen'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBook } from '../features/books/bookDetails-slice'

function BookScreen() {

  const bookDetails = useSelector((store) => store.bookDetails)
  const { loading:book_loading, error:book_error, book:book_details } = bookDetails
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBook(id))
  }, [dispatch, id]);

//console.log(book_details.book.author)
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
                    <Image src={book_details.book.image} alt={book_details.book.title} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup>
                      <ListGroup.Item>
                        Title: <h3>{book_details.book.title}</h3>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Author: <h4>{book_details.book.author}</h4>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Synopsis: <h4>{book_details.book.description}</h4>
                      </ListGroup.Item>
                      
                    </ListGroup>
                </Col>
              </Row>

              {/* <Row className='pt-3'>
                <h3>Comments</h3>
                <CommentScreen Book_id={id} bookComments={book_details.comments.comments} />
              </Row> */}
            </>
          )
       } 

      

    </div>
  )
}

export default BookScreen
