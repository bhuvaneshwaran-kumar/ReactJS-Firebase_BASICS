import React, { useState } from 'react'
import { Alert, Card, Button } from 'react-bootstrap'
import { db } from '../firebase.example'
import { useAuth } from '../contexts/AuthContext'
export function Read() {

    const [users, setUsers] = useState([])
    const { currentUser } = useAuth()
    const getData = async () => {
        const usersDataRef = await db.collection('UsersData')
        let usersData = await usersDataRef.where('uid', '==', currentUser.uid).limit(4).get()

        try {
            let paginatedResult = await usersDataRef.orderBy('nat').endBefore('FR').limit(4).get()

            paginatedResult = paginatedResult.docs

            paginatedResult = paginatedResult.map(datas => datas.data().nat)

            console.log(paginatedResult)

        } catch (err) { console.log(err) }
        if (usersData.empty) return console.log(`no document present in db. `)

        usersData = usersData.docs

        usersData = usersData.map(userData => userData.data())


        console.log('geting data from firestore db', usersData)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Button className='w-100' onClick={getData}>
                        Get Users
                    </Button>
                </Card.Body>
            </Card>

        </>
    )
}


