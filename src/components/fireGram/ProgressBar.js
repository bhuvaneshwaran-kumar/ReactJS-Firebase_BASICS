import React, { useEffect } from 'react'

export function ProgressBar({ file, setFile }) {

    let url = ''

    useEffect(() => {
        if (url) {
            setFile(null)
        }
    }, [url, setFile])
    return (
        <div className="progress-bar">

        </div>
    )
}
