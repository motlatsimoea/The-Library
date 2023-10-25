import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Book({ book }) {
  return (
    <Card className='my-3 p-3 rounded'>

            <Link to={`/book/${book.id}`}>
                <Card.Title as="div">
                    <h2>{book.title}</h2>
                </Card.Title>
            </Link>
        <Link to={`/book/${book.id}`}>
            <Card.Img src={book.image}  className="float-end" />
        </Link>
        <Card.Body>
            <Link to={`/book/${book.id}`}>
                <Card.Title as="div">
                    <h4>{book.script_title}</h4>
                </Card.Title>
            </Link>
            <Link>
                <Card.Text>
                   By: <strong>{book.author}</strong> 
                </Card.Text>
            </Link>
            <h5>Description</h5>
            <Card.Text>
                {book.description}
            </Card.Text>
        </Card.Body> 
    </Card>
  )
}

export default Book
