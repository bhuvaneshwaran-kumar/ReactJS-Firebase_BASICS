import { useState, useEffect } from 'react'
import { projectStorage, serverTimestamp, db } from '../firebase.example'
import { useAuth } from '../contexts/AuthContext'
export const useFireStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)
    const { currentUser } = useAuth()
    useEffect(() => {
        if (!file) return
        const storageRef = projectStorage.ref(`${currentUser.uid}/${file.name}`)
        const imagesRef = db.collection('images')


        storageRef.put(file).on('state_change', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(percentage)
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await storageRef.getDownloadURL()
            const createdAt = serverTimestamp()
            const name = file.name
            await imagesRef.add({ url, createdAt, name })
            setUrl(url)
        })

    }, [file])

    return { progress, error, url }

}