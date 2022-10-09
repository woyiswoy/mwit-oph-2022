import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function DropdownMenu({ m, userData, ...props }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      className='hidden group relative h-full md:flex items-center justify-center gap-2'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div className='group-hover:text-ymw flex items-center justify-center gap-2 transition-all duration-200'>
        <FontAwesomeIcon icon={m.icon} className='h-[0.9em] pb-[0.3rem]' />
        <span>{m.name}</span>
        <FontAwesomeIcon icon={faAngleDown} className='h-[0.9em] pb-[0.3rem]' />
      </div>
      <AnimatePresence>
        {hover && (
          <motion.div
            className='absolute pb-1 rounded-b-lg bg-phd/80 backdrop-blur-sm -right-2 top-full flex flex-col items-start gap-1'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {m.sub
              .filter(
                (s) => s.auth === null || (userData && s.auth === userData.ok),
              )
              .map((s, si) => (
                <Link href={s.href} key={si}>
                  <a
                    className={
                      (si === 0 ? '' : 'border-t-white border-t') +
                      ' flex w-full px-3 pt-1 items-center justify-start gap-2 text-white hover:text-ymw transition-all duration-200'
                    }
                  >
                    <FontAwesomeIcon
                      icon={s.icon}
                      className='w-[0.9em] pb-[0.3rem]'
                    />
                    <span className='whitespace-nowrap'>{s.name}</span>
                  </a>
                </Link>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
