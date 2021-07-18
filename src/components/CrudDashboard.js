import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
function Dashboard({ name }) {
    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState()
    const history = useHistory()

    async function handleLogOut() {
        setError('')
        try {
            await logOut()
            history.push('/login')
        }
        catch (err) {
            setError('Failed to LogOut!.')
        }
    }

    return (
        <>
            <Card>
                <Card.Body className="">
                    <h2 className="text-center mb-4">Profile.</h2>
                    {
                        error && <Alert variant='danger'>{error}</Alert>
                    }
                    <strong>Email :</strong> {currentUser.email}
                    <div className="d-flex justify-content-around mt-2 flex-wrap">
                        <Link to="/create" className="btn btn-primary">Create</Link>
                        <Link to="/read" className="btn btn-secondary">Read</Link>
                        <Link to="/update" className="btn btn-info">Update</Link>
                        <Link to="/delete" className="btn btn-danger">Delete</Link>
                        <Link to='/search-in-array' className="btn btn-secondary m-2">SearchInArray</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button onClick={handleLogOut} variant="link">Log Out</Button>
            </div>
        </>
    )
}

export default Dashboard
