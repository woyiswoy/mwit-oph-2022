import {
  faFacebook,
  faFacebookMessenger,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'
import {
  faAngleDown,
  faBarsStaggered,
  faCalendarCheck,
  faCalendarDay,
  faCameraRetro,
  faChevronRight,
  faCircleUser,
  faCubes,
  faFileInvoice,
  faFlag,
  faFlaskVial,
  faHouse,
  faMicroscope,
  faPenToSquare,
  faRightToBracket,
  faSchoolFlag,
  faUserGear,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import DropdownMenu from './ddmenu'
import DropdownMenuSm from './ddmenusm'
import FooterLink from './footerlink'

const shareSocial = [
  {
    name: 'facebook',
    icon: faFacebookSquare,
    href: 'https://facebook.com/MWITOpenHouse',
  },
  {
    name: 'messenger',
    icon: faFacebookMessenger,
    href: 'https://m.me/MWITOpenHouse',
  },
]

const footerLinkRight = [
  {
    name: 'Science Project',
    href: '/sciproject',
    nt: false,
  },
  {
    name: 'MWIT Square 14th',
    href: 'https://square.mwit.ac.th',
    nt: true,
  },
  {
    name: 'MWIT Pitching 1st',
    href: '/pitching',
    nt: false,
  },
  {
    name: 'ระบบรับสมัครเข้าม.4',
    href: 'https://apply.mwit.ac.th',
    nt: true,
  },
  {
    name: 'เว็บไซต์โรงเรียน',
    href: 'https://www.mwit.ac.th/html',
    nt: true,
  },
]

const footerLinkLeft = [
  {
    name: 'Home',
    href: '/',
    nt: false,
  },
  {
    name: 'Virtual Lab',
    href: '/lab',
    nt: false,
  },
  {
    name: 'Curriculum',
    href: '/curriculum',
    nt: false,
  },
  {
    name: 'MWIT Club',
    href: '/club',
    nt: false,
  },
]

export default function Navbar({
  userData,
  addClass,
  homeRef,
  children,
  ...props
}) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState()
  const navMenu = [
    {
      name: 'Home',
      href: '/',
      icon: faHouse,
      auth: null,
    },
    {
      name: 'Schedule',
      href: '/schedule',
      icon: faCalendarDay,
      auth: null,
    },
    {
      name: 'Exhibitions',
      href: '',
      icon: faFlag,
      auth: null,
      sub: [
        {
          name: 'Science Project',
          href: '/sciproject',
          icon: faMicroscope,
          auth: null,
        },
        {
          name: 'MWIT Club',
          href: '/club',
          icon: faCubes,
          auth: null,
        },
        {
          name: 'Virtual Lab',
          href: '/lab',
          icon: faFlaskVial,
          auth: null,
        },
        {
          name: 'Curriculum',
          href: '/curriculum',
          icon: faFileInvoice,
          auth: null,
        },
        {
          name: 'School Tour',
          href: '/tour',
          icon: faSchoolFlag,
          auth: null,
        },
        {
          name: 'MWITagram',
          href: '/mwitagram',
          icon: faCameraRetro,
          auth: null,
        },
      ],
    },
    {
      name: 'Booking',
      href: '/booking',
      icon: faCalendarCheck,
      auth: true,
    },
    {
      name: 'Register',
      href: '/register',
      icon: faPenToSquare,
      auth: false,
    },
    {
      name: 'Login',
      href: '/login',
      icon: faRightToBracket,
      auth: false,
    },
    {
      name: 'Account',
      href: '',
      icon: faCircleUser,
      auth: true,
      sub: [
        {
          name: 'My Account',
          href: '/account',
          icon: faUserGear,
          auth: true,
        },
        {
          name: 'Logout',
          href: '/logout',
          icon: faRightToBracket,
          auth: true,
        },
      ],
    },
  ]
  return (
    <div
      className={'flex flex-col w-full min-h-screen ' + (addClass || '')}
      ref={homeRef}
    >
      <div className='w-full sticky z-50 top-0 px-4 bg-gradient-to-r from-bmw to-phd text-ymw text-lg lg:text-xl font-CS font-bold'>
        <div className='flex relative gap-3 md:gap-4 max-w-6xl mx-auto items-center'>
          <Link href={'/'}>
            <a className='flex gap-3 md:gap-4 items-center py-[0.35rem]'>
              <img
                src='https://mwitophcdn.woyiswoy.com/img/logo22.svg'
                className='h-[1.8em]'
              />
              <span className='whitespace-nowrap'>MWIT Open House 2022</span>
            </a>
          </Link>

          <div className='absolute font-semibold right-0 top-0 bottom-0 items-center flex gap-5 justify-end text-white text-base md:text-lg'>
            {navMenu.map(
              (m, i) =>
                (m.auth === null || (userData && m.auth === userData.ok)) &&
                (m.sub ? (
                  <DropdownMenu m={m} key={i} userData={userData} />
                ) : (
                  <Link href={m.href} key={i}>
                    <a className='hidden md:flex items-center justify-center h-full gap-2 hover:text-ymw transition-all duration-200'>
                      <FontAwesomeIcon
                        icon={m.icon}
                        className='h-[0.9em] pb-[0.3rem]'
                      />
                      <span className=''>{m.name}</span>
                    </a>
                  </Link>
                )),
            )}
            <button
              className='text-lg flex md:hidden'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <FontAwesomeIcon icon={faXmark} className='text-ymw' />
              ) : (
                <FontAwesomeIcon icon={faBarsStaggered} />
              )}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className='absolute font-semibold top-full right-0 left-0 flex md:hidden flex-col items-start gap-4 bg-white/70 backdrop-blur-sm w-full px-6 py-4'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              {navMenu.map(
                (m, i) =>
                  (m.auth === null || (userData && m.auth === userData.ok)) &&
                  (m.sub ? (
                    <DropdownMenuSm m={m} userData={userData} key={i} />
                  ) : (
                    <Link href={m.href} key={i}>
                      <a
                        className='flex w-full justify-start items-start gap-2 text-bbk hover:text-bmw transition-all duration-200'
                        // initial={{ opacity: 0, x: -10 }}
                        // animate={{ opacity: 1, x: 0 }}
                        // exit={{ opacity: 0, x: -10 }}
                        // transition={{
                        //   duration: 0.8,
                        //   delay: 0.5 + 0.1 * i,
                        //   // bounce: 0.4,
                        //   // type: 'spring',
                        // }}
                      >
                        <FontAwesomeIcon
                          icon={m.icon}
                          className='mt-[0.15rem] h-[1em]'
                        />
                        <span className=''>{m.name}</span>
                      </a>
                    </Link>
                  )),
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* <div className='grow'> */}
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.pathname}
          className='flex justify-center grow'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {/* </div> */}
      <div className='bg-gradient-to-r from-bft to-oft'>
        <div className='py-4 px-8 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-y-4 gap-x-6'>
          <img
            src='https://mwitophcdn.woyiswoy.com/img/logo22.svg'
            className='h-20 self-center'
          />
          <div className='flex flex-col w-fit max-w-lg gap-3 items-center md:items-start'>
            <span className='text-ymw font-CS font-semibold text-lg md:text-xl text-center'>
              MWIT Open House 2022
            </span>
            <FooterLink
              footerLink={footerLinkLeft.concat(footerLinkRight)}
              className='grow md:hidden flex flex-col flex-wrap items-center md:items-end font-IBMPlexLoop gap-2 text-white text-base md:text-lg'
            />
            <div className='flex flex-wrap text-white gap-3'>
              {shareSocial.map((s, i) => (
                // <button
                //   onClick={() =>
                //     window.open(s.href, '_blank', 'noopener,noreferrer')
                //   }
                //   key={i}
                // >
                <a
                  key={i}
                  href={s.href}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon
                    icon={s.icon}
                    className='h-8 hover:text-blue-300 hover:scale-105 transition-all duration-200'
                  />
                </a>
                // </button>
              ))}
            </div>
            <div className='flex flex-col items-center md:items-start text-center font-IBMPlexLoop gap-x-2'>
              <span className='text-white text-sm md:text-base'>
                โรงเรียนมหิดลวิทยานุสรณ์
              </span>
              <span className='text-white text-xs md:text-sm whitespace-pre-wrap'>
                364 หมู่ 5 ต.ศาลายา อ.พุทธมณฑล จ.นครปฐม 73170
              </span>
            </div>
            <span className='text-gray-300 font-IBMPlexLoop text-xs text-center'>
              {'Designed by Trisawan & Created by Patcharapon.'}
            </span>
          </div>
          <div className='grow' />
          <div className='max-w-md gap-10 lg:gap-24 hidden md:grid grid-flow-col font-IBMPlexLoop text-white text-base lg:text-md'>
            <FooterLink
              footerLink={footerLinkLeft}
              className='flex flex-col flex-wrap items-center md:items-end gap-2'
            />
            <FooterLink
              footerLink={footerLinkRight}
              className='flex flex-col flex-wrap items-center md:items-end gap-2'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
