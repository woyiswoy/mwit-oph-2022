import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function ActCard({
  src,
  name,
  desc,
  status,
  button,
  href,
  children,
  ...props
}) {
  const [isHover, setIsHover] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { amount: 1 })

  useEffect(() => {
    isInView &&
      new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
        setIsHover(true),
      )
    !isInView && setIsHover(false)
  }, [isInView])

  return (
    <Link href={href}>
      <a
        style={{
          backgroundImage: `url(${
            process.env.CDN_URL + '/img/feature/' + src + '.webp'
          })`,
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        ref={cardRef}
        className='flex flex-col justify-end bg-cover bg-center aspect-[3/2] w-full max-w-sm rounded-xl relative overflow-hidden'
      >
        <motion.div
          className='flex flex-col bg-white/60 backdrop-blur-md px-3 py-2'
          layout
        >
          <motion.div className='flex' layout>
            <span className='font-IBMPlex font-semibold text-lg md:text-xl text-bmw'>
              {name}
            </span>
          </motion.div>
          {isHover && (
            <motion.span className='font-IBMPlexLoop text-xs md:text-sm' layout>
              {desc}
            </motion.span>
          )}
        </motion.div>
        <div className='px-3 text-sm md:text-base absolute top-2 right-2 font-IBMPlex font-semibold rounded-full bg-white/50 hover:bg-white transition-colors duration-300 backdrop-blur-sm'>
          {button}
        </div>
      </a>
    </Link>
  )
}
