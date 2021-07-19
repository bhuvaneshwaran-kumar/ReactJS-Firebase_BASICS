import React, { useEffect } from 'react'
import { useFireStorage } from '../../hooks/useFireStorage'
import { motion } from 'framer-motion'

export function ProgressBar({ file, setFile }) {

    let { url, progress } = useFireStorage(file)

    useEffect(() => {
        if (url) {
            setFile(null)
        }
    }, [url, setFile])
    return (
        <motion.div className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: progress + '%' }}
        >

        </motion.div>
    )
}
