import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import Book from '../components/Book'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchbookList } from '../features/books/bookList-slice'



function HomeScreen() {
  const dispatch = useDispatch()
  const bookList = useSelector(state => state.bookList)
  const { error, loading, books } = bookList

  
  useEffect(() => {
      dispatch(fetchbookList())
  }, [dispatch])
  return (
    <div>
      <div className='ml-auto'>
      <DropdownButton variant='secondary' id="dropdown-basic-button" title="Genre">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Romance</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Adventure</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Horror</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Drama</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Science fiction</Dropdown.Item>
      </DropdownButton>

      </div>
        { loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
            :
            <div>
              {books.length === 0 && <Message variant='info'><h1>No Books Uploaded...</h1></Message>}
              <Row>
                {books.map(book => (
                    <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
                        <Book book={book} />
                    </Col>
                ))}
              </Row>
            </div>
        }
      </div>
  )
}

export default HomeScreen
