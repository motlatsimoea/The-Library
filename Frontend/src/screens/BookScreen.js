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

  const bookImage = book_details && book_details.book ? book_details.book.image : <p>Loading...</p>;
  const bookTitle = book_details && book_details.book ? book_details.book.title : <p>Loading...</p>;
  const bookAuthor = book_details && book_details.book ? book_details.book.author : <p>Loading...</p>;
  const bookDescription = book_details && book_details.book ? book_details.book.description : <p>Loading...</p>;
  const username = book_details && book_details.book ? book_details.book.username : <p>Loading...</p>;

  const bookComments = book_details && book_details.comments ? book_details.comments : <p>Loading...</p>;

  console.log(bookComments);
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
                    <Image src={bookImage} alt={bookTitle} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup>
                      <ListGroup.Item>
                        Title: <h3>{bookTitle}</h3>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Author: <h4>{bookAuthor}</h4>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Synopsis: <h4>{bookDescription}</h4>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        posted by: <h5 className='d-inline'>{username}</h5>
                      </ListGroup.Item>
                      
                    </ListGroup>
                </Col>
              </Row>

              <Row className='pt-3'>
                <h3>Comments</h3>
                <CommentScreen Book_id={id} bookComments={bookComments} />
              </Row>
            </>
          )
       } 

      

    </div>
  )
}

export default BookScreen
