import React, { useState } from 'react'
import { Alert, Card, Button } from 'react-bootstrap'
import { db } from '../../firebase.example'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'


export function Read() {
    const history = useHistory()
    const goToPrevPage = () => history.goBack()

    const alertVarient = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
    ]

    const [users, setUsers] = useState([])
    const { currentUser } = useAuth()
    const getData = async () => {
        const userRef = await db.collection('users')
        let userData
        if (users.length > 0) {
            userData = await userRef.where('uid', '==', currentUser.uid).orderBy('createdAt', 'desc').startAfter(users[users.length - 1].createdAt).limit(4).get()
        } else {
            userData = await userRef.where('uid', '==', currentUser.uid).orderBy('createdAt', 'desc').limit(4).get()
        }

        userData = userData.docs

        userData = userData.map(user => {
            return {
                id: user.id,
                ...user.data()
            }
        })


        setUsers(userData)

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <div >
                        {
                            users && users.map((user, index) => (
                                <Alert className="font-weight-bold" key={user.id} variant={alertVarient[index]}>{user?.name}</Alert >
                            ))
                        }
                    </div>



                    <Button className='w-100' onClick={getData}>
                        Get Users
                    </Button>
                </Card.Body>
            </Card>
            <div className='w-100 text-center'>
                <p className="link-primary btn" onClick={goToPrevPage}>Go Prev</p>
            </div>

        </>
    )
}


