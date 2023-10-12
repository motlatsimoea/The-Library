import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { uploadBook } from '../features/books/bookUpload-slice'

function UploadScreen() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [image, setImage] = useState(null)
  const [script, setScript] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const submitHandler = async (e) =>{ 
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('author', author)
    formData.append('genre', genre)
    formData.append('image', image)
    formData.append('script', script)

    dispatch(uploadBook(formData))
    navigate('/')

  }

  return (
    <div>
       <FormContainer>
          <h1>Upload..</h1>
          <Form onSubmit={submitHandler}>
              <Form.Group controlId='title'>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                type='title'
                placeholder='Enter Book Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                >

                </Form.Control>

              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description/Synopsis</Form.Label>
                <Form.Control
                rows={3}
                type='textarea'
                placeholder='Brief summary...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                >
                  
                </Form.Control>

              </Form.Group>

              <Form.Group controlId='author'>
                <Form.Label>Author</Form.Label>
                <Form.Control
                type='title'
                placeholder='Author...'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                  
                </Form.Control>

              </Form.Group>

              <Form.Group controlId='genre'>
                <Form.Label>Genre(s)</Form.Label>
                <Form.Control
                type='text'
                placeholder='Separate by comma for more than one...'
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                >
                  
                </Form.Control>
              </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='file'
                        onChange={(e) => setImage(e.target.files[0])}
                    >
                    </Form.Control>

                </Form.Group>
              
                <Form.Group controlId='script'>
                  <Form.Label>Book/Script</Form.Label>
                  <Form.Control
                    type='file'
                    onChange={(e) => setScript(e.target.files[0])}
                    >
                  </Form.Control>
                </Form.Group>

                <Button className='mt-1' type='submit' variant='dark'>
                    Post
                </Button>
          </Form>
      </FormContainer>
    </div>
  )
}

export default UploadScreen
