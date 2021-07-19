import { useFireStore } from '../../hooks/useFireStore'
import { motion } from 'framer-motion'

export const ImageGrid = ({ setSelectedImg }) => {

    const { docs } = useFireStore('images')

    console.log(docs)

    return (
        <div className="img-grid">
            {
                docs && docs.map(doc => (
                    <motion.div className="img-wrap" key={doc.id}
                        layout
                        whileHover={{ opacity: 1 }} s
                        onClick={() => setSelectedImg(doc.url)}
                    >
                        <motion.img src={doc.url} alt="uploaded Pic."
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: '300ms' }}  >

                        </motion.img>
                    </motion.div>
                ))
            }
        </div>
    )

}
