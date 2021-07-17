
import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { db, serverTimestamp } from '../firebase.example'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'


export function Create({ ...rest }) {
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const history = useHistory()

    const goToPrevPage = () => history.goBack()

    const fetchRandomUserData = async () => {

        try {
            const responce = await fetch(`https://randomuser.me/api/?results=1&inc=name,nat`)
            let { results } = await responce.json()
            return results[0]
        }
        catch (err) {
            console.log(err)
        }

    }

    const addData = async () => {
        setMessage('')
        setLoading(true)
        try {
            const usersRef = await db.collection('users')
            let randomUserData = await fetchRandomUserData()

            if (!randomUserData) return

            randomUserData = {
                name: `${randomUserData.name.title}.${randomUserData.name.first} ${randomUserData.name.last} `,
                uid: currentUser.uid,
                createdAt: serverTimestamp()
            }
            await usersRef.add(randomUserData)
            setMessage(`${randomUserData.name} is successfully added in your fireStore database`)
        }
        catch (err) {
            console.log('error While Creating Data')
        }

        setLoading(false)

    }

    return (
        <>
            <Card className='w-100 h-300'>
                <Card.Body>
                    {
                        message && <Alert variant='success'>
                            {message}
                        </Alert>
                    }

                    <Button disabled={loading} className={`${loading ? 'opacity-4 btn btn-success w-100 ' : 'btn btn-success w-100'}`} onClick={addData} >Add Random User Data</Button>
                </Card.Body>
            </Card>
            <div className='w-100 text-center'>
                <p className="link-primary btn" onClick={goToPrevPage}>Go Prev</p>
            </div>
        </>
    )
}

