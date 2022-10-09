import {
  faAward,
  faDownload,
  faFileLines,
  faFilePdf,
  faFilePen,
  faFileWord,
  faFlag,
  faInfoCircle,
  faQuestionCircle,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const moreInfo = [
  {
    icon: faQuestionCircle,
    title: 'MWIT Pitching คืออะไร?',
    detail:
      'MWIT Pitching คือ การแข่งขันประกวดแนวคิด ไอเดีย การแก้ไขปัญหา ที่จัดขึ้นเป็นปีแรก สำหรับนักเรียนชั้นมัธยมศึกษาตอนต้น โดยนักเรียนโรงเรียนมหิดลวิทยานุสรณ์',
  },
  {
    icon: faFlag,
    title: 'การสมัครและส่งผลงาน',
    detail:
      'ส่งผลงานในรูปแบบออนไลน์ โดยเป็นการแข่งขันรูปแบบทีมของนักเรียนชั้นมัธยมศึกษาตอนต้น ทีมละ 3 คน รับสมัครจำนวน 20 ทีมเท่านั้น! แต่ละโรงเรียนสามารถส่งนักเรียนเข้าแข่งขันได้ไม่เกิน 1 ทีม',
  },
  {
    icon: faFileLines,
    title: 'เอกสารประกอบการสมัคร',
    list: true,
    detail: [
      'รูปนักเรียน',
      'รูปถ่ายบัตรนักเรียน',
      'รูปอาจารย์ผู้คุมทีม',
      'เอกสารรับรองการเป็นนักเรียนจากสถานศึกษา (ดาวน์โหลดแบบฟอร์มได้จากส่วนบนของเว็บไซต์)',
    ],
  },
]

const award = [
  {
    icon: faTrophy,
    name: 'Best Young Innovator',
    detail: '5 รางวัล',
  },
  {
    icon: faAward,
    name: 'Popular Vote',
    detail: '1 รางวัล',
  },
]

export default function Pitching() {
  const [remainTime, setRemainTime] = useState(0)
  const [endReg, setEndReg] = useState(false)
  const [dwHover, setDwHover] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      const endRegistTime =
        Date.parse('16 Aug 2022 23:59:59 GMT+7') - new Date()
      setRemainTime(endRegistTime)
      setEndReg(endRegistTime < 0)
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>MWIT Pitching 1st | MWIT Open House 2022</title>
        <meta
          name='description'
          content='MWIT Pitching 1st การแข่งขันประกวดแนวคิด ไอเดีย การแก้ไขปัญหา ที่จัดขึ้นเป็นปีแรก สำหรับนักเรียนชั้นมัธยมศึกษาตอนต้น รับสมัครตั้งแต่วันนี้ - 12 สิงหาคม 2565'
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta
          property='og:url'
          content='https://openhouse.mwit.ac.th/pitching'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='MWIT Pitching 1st | MWIT Open House 2022'
        />
        <meta
          property='og:description'
          content='MWIT Pitching 1st การแข่งขันประกวดแนวคิด ไอเดีย การแก้ไขปัญหา ที่จัดขึ้นเป็นปีแรก สำหรับนักเรียนชั้นมัธยมศึกษาตอนต้น รับสมัครตั้งแต่วันนี้ - 12 สิงหาคม 2565'
        />
        <meta
          property='og:image'
          content='https://mwitophcdn.woyiswoy.com/img/pitching/ogimage.jpg'
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='openhouse.mwit.ac.th' />
        <meta
          property='twitter:url'
          content='https://openhouse.mwit.ac.th/pitching'
        />
        <meta
          name='twitter:title'
          content='MWIT Pitching 1st | MWIT Open House 2022'
        />
        <meta
          name='twitter:description'
          content='MWIT Pitching 1st การแข่งขันประกวดแนวคิด ไอเดีย การแก้ไขปัญหา ที่จัดขึ้นเป็นปีแรก สำหรับนักเรียนชั้นมัธยมศึกษาตอนต้น รับสมัครตั้งแต่วันนี้ - 12 สิงหาคม 2565'
        />
        <meta
          name='twitter:image'
          content='https://mwitophcdn.woyiswoy.com/img/pitching/ogimage.jpg'
        />
      </Head>

      <main className='w-full bg-black/80'>
        <div className='w-full max-w-6xl mx-auto px-8 py-10 flex flex-col justify-items-center items-center text-white gap-2 md:gap-4'>
          {/* <img src='img/pitchinglogo.png' className='h-20' /> */}
          <motion.div
            className='relative w-fit'
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              bounce: 0.4,
              type: 'spring',
            }}
          >
            <span className='font-PPA text-center text-3xl md:text-4xl lg:text-5xl'>
              MWIT Pitching
            </span>
            <motion.span
              className='absolute -right-6 -top-2 font-PPA text-xs md:text-sm lg:text-base bg-gpt text-black p-1 rounded-full'
              initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 10 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                bounce: 0.4,
                type: 'spring',
              }}
            >
              1st
            </motion.span>
          </motion.div>
          <motion.span
            className='font-PPALight text-center text-xl md:text-2xl lg:text-3xl text-gpt'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.1,
              // bounce: 0.4,
              type: 'spring',
            }}
          >
            Innovate Your School
          </motion.span>
          <motion.div
            className='font-IBMPlex tracking-wide flex flex-wrap justify-center gap-x-2 text-center text-base md:text-lg lg:text-xl text-gpt'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.1,
              // bounce: 0.4,
              type: 'spring',
            }}
          >
            <span>การประกวดแนวคิดนวัตกรรม</span>
            <span className='font-semibold'>
              {"'พัฒนาคุณภาพชีวิตในโรงเรียน'"}
            </span>
            <span>สำหรับนักเรียนชั้นมัธยมศึกษาตอนต้น</span>
          </motion.div>
          <motion.div
            className='flex flex-col items-center gap-3 py-4 font-IBMPlex text-base md:text-lg font-medium'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.4,
              // bounce: 0.4,
              type: 'spring',
            }}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 w-fit'>
              <button
                className='border border-gpt rounded-xl py-2 px-4 hover:bg-gpt hover:text-black transition-colors duration-200'
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLSdhIKiPm-ds6sWnGnrsFXLNZNg5wJiiGQsBXG1oTs5mBoqVRA/viewform?usp=sf_link',
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
              >
                <FontAwesomeIcon icon={faFilePen} />
                <span> สมัครร่วมกิจกรรม</span>
              </button>
              <a
                className='border relative border-gpt rounded-xl py-2 px-4 hover:bg-gpt hover:text-black transition-colors duration-200'
                href='/file/pitching/รายละเอียดการแข่งขัน_MWIT_Pitching.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <span> รายละเอียดเพิ่มเติม</span>
                <div className='absolute text-xs font-IBMPlex font-semibold -left-3 -top-2 -rotate-[5deg] bg-white/80 backdrop-blur-sm text-gray-800 px-2 rounded-full'>
                  UPDATE!
                </div>
              </a>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <a
                className='hover:bg-slate-400/30 w-fit cursor-pointer text-sm sm:text-base md:text-lg relative transition-colors duration-200 py-1 px-4 rounded-xl'
                href='https://mwitophcdn.woyiswoy.com/file/pitching/poster.jpg'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FontAwesomeIcon icon={faDownload} />
                <span className='pl-2'>โปสเตอร์ประชาสัมพันธ์</span>
              </a>
              <div
                onMouseOver={() => setDwHover(true)}
                onMouseOut={() => setDwHover(false)}
                className='hover:bg-slate-400/30 w-fit cursor-pointer text-sm sm:text-base md:text-lg relative transition-colors duration-200 py-1 px-4 rounded-xl'
              >
                <FontAwesomeIcon icon={faDownload} />
                <span className='pl-2'>ดาวน์โหลดฟอร์มคำรับรองสถานศึกษา</span>
                {dwHover && (
                  <div className='absolute overflow-hidden left-0 top-full sm:left-full sm:top-0 grid grid-rows-2 bg-white/75 backdrop-blur-sm rounded-xl'>
                    <a
                      className='py-2 px-4 flex gap-2 items-center border-b border-gray-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200'
                      href='/file/pitching/คํารับรองสถานศึกษา.docx'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FontAwesomeIcon
                        icon={faFileWord}
                        className='h-[0.9em]'
                      />
                      <span>.docx</span>
                    </a>
                    <a
                      className='py-2 px-4 flex gap-2 items-center text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200'
                      href='/file/pitching/คํารับรองสถานศึกษา.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FontAwesomeIcon icon={faFilePdf} className='h-[0.9em]' />
                      <span>.pdf</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            className='flex flex-col items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.7,
              // bounce: 0.4,
              type: 'spring',
            }}
          >
            <span className='text-white text-lg md:text-xl lg:text-2xl text-center font-IBMPlex font-semibold'>
              {!endReg
                ? 'รับสมัครตั้งแต่วันนี้ - 16 สิงหาคม 2565'
                : 'ปิดรับสมัครแล้ว'}
            </span>
            <span className='text-gpt underline underline-offset-2 text-base md:text-lg lg:text-xl text-center font-IBMPlex font-bold'>
              เพียง 20 ทีมเท่านั้น!
            </span>
            {!endReg && (
              <div className='grid pt-3 grid-cols-4 w-fit gap-2 pb-2 text-black'>
                <div className='bg-gray-400 rounded-md text-center p-2'>
                  <div className='font-B612Mono text-xl md:text-3xl'>
                    {Math.floor(remainTime / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className='font-IBMPlexLoop text-sm md:text-lg'>วัน</div>
                </div>
                <div className='bg-gray-400 rounded-md text-center p-2'>
                  <div className='font-B612Mono text-xl md:text-3xl'>
                    {Math.floor(
                      (remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    )}
                  </div>
                  <div className='font-IBMPlexLoop text-sm md:text-lg'>
                    ชั่วโมง
                  </div>
                </div>
                <div className='bg-gray-400 rounded-md text-center p-2'>
                  <div className='font-B612Mono text-xl md:text-3xl'>
                    {Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60))}
                  </div>
                  <div className='font-IBMPlexLoop text-sm md:text-lg'>
                    นาที
                  </div>
                </div>
                <div className='bg-gray-400 rounded-md text-center p-2'>
                  <div className='font-B612Mono text-xl md:text-3xl'>
                    {Math.floor((remainTime % (1000 * 60)) / 1000)}
                  </div>
                  <div className='font-IBMPlexLoop text-sm md:text-lg'>
                    วินาที
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          <motion.div
            className='flex flex-col items-center gap-5 w-full max-w-4xl pt-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 2.0,
              // bounce: 0.4,
              type: 'spring',
            }}
          >
            <span className='font-IBMPlex text-2xl md:text-3xl text-center font-bold text-gpt'>
              รางวัล
            </span>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg text-center w-fit font-IBMPlexLoop'>
              {award.map((a, i) => (
                <div key={i} className='flex flex-col'>
                  <FontAwesomeIcon
                    icon={a.icon}
                    className='h-12 text-gpt pb-4'
                  />
                  <span className='font-medium'>{a.name}</span>
                  <span className=''>{a.detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className='flex flex-col gap-5 w-full max-w-4xl pt-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 2.3,
              // bounce: 0.4,
              type: 'spring',
            }}
          >
            <span className='font-IBMPlex text-2xl md:text-3xl text-center font-bold text-gpt'>
              รายละเอียดเพิ่มเติม
            </span>

            {moreInfo.map((m, i) => (
              <div key={i} className='flex flex-col gap-3'>
                <div className='flex gap-2 items-center'>
                  <FontAwesomeIcon icon={m.icon} />
                  <span className='font-IBMPlex text-lg md:text-xl font-semibold'>
                    {m.title}
                  </span>
                </div>
                {m.list ? (
                  <ol className='font-IBMPlexLoop text-base md:text-lg text-gray-300 list-inside list-decimal'>
                    {m.detail.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ol>
                ) : (
                  <span className='font-IBMPlexLoop text-base md:text-lg text-gray-300'>
                    {m.detail}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  )
}
