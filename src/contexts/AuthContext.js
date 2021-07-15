import React, { useEffect, useContext, useState } from 'react'
import { auth } from '../firebase.example'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState('hi')
    const [loading, setLoading] = useState(true)

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logOut() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }


    useEffect(() => {
        let unSubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unSubscribe
    }, [])


    const values = {
        currentUser,
        logIn, signUp, resetPassword, updateEmail, updatePassword, logOut
    }


    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
