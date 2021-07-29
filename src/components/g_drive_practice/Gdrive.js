import React, { useRef } from 'react'
import { projectStorage, db } from '../../firebase.example'
import {useAuth} from '../../contexts/AuthContext'
function Gdrive() {
    const fileRef = useRef()
    const formRef = useRef()

    const {currentUser} = useAuth()

    console.log(currentUser.uid)
    const handleFileChange = () => {
        const files = fileRef.current.files
        let file = files[0]
        console.log(file)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // const fileExist = bucket.
        const fileExist = projectStorage.ref(currentUser.uid)

        let check = fileExist.child('01.jpg')

        check.getMetadata()
        .then((metadata)=>{
            console.log(metadata)
        })
        .catch((err)=>console.log(err))

        // fileExist.getMetaData().then((metadata)=>console.log(metadata))
        // .catch((err)=>alert(err))




    }

    return (
        <div>
            in gdrive practice area.

            <form ref={formRef} onSubmit={handleSubmit}>
                <input type="text" name="album" placeholder="Enter your album name" />
                <button>create Folder</button>
            </form>

            <input ref={fileRef} onChange={handleFileChange} type="file" multiple accept="image/*" />
        </div>
    )
}

export default Gdrive
