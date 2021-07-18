import React from 'react'
import { useEffect } from 'react'
import { db } from '../../firebase.example'

export function SearchInArray() {


    const addTenUserArray = async (userArr) => {
        try {
            const userRef = await db.collection('users')
            await userRef.add({
                userList: userArr
            })
            console.log('added')
        } catch (err) { console.log(err); }
    }

    //["bhuvan","mani","ragha"] array-contains ["mani","govind","nithya"]
    const arrayContainsAny = async () => {
        try {
            const userRef = await db.collection('users')
            let data = await userRef.where('userList', 'array-contains-any', ["Levi", "Jenny"]).get()
            console.log(data.docs[0].data())
        }
        catch (Err) { console.log(Err) }
    }


    //["bhuvan","mani","ragha"] array-contains "mani"
    const arrayContains = async () => {
        try {
            const userRef = await db.collection('users')
            let data = await userRef.where('userList', 'array-contains', "Jenny").get()
            console.log(data.docs[0].data())
        }
        catch (Err) { console.log(Err) }
    }


    // "bhuvan" IN ["MANI","Bhuvan","Sneka","Vasanth","Ragha"]
    const arrayIn = async () => {
        try {
            const userRef = await db.collection('users')
            let data = await userRef.where('userList', 'in',
                ["Jenny", "Levi", "Mason", "النا", "Arthur", "Aatu", "Lucílio", "Andre", "Minea", "Mátio"]).get()
            console.log(data.docs)
        }
        catch (Err) { console.log(Err) }
    }

    //["bhuvan","mani","ragha"] not-in ["govind","twasif","siddharth"]
    const arrayNotIn = async () => {
        try {
            const userRef = await db.collection('users')
            let data = await userRef.where('userList', 'not-in', ["Levi", "Jenny"]).get()
            console.log(data.docs[0].data())
        }
        catch (Err) { console.log(Err) }
    }

    useEffect(() => {
        arrayContainsAny()
        arrayContains()
        arrayIn()
        arrayNotIn()
        const fetchRandomUserData = async () => {

            try {
                const responce = await fetch(`https://randomuser.me/api/?results=10&inc=name,nat`)
                let { results } = await responce.json()
                results = results.map(user => user.name.first)
                return results
            }
            catch (err) {
                console.log(err)
            }

        }
        // fetchRandomUserData().then(result => {
        //     console.log(result)
        //     // addTenUserArray(result)
        // })
    }, [])



    return (
        <div>
            SearchInArray
        </div>
    )
}

