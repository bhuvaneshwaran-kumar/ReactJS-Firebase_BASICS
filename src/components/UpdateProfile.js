import React, { useState, useRef } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function UpdateProfile() {
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const history = useHistory()

    function handleSubmit(event) {
        event.preventDefault()
        let emailValue = emailRef.current.value
        let passwordValue = passwordRef.current.value
        let confirmPasswordValue = confirmPasswordRef.current.value

        if (confirmPasswordValue !== passwordValue) return setError('Password did not Match..!')

        const promises = []
        setLoading(true)
        if (currentUser.email !== emailValue) promises.push(updateEmail(emailValue))

        if (passwordValue) promises.push(updatePassword(passwordValue))

        console.log(promises)

        Promise.all(promises)
            .then(() => {
                history.push('/')
            })
            .catch(() => {
                setError('Failed to update Profile.')
            })
            .finally(() => {
                setLoading(false)
            })

    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email :</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password :</Form.Label>
                            <Form.Control type="password" ref={passwordRef}
                                placeholder="Leave Blank to keep the same password."
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password Confirmation :
                            </Form.Label>
                            <Form.Control type="password" placeholder="Leave Blank to keep the same password" ref={confirmPasswordRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel.</Link>
            </div>
        </>
    )
}


