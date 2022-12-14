import { motion } from 'framer-motion'

export default function Transition({ children, ...props }) {
  return (
    <motion.div
      className='flex justify-center grow'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  )
}
