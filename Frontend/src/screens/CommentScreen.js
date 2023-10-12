import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Card, Button, Form } from 'react-bootstrap'
import {  MDBCardImage, MDBIcon } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createComment } from '../features/books/Comment-slice'
import { comment_reset } from '../features/books/Comment-slice'
import { fetchBook } from '../features/books/bookDetails-slice'



function CommentScreen({ Book_id, bookComments }) {
    const userLogin = useSelector((store) => store.userLogin)
    const { userInfo } = userLogin

    const userComment = useSelector((store) => store.comment)
    const { loading, error, success } = userComment
    
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const commentData = {
        book: Book_id,
        content:comment,
    }

    useEffect(() => {
        if(success){
            setComment('')
            dispatch(comment_reset())
        }

        dispatch(fetchBook(Book_id))
        
    }, [dispatch, Book_id, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createComment(commentData))
    }
  return (
        
            <Container className="py-1">
                {loading && <Loader />}
                {success && <Message variant='success'>Comment Posted</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {userInfo ? (
                    <FormContainer>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    row='5'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button
                                disabled={loading}
                                type='submit'
                                variant='primary'
                            >
                                Submit
                            </Button>

                        </Form>
                    </FormContainer>
                    
                ) : (
                        <Message variant='info'>Please <Link to='/login'>login</Link> to write a comment</Message>
                    )}

                {bookComments && bookComments.length > 0 ? (
                        <Row className="justify-content-left">
                        <Col md={12} lg={10} xl={9}>
                        <Card>
                            <Card.Body className="p-4">
                            <Row>
                                <Col>
                                    {bookComments.map((comment) => (
                                        <div key={comment.id} className="d-flex flex-start">
                                        <MDBCardImage
                                        className="rounded-circle shadow-1-strong me-3"
                                        src={comment.author.profile.image}
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                        />
    
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                    {comment.author.username}{" "}
                                                    <span className="small">{comment.timestamp}</span>
                                                </p>
                                                {/* <a href="#!">
                                                    <MDBIcon fas icon="reply fa-xs" />
                                                    <span className="small"> reply</span>
                                                </a> */}
                                                </div>
                                                <p className="small mb-0">
                                                    {comment.content}
                                                </p>
                                            </div>
    
                                        
                                            {/* <div className="d-flex flex-start mt-4">
                                                <a className="me-3" href="#">
                                                <MDBCardImage
                                                    className="rounded-circle shadow-1-strong me-3"
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                                                    alt="avatar"
                                                    width="65"
                                                    height="65"
                                                />
                                                </a>
    
                                                <div className="flex-grow-1 flex-shrink-1">
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1">
                                                            John Smith{" "}
                                                            <span className="small">- 4 hours ago</span>
                                                        </p>
                                                        </div>
                                                        <p className="small mb-0">
                                                        the majority have suffered alteration in some
                                                        form, by injected humour, or randomised words.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        </div>
                                    ))}
                                    
                                </Col>
                            </Row>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                ):
                (
                    <p>No comments available.</p>
                )
                }   
                
            </Container>
       
  )
}

export default CommentScreen
