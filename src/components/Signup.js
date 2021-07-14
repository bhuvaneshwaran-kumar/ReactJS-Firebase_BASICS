import React, { useState, useRef } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
function Signup() {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const history = useHistory()
    const submitForm = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            setError('')
            let emailValue = emailRef.current.value
            let passwordValue = passwordRef.current.value
            let confirmPasswordValue = confirmPasswordRef.current.value

            if (passwordValue !== confirmPasswordValue) return setError('password is not match with the confirm password')

            await signUp(emailValue, passwordValue)
            history.push('/')
        }
        catch (err) {
            setError('Failed to signUp!.')
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Signup</h2>
                    {
                        error && <Alert variant="danger">{error}</Alert>
                    }
                    <Form onSubmit={submitForm}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} required type="email" placeholder="Enter your email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} required type="password" placeholder="Enter your password" />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Confirm Password :</Form.Label>
                            <Form.Control required ref={confirmPasswordRef} type="password" placeholder="Enter your confirm password." />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">SignUp</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Click Here</Link> to login.
            </div>
        </>
    )
}

export default Signup
