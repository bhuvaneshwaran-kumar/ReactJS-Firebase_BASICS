import React, { useState } from 'react'
import { Alert, Card, Button, Container, Row, Col } from 'react-bootstrap'
import { db } from '../firebase.example'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

export function Delete() {
    const history = useHistory()
    const goToPrevPage = () => history.goBack()
    const alertVarient = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'warning',
        'dark',
    ]

    const [users, setUsers] = useState([])
    const { currentUser } = useAuth()
    async function getData() {
        const userRef = await db.collection('users')
        let userData = await userRef.where('uid', '==', currentUser.uid).orderBy('createdAt', 'desc').limit(8).get()

        userData = userData.docs

        userData = userData.map(user => {
            return {
                id: user.id,
                ...user.data()
            }
        })
        setUsers(userData)

    }

    const updateDom = (index) => {
        const newUsers = [...users]

        newUsers.splice(index, 1)

        setUsers(newUsers)

    }

    const removeUser = async (docId, index) => {
        try {
            const userRef = await db.collection('users')
            await userRef.doc(docId).delete()
            updateDom(index)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Card>
                <Card.Body>
                    <Container>
                        {
                            users && users.map((user, index) => (
                                <Row className="d-flex mb-2" key={user.id}>
                                    <Col className="w-100 flex-grow-1"  > <Alert className="fw-bolder m-0 p-0" variant={alertVarient[index]}>{user?.name}</Alert ></Col>
                                    <Col className="flex-grow-0 bg-danger rounded-2 text-light btn m-0 p-0 px-2"
                                        onClick={() => removeUser(user.id, index)}
                                    >Delete</Col>
                                </Row>
                            ))
                        }
                    </Container>



                    <Button className="w-100 btn btn-danger " disabled={true} onClick={getData}>
                        Update User
                    </Button>

                </Card.Body>
            </Card>
            <div className='w-100 text-center'>
                <p className="link-primary btn" onClick={goToPrevPage}>Go Prev</p>
            </div>

        </>
    )
}


