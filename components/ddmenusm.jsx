import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function DropdownMenuSm({ m, userData, ...props }) {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <button
      className='group flex w-full justify-start items-start gap-2 text-bbk transition-all duration-200'
      onClick={() => setOpenMenu(!openMenu)}
    >
      <FontAwesomeIcon
        icon={m.icon}
        className='mt-[0.15rem] w-[1em] group-focus:text-bmw'
      />
      <div className='flex flex-col grow'>
        <div className='flex group-focus:text-bmw'>
          <span className=''>{m.name}</span>
          <div className='flex grow justify-end items-center'>
            <FontAwesomeIcon
              icon={openMenu ? faAngleUp : faAngleDown}
              className=''
            />
          </div>
        </div>
        <AnimatePresence>
          {openMenu && (
            <motion.div
              className='flex flex-col w-full pt-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {m.sub
                .filter(
                  (s) =>
                    s.auth === null || (userData && s.auth === userData.ok),
                )
                .map((s, si) => (
                  <Link href={s.href} key={si}>
                    <a
                      className={
                        ' flex w-full py-1 items-center justify-start gap-2 text-bbk hover:text-bmw transition-all duration-200'
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
      </div>
    </button>
  )
}
