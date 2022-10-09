import React, { useEffect, useState, useRef, Fragment } from 'react'
import * as yup from 'yup'
import MetaHeader from '../../components/metaHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck,
  faCalendarXmark,
  faCaretLeft,
  faCheckToSlot,
  faSpinner,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import Link from 'next/link'

const meta = {
  title:
    'โหวตผลงานภาพวาด - โครงการวาดภาพและถ่ายภาพทางชีววิทยา | MWIT Open House 2022',
  url: 'biovote/draw',
  description:
    'โครงการวาดภาพและถ่ายภาพทางชีววิทยาของนักเรียนโรงเรียนมหิดลวิทยานุสรณ์ | MWIT Open House 2022',
  img: 'ogimage.png',
}

const bookList = [
  'Keeratika',
  'Pinyapat',
  'Ananya',
  'Lumtawan',
  'Putthipond',
  'Krit',
  'Kirida',
  'Atiwit',
  'Nattapat',
  'Benyapha',
]

export default function BioPhotovote({ userData, setData }) {
  const router = useRouter()
  const [selected, setSelected] = useState(false)
  const [bookData, setBookData] = useState(false)
  const [onProcess, setOnProcess] = useState(false)
  const [bookError, setBookError] = useState(false)
  const [bookSuccess, setBookSuccess] = useState(false)
  const [nowTIme, setNowTime] = useState(0)
  const [hoverCf, setHoverCf] = useState(false)
  const [cancle, setCancle] = useState(false)
  const [cancleError, setCancleError] = useState(false)
  const [cancleSuccess, setCancleSuccess] = useState(false)
  const [showImg, setShowImg] = useState(false)
  const topRef = useRef()

  useEffect(() => {
    setBookData(shuffle(bookList))
  }, [bookList])

  const bookReq = (e, bookId) => {
    e.preventDefault()
    setOnProcess(true)
    fetch(process.env.API_URL + '/api/drawvote/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: bookId, user: userData }),
      credentials: 'include',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.ok) {
          setBookError(false)
          setBookSuccess(true)
          setCancleError(false)
          setCancleSuccess(false)
          setSelected(false)
          topRef.current?.scrollIntoView()
          setData(resData.userData)
        } else {
          setBookError(true)
          setBookSuccess(false)
          setCancleError(false)
          setCancleSuccess(false)
          topRef.current?.scrollIntoView()
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => setOnProcess(false))
  }

  const bookCancle = (e, bookId) => {
    e.preventDefault()
    setOnProcess(true)
    fetch(process.env.API_URL + '/api/drawvote/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: bookId, user: userData }),
      credentials: 'include',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.ok) {
          setCancleError(false)
          setCancleSuccess(true)
          setBookError(false)
          setBookSuccess(false)
          setCancle(false)
          topRef.current?.scrollIntoView()
          setData(resData.userData)
        } else {
          setCancleError(true)
          setCancleSuccess(false)
          setBookError(false)
          setBookSuccess(false)
          topRef.current?.scrollIntoView()
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => setOnProcess(false))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(new Date())
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  function isDisable(book) {
    if (Date.parse('11 Sep 2022 23:59:59 GMT+7') <= nowTIme) {
      return true
    }
    if (
      userData.ok &&
      userData.book
        .map((b) => (bookData.includes(b) ? true : false))
        .includes(true)
    ) {
      return true
    }
    return false
  }

  const bookButtonName = {
    cf: 'โหวตแล้ว',
    ol: 'คุณโหวตรูปภาพอื่นแล้ว',
    no: 'ยังไม่เปิดลงทะเบียน',
    er: 'หมดเวลาโหวต',
    full: 'ผู้ลงทะเบียนเต็มแล้ว',
    ok: 'โหวต',
  }

  function bookStatus(book) {
    if (userData.ok && userData.book.includes(book)) {
      return 'cf'
    } else if (
      userData.ok &&
      userData.book
        .map((b) => (bookData.includes(b) ? true : false))
        .includes(true)
    ) {
      return 'ol'
    } else if (Date.parse('11 Sep 2022 23:59:59 GMT+7') <= nowTIme) {
      return 'er'
    } else {
      return 'ok'
    }
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-yrg/60' ref={topRef}>
        <div className='flex flex-col text-black gap-6 items-center mx-auto justify-self-center w-full max-w-8xl px-8 py-10'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <Link href={'/biovote'}>
              <a className='flex self-start items-center gap-1 bg-white opacity-60 hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm font-CS font-semibold text-base md:text-xl lg:text-2xl px-2 rounded-full'>
                <FontAwesomeIcon icon={faCaretLeft} />
                <span>Back</span>
              </a>
            </Link>
            <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
              โหวตผลงานภาพวาด
            </span>
            <div className='flex flex-col font-IBMPlexLoop text-gray-700 text-base md:text-lg gap-2 text-center'>
              <span className=''>
                โครงการวาดภาพและถ่ายภาพทางชีววิทยา โหวตได้ถึงวันอาทิตย์ที่ 11
                กันยายน 2565{' '}
                <Link href={'/biovote/photo/'}>
                  <a className='underline text-bmw'>โหวตผลงานภาพถ่าย</a>
                </Link>
              </span>
              <span className=''>กดที่ภาพเพื่อรับชมขนาดขยาย</span>
            </div>
            {bookError && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-red-500'>
                เกิดข้อผิดพลาดในการโหวต <b>กรุณาลองใหม่อีกครั้ง</b>
              </span>
            )}
            {bookSuccess && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-green-500'>
                <b>โหวตสำเร็จ!</b> จะประกาศผลภาพที่ได้รับรางวัลทางเพจ Facebook
                MWIT Open House
              </span>
            )}
            {cancleError && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-red-500'>
                เกิดข้อผิดพลาดในการยกเลิกการโหวต <b>กรุณาลองใหม่อีกครั้ง</b>
              </span>
            )}
            {cancleSuccess && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-green-500'>
                <b>ยกเลิกการโหวตสำเร็จ!</b>
              </span>
            )}
          </div>

          <div className='flex flex-wrap justify-center gap-4'>
            <AnimateSharedLayout type='crossfade'>
              {bookData && userData ? (
                bookData.map((b, i) => (
                  <div
                    className='w-full max-w-xs flex flex-col rounded-lg overflow-hidden bg-white'
                    key={i}
                  >
                    <div className='grow flex items-center justify-center'>
                      <motion.img
                        src={
                          process.env.CDN_URL + '/img/bio/draw/' + b + '.webp'
                        }
                        className='w-full cursor-pointer'
                        layoutId={'img-' + b}
                        onClick={() => setShowImg(b)}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div className='flex flex-col gap-1 justify-end'>
                        {bookStatus(b) !== 'cf' ? (
                          <button
                            className={
                              (isDisable(b)
                                ? 'bg-gray-300 text-gray-500 '
                                : 'bg-ymw hover:bg-oft hover:text-white ') +
                              'text-base md:text-lg font-IBMPlex font-semibold flex justify-center items-center gap-2 py-1 px-2 transition-all duration-300'
                            }
                            disabled={isDisable(b)}
                            onClick={() =>
                              userData.ok
                                ? !isDisable(b) && setSelected(b)
                                : router.push({
                                    pathname: '/login',
                                    query: { to: router.asPath },
                                  })
                            }
                          >
                            <FontAwesomeIcon icon={faCheckToSlot} />
                            <span className=''>
                              {bookButtonName[bookStatus(b)]}
                              {/* {bookStatus(b)} */}
                            </span>
                          </button>
                        ) : (
                          <button
                            className={
                              'text-green-700 bg-green-300 hover:text-red-700 hover:bg-red-300 text-base md:text-lg font-IBMPlex font-semibold flex justify-center items-center gap-2 py-1 px-2 transition-all duration-300'
                            }
                            disabled={bookStatus(b) !== 'cf'}
                            onClick={() => setCancle(b)}
                            onMouseEnter={() => setHoverCf(b)}
                            onMouseLeave={() => setHoverCf(false)}
                          >
                            {hoverCf === b ? (
                              <Fragment>
                                <FontAwesomeIcon icon={faSquareXmark} />
                                <span className=''>ยกเลิกการโหวต</span>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <FontAwesomeIcon icon={faCheckToSlot} />
                                <span className=''>โหวตแล้ว</span>
                              </Fragment>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex flex-col gap-3 p-4 rounded-lg'>
                  <div className='flex gap-2 text-xl justify-center items-center font-IBMPlexLoop'>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className='animate-spin'
                    />
                    <span className=''>กำลังโหลดข้อมูล</span>
                  </div>
                </div>
              )}
              <AnimatePresence>
                {showImg && (
                  <div
                    className='fixed inset-0 pt-16 px-6 pb-6 z-50 overflow-y-scroll'
                    onClick={() => setShowImg(false)}
                  >
                    <motion.img
                      className='w-full relative max-w-2xl mx-auto flex flex-col gap-1 bg-white/80 shadow-lg backdrop-blur-md px-4 py-5 rounded-xl'
                      layoutId={'img-' + showImg}
                      src={
                        process.env.CDN_URL +
                        '/img/bio/draw/' +
                        showImg +
                        '.webp'
                      }
                    />
                  </div>
                )}
              </AnimatePresence>
            </AnimateSharedLayout>
          </div>
          <AnimatePresence>
            {(selected || cancle) && (
              <motion.div
                className='font-IBMPlexLoop fixed flex justify-center items-center inset-0 z-50 w-full h-full bg-white/60 p-6'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  // bounce: 0.4,
                  type: 'spring',
                }}
              >
                {!onProcess && selected && (
                  <div className='flex flex-col gap-3 p-4 rounded-xl bg-white shadow-lg'>
                    <div className='flex flex-col gap-2 text-lg md:text-xl justify-center items-center'>
                      <span className='font-bold'>ต้องการโหวตภาพถ่ายนี้?</span>
                    </div>
                    {/* <span className='text-gray-500'>
                    กรุณาอย่าปิดหรือรีโหลดหน้า
                  </span> */}
                    <button
                      className='rounded-full transition-all duration-300 border border-green-500 bg-transparent hover:bg-green-500 text-green-500 hover:text-white py-1'
                      onClick={(e) => bookReq(e, selected)}
                    >
                      ยืนยันการโหวต
                    </button>
                    <button
                      className='rounded-full transition-all duration-300 border border-red-500 bg-transparent hover:bg-red-500 text-red-500 hover:text-white py-1'
                      onClick={() => setSelected(false)}
                    >
                      ยกเลิก
                    </button>
                  </div>
                )}
                {!onProcess && cancle && (
                  <div className='flex flex-col gap-3 p-4 rounded-xl bg-white shadow-lg'>
                    <div className='flex flex-col gap-2 text-lg md:text-xl justify-center items-center'>
                      <span className='font-bold text-red-500'>
                        ยกเลิกการโหวต
                      </span>
                    </div>
                    {/* <span className='text-gray-500'>
                    กรุณาอย่าปิดหรือรีโหลดหน้า
                  </span> */}
                    <button
                      className='rounded-full transition-all duration-300 border border-red-500 bg-transparent hover:bg-red-500 text-red-500 hover:text-white py-1'
                      onClick={(e) => bookCancle(e, cancle)}
                    >
                      ยกเลิกการโหวต
                    </button>
                    <button
                      className='rounded-full transition-all duration-300 border border-gray-500 bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white py-1'
                      onClick={() => setCancle(false)}
                    >
                      ปิด
                    </button>
                  </div>
                )}
                {onProcess && (
                  <div className='flex flex-col gap-3 p-4 rounded-lg'>
                    <div className='flex gap-2 text-xl justify-center items-center'>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className='animate-spin'
                      />
                      <span className=''>กำลังดำเนินการ</span>
                    </div>
                    <span className='text-gray-500'>
                      กรุณาอย่าปิดหรือรีโหลดหน้า
                    </span>
                    {/* <button className='rounded-full border border-phd transition-all duration-300 text-black py-1'>
                ปิด
              </button> */}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}
