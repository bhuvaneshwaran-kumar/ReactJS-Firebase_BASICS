import React, { useState, useRef } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { db } from '../firebase.example'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

export function Update() {
    const input = useRef()
    const history = useHistory()
    const goToPrevPage = () => history.goBack()
    const [update, setUpdate] = useState(false)


    const [users, setUsers] = useState([])
    const { currentUser } = useAuth()
    async function getData() {
        const userRef = await db.collection('users')
        let userData = await userRef.where('uid', '==', currentUser.uid).orderBy('createdAt', 'desc').limit(1).get()

        userData = userData.docs

        userData = userData.map(user => {
            return {
                id: user.id,
                ...user.data()
            }
        })


        setUsers(userData)

    }
    useEffect(() => {
        getData()

        return () => { }
    }, [])


    const editUser = () => {
        setUpdate(true)
        console.log(input.current)
        input.current.removeAttribute('disabled')
        input.current.focus()

    }

    const updateUser = async () => {
        const userRef = await db.collection('users')
        let docId = input.current.dataset.docid
        await userRef.doc(docId).set({
            name: input.current.value,
        }, {
            merge: true
        })
        console.log(input.current.value, docId)
        setUpdate(false)
        input.current.setAttribute('disabled', '')
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Container>
                        {
                            users && users.map((user, index) => (
                                <Row className="d-flex mb-2" key={user.id}>
                                    <Col className="w-100 flex-grow-1"  >
                                        <input data-docid={user.id} ref={input} className={`w-100 border-0 bg-secondary rounded-3 text-light form-control`} defaultValue={user.name} disabled />
                                    </Col>
                                    <Col className="flex-grow-0 bg-dark rounded-2 text-light btn m-0 p-0 px-2" onClick={() => editUser(user.id)}>Edit</Col>
                                </Row>
                            ))
                        }
                    </Container>



                    <Button className="w-100 btn btn-danger " disabled={!update} onClick={updateUser}>
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


function returnReadElm(elm) {


    return (
        <h1>Hiiiii</h1>
    )

}