import Button from '../components/button'
import { faHouse, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Link from 'next/link'
import MotionLogo from './motionlogo'

const mainMenu = [
  {
    name: 'Home',
    fa: true,
    icon: faHouse,
    href: null,
    disabled: false,
  },
  {
    name: 'Follow Us',
    fa: true,
    icon: faFacebook,
    href: 'https://facebook.com/MWITOpenHouse',
    disabled: false,
  },
  {
    name: 'ระบบรับสมัครเข้าม.4',
    fa: false,
    icon: 'https://mwitophcdn.woyiswoy.com/img/admission.png',
    href: 'https://apply.mwit.ac.th',
    disabled: false,
    inner: false,
  },
  {
    name: 'MWIT Square',
    fa: false,
    icon: 'https://mwitophcdn.woyiswoy.com/img/sqlogofull.png',
    href: 'https://square.mwit.ac.th',
    disabled: false,
  },
]

export default function LandingPage({ homeRef, children, ...props }) {
  return (
    <div className='w-full bg-ybg/50 absolute h-[calc(100vh-calc(100vh-100%))]'>
      <div className='p-4 flex flex-col w-full h-[calc(100vh-calc(100vh-100%))]'>
        <div className='grow flex flex-col justify-center items-center py-4 mx-auto gap-6 lg:gap-8'>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-8'>
            <motion.img
              src='img/logo22dark.svg'
              className='w-[180px] md:w-[220px] lg:w-[250px]'
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                bounce: 0.4,
                type: 'spring',
              }}
            />
            {/* <MotionLogo
              className='w-[180px] md:w-[220px] lg:w-[250px]'
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                bounce: 0.4,
                type: 'spring',
              }}
            /> */}
            <motion.div
              className='font-CS font-bold space-y-2 text-bmw'
              initial={{ opacity: 0, scale: 0.7, y: 10, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                bounce: 0.4,
                type: 'spring',
              }}
            >
              <div className='flex pb-2'>
                <div className='bg-ora text-white px-2 pt-1 pb-0.5 rounded-full text-xs md:text-sm lg:text-base'>
                  ONLINE
                </div>
              </div>
              <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                MWIT Open House 2022
              </div>
              <div className='text-xl md:text-2xl lg:text-3xl'>
                22 - 28 สิงหาคม 2565
              </div>
            </motion.div>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <Link href={'/tour'}>
              <motion.a
                className='relative bg-ymw/50 hover:bg-ymw hover:text-black cursor-pointer transition-colors duration-200 py-1 md:py-2 px-3 md:px-4 rounded-full font-CS font-bold text-lg md:text-xl lg:text-2xl text-bmw'
                initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  bounce: 0.4,
                  type: 'spring',
                }}
              >
                <motion.div
                  className='absolute text-xs md:text-sm text-white -right-2 -top-2 bg-oft font-semibold px-[0.35rem] md:px-2 rounded-full'
                  initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.6,
                    bounce: 0.5,
                    type: 'spring',
                  }}
                >
                  New
                </motion.div>
                <span className='whitespace-nowrap'>School Tour</span>
              </motion.a>
            </Link>
            <Link href={'/biovote'}>
              <motion.a
                className='relative bg-white/50 hover:bg-ymw hover:text-black cursor-pointer transition-colors duration-200 py-1 md:py-2 px-3 md:px-4 rounded-full font-CS font-bold text-lg md:text-xl lg:text-2xl text-bmw'
                initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.3,
                  bounce: 0.4,
                  type: 'spring',
                }}
              >
                <motion.div
                  className='absolute text-xs md:text-sm text-white -right-2 -top-2 bg-oft font-semibold px-[0.35rem] md:px-2 rounded-full'
                  initial={{ opacity: 0, scale: 0.7, y: 10, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.9,
                    bounce: 0.5,
                    type: 'spring',
                  }}
                >
                  Vote Now!
                </motion.div>
                <span className='whitespace-nowrap'>
                  โครงการวาดภาพและถ่ายภาพทางชีววิทยา
                </span>
              </motion.a>
            </Link>
          </div>
        </div>
        <div className='w-full max-w-4xl md:pb-4 mx-auto flex-none grid grid-flow-col gap-2 lg:gap-4'>
          {mainMenu.map((m, i) => (
            <Button
              m={m}
              key={i}
              toHome={() =>
                homeRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
