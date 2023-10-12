import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { uploadBook } from '../features/books/bookUpload-slice'

function UploadScreen() {
  const {register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => { 

    const categories = data.genre.split(',').map((category) => category.trim());
    console.log('Genre before sending to the backend:', categories);
    const formData = new FormData()

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('author', data.author);
    formData.append('genre', categories);
    formData.append('image', data.image[0]);
    formData.append('script', data.script[0]);
    dispatch(uploadBook(formData))
    navigate('/')

  }

  return (
    <div>
       <FormContainer>
          <h1>Upload..</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId='title'>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Book Title'
                {...register('title')}
                >
                </Form.Control>

              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description/Synopsis</Form.Label>
                <Form.Control
                rows={5}
                type='textarea'
                placeholder='Brief summary...'
                {...register('description')}
                >
                </Form.Control>

              </Form.Group>

              <Form.Group controlId='author'>
                <Form.Label>Author</Form.Label>
                <Form.Control
                type='text'
                placeholder='Author...'
                {...register('author')}
                >
                </Form.Control>

              </Form.Group>

              <Form.Group controlId='genre'>
                <Form.Label>Genre(s)</Form.Label>
                <Form.Control
                type='text'
                placeholder='Separate by comma for more than one...'
                {...register('genre')}
                >
                </Form.Control>
              </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type='file'
                      {...register('image')}
                    >
                    </Form.Control>

                </Form.Group>
              
                <Form.Group controlId='script'>
                  <Form.Label>Book/Script</Form.Label>
                  <Form.Control
                    type='file'
                    {...register('script')}
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
