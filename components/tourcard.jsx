import { Fragment } from 'react'
import { motion } from 'framer-motion'

export default function TourCard({ p, children, ...props }) {
  return (
    <motion.div
      className='w-full flex flex-col justify-center items-center gap-1'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {p.ct.map((c, ci) => (
        <Fragment key={ci}>
          {c.name && (
            <span className='font-IBMPlex font-semibold text-center text-xl'>
              {c.name}
            </span>
          )}
          <iframe
            type='text/html'
            className='w-full max-w-lg aspect-video rounded-xl mb-4'
            src={
              'https://www.youtube.com/embed/' +
              c.vid +
              '?modestbranding=1&color=white&iv_load_policy=3'
            }
            frameBorder='0'
            allowFullScreen
          />
        </Fragment>
      ))}
    </motion.div>
  )
}
