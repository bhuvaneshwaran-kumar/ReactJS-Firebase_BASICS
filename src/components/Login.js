import React, { useState, useRef } from 'react'
import { Card, Button, Alert, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { logIn } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const formSubmit = async (event) => {
        event.preventDefault()

        try {
            setError('')
            setLoading(false)
            let emailValue = emailRef.current.value
            let passwordValue = passwordRef.current.value
            await logIn(emailValue, passwordValue)
            history.push('/')
        } catch (e) {
            setError('Failed to Login..!')
            passwordRef.current.value = ''
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={formSubmit}>
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
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Login</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password ?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sigin Up</Link>
            </div>
        </>
    )
}
