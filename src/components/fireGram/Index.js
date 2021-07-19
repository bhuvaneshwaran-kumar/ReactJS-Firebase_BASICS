import React, { useState } from 'react'
import { Title } from './Title'
import { UploadForm } from './UploadForm'
import { ImageGrid } from './ImageGrid'
import { Modal } from './Modal'

export function Index() {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div>
            <Title />
            <UploadForm />
            <ImageGrid setSelectedImg={setSelectedImg} />
            {selectedImg && (
                <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
        </div>
    )
}
