import React, { useState, useRef } from 'react'
import { Form, Card, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, Redirect } from 'react-router-dom'


function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState()
    const { currentUser } = useAuth()


    async function handleSubmit(event) {
        event.preventDefault()
        let emailValue = emailRef.current.value

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailValue)
            setMessage('Check your inbox for further instructions.')
        }
        catch (err) {
            setError('Failed to reset Password')
        }
    }
    return (
        <>
            {currentUser && <Redirect to="/" />}

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {
                        error && <Alert variant="danger">{error}</Alert>
                    }
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email :</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Reset password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}

export default ForgotPassword
