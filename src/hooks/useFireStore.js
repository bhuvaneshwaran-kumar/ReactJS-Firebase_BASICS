import { useState, useEffect } from "react";
import { db } from '../firebase.example'

export const useFireStore = (collection) => {
    const [docs, setDocs] = useState([])

    useEffect(() => {
        const unSub = db.collection(collection)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let document = []
                snap.forEach(doc => {
                    document.push({ ...doc.data(), id: doc.id })
                })
                setDocs(document)
            })

        return () => unSub && unSub()
        // this is a cleanup function that react will run when a component using the hooks unMounts.
    }, [collection])

    return { docs }
}