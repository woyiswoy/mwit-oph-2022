import React, { useEffect, useState, useRef, Fragment } from 'react'
import * as yup from 'yup'
import MetaHeader from '../components/metaHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck,
  faCalendarXmark,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

const meta = {
  title: 'Booking | MWIT Open House 2022',
  url: 'book',
  description: 'ลงทะเบียนกิจกรรม | MWIT Open House 2022',
  img: 'ogimage.png',
}

export default function Booking({ userData, setData }) {
  const router = useRouter()
  const [bookData, setBookData] = useState(false)
  const [selected, setSelected] = useState(false)
  const [onProcess, setOnProcess] = useState(false)
  const [bookError, setBookError] = useState(false)
  const [bookSuccess, setBookSuccess] = useState(false)
  const [nowTIme, setNowTime] = useState(0)
  const [hoverCf, setHoverCf] = useState(false)
  const [cancle, setCancle] = useState(false)
  const [cancleError, setCancleError] = useState(false)
  const [cancleSuccess, setCancleSuccess] = useState(false)
  const topRef = useRef()

  const useEffectOnce = (effect) => {
    const destroyFunc = useRef()
    const effectCalled = useRef(false)
    const renderAfterCalled = useRef(false)
    const [val, setVal] = useState(0)

    if (effectCalled.current) {
      renderAfterCalled.current = true
    }

    useEffect(() => {
      // only execute the effect first time around
      if (!effectCalled.current) {
        destroyFunc.current = effect()
        effectCalled.current = true
      }

      // this forces one render after the effect is run
      setVal((val) => val + 1)

      return () => {
        // if the comp didn't render since the useEffect was called,
        // we know it's the dummy React cycle
        if (!renderAfterCalled.current) {
          return
        }
        if (destroyFunc.current) {
          destroyFunc.current()
        }
      }
    }, [])
  }

  useEffectOnce(() => {
    fetch(process.env.API_URL + '/api/book/', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setBookData(data.dataOut)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const bookReq = (e, bookId) => {
    e.preventDefault()
    setOnProcess(true)
    fetch(process.env.API_URL + '/api/book/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book: bookId, user: userData }),
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
          const newBookData = bookData.map((b) => {
            if (b.id === resData.book) {
              b.book += 1
            }
            return b
          })
          setBookData(newBookData)
          //   router.reload(window.location.pathname)
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
    fetch(process.env.API_URL + '/api/book/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book: bookId, user: userData }),
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
          const newBookData = bookData.map((b) => {
            if (b.id === resData.book) {
              b.book -= 1
            }
            return b
          })
          setBookData(newBookData)
          //   router.reload(window.location.pathname)
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
    if (
      userData.book.includes(book.id) ||
      book.open > nowTIme ||
      book.close <= nowTIme ||
      book.book === book.full ||
      userData.book
        .map((b) => bookData.find((x) => x.id === b).start)
        .includes(bookData.find((x) => x.id === book.id).start)
    ) {
      return true
    }
    return false
  }

  const bookButtonName = {
    cf: 'ลงทะเบียนแล้ว',
    ol: 'ลงทะเบียนกิจกรรมอื่นแล้ว',
    no: 'ยังไม่เปิดลงทะเบียน',
    er: 'หมดเวลาลงทะเบียน',
    full: 'ผู้ลงทะเบียนเต็มแล้ว',
    ok: 'ลงทะเบียน',
  }

  function bookStatus(book) {
    if (userData.book.includes(book.id)) {
      return 'cf'
    } else if (
      userData.book
        .map((b) => bookData.find((x) => x.id === b)?.start)
        .includes(bookData.find((x) => x.id === book.id).start)
    ) {
      return 'ol'
    } else if (book.open > nowTIme) {
      return 'no'
    } else if (book.close <= nowTIme) {
      return 'er'
    } else if (book.book === book.full) {
      return 'full'
    }
    return 'ok'
  }

  function timeRangeString(start, end) {
    const startTime = new Date(start)
    const startDate = startTime.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      day: 'numeric',
    })
    const startMY = startTime.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: 'long',
    })
    const startHM = startTime.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      hour: 'numeric',
      minute: 'numeric',
    })
    const endTime = new Date(end)
    const endDate = endTime.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      day: 'numeric',
    })
    const endMY = endTime.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: 'long',
    })
    const endHM = endTime.toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      hour: 'numeric',
      minute: 'numeric',
    })
    if (startDate === endDate) {
      return startDate + ' ' + startMY + ' ' + startHM + ' - ' + endHM
    } else {
      return (
        startDate +
        ' - ' +
        endDate +
        ' ' +
        startMY +
        ' ' +
        startHM +
        ' - ' +
        endHM
      )
    }
  }

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-yrg/60' ref={topRef}>
        <div className='flex flex-col text-black gap-10 items-center mx-auto justify-self-center w-full max-w-7xl px-8 py-10'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
              ลงทะเบียนกิจกรรม
            </span>
            <div className='flex font-IBMPlexLoop text-gray-700 text-base md:text-lg gap-2 text-center'>
              <span className=''>
                สามารถรอเวลาเปิดลงทะเบียนได้โดยไม่ต้องรีโหลดหน้าจอ
              </span>
            </div>
            {bookError && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-red-500'>
                เกิดข้อผิดพลาดในการลงทะเบียน
                หรือกิจกรรมที่คุณต้องการลงทะเบียนเต็มแล้ว{' '}
                <b>กรุณาลองใหม่อีกครั้ง</b>
              </span>
            )}
            {bookSuccess && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-green-500'>
                <b>ลงทะเบียนสำเร็จ!</b>{' '}
                รายละเอียดการเข้าฟังการนำเสนอโครงงานได้ถูกส่งไปให้ท่านทางอีเมลแล้ว
              </span>
            )}
            {cancleError && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-red-500'>
                เกิดข้อผิดพลาดในการยกเลิกการลงทะเบียน{' '}
                <b>กรุณาลองใหม่อีกครั้ง</b>
              </span>
            )}
            {cancleSuccess && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-green-500'>
                <b>ยกเลิกการลงทะเบียนสำเร็จ!</b>
              </span>
            )}
          </div>

          <div className='flex flex-wrap justify-center gap-4'>
            {bookData && userData && userData.ok ? (
              bookData.map((b, i) => (
                <div
                  className='w-full max-w-sm flex flex-col rounded-lg overflow-hidden bg-white'
                  key={i}
                >
                  <img
                    src={process.env.CDN_URL + '/img/reg/' + b.img}
                    className='w-full'
                  />
                  <div className='flex flex-col p-4 gap-1 grow'>
                    <div className='flex flex-col gap-0 md:gap-1 font-CS font-bold'>
                      <span className='text-xs md:text-sm lg:text-base text-bmw'>
                        {b.above}
                      </span>
                      <span className='text-xl md:text-2xl lg:text-3xl text-bbk'>
                        {b.title}
                      </span>
                      <span className='text-base md:text-lg lg:text-xl text-bmw font-IBMPlex font-semibold'>
                        {b.below}
                      </span>
                    </div>
                    <span className='text-xs md:text-sm lg:text-base font-IBMPlexLoop text-gray-700'>
                      {b.detail}
                    </span>
                    <div className='pt-1 flex flex-col gap-1 grow justify-end'>
                      <span className='text-sm md:text-base font-IBMPlexLoop font-bold'>
                        เวลากิจกรรม
                      </span>
                      <span className='text-sm md:text-base font-IBMPlexLoop'>
                        {timeRangeString(b.start, b.end)} น.
                      </span>
                      <span className='text-sm md:text-base font-IBMPlexLoop'>
                        <b>
                          {nowTIme >= new Date(b.open) ? 'ปิด' : 'เปิด'}
                          ลงทะเบียน:{' '}
                        </b>
                        {(nowTIme >= new Date(b.open)
                          ? new Date(b.close)
                          : new Date(b.open)
                        ).toLocaleString('th-TH', {
                          timeZone: 'Asia/Bangkok',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })}{' '}
                        น.
                      </span>
                      <span className='text-sm md:text-base font-IBMPlexLoop'>
                        <b>
                          {b.full === 10000
                            ? 'ผู้ลงทะเบียนแล้ว: '
                            : 'จำนวนที่นั่งเหลือ: '}
                        </b>
                        {b.full === 10000 ? b.book : b.full - b.book}/
                        {b.full === 10000 ? 'ไม่จำกัดจำนวน' : b.full}
                      </span>
                      {bookStatus(b) !== 'cf' ? (
                        <button
                          className={
                            (isDisable(b)
                              ? 'bg-gray-300 text-gray-500 '
                              : 'bg-ymw hover:bg-oft hover:text-white ') +
                            'text-base md:text-lg font-IBMPlex font-semibold flex justify-center items-center gap-2 py-1 px-2 transition-all duration-300 rounded-lg'
                          }
                          disabled={isDisable(b)}
                          onClick={() => !isDisable(b) && setSelected(b.id)}
                        >
                          <FontAwesomeIcon icon={faCalendarCheck} />
                          <span className=''>
                            {bookButtonName[bookStatus(b)]}
                          </span>
                        </button>
                      ) : (
                        <button
                          className={
                            'text-green-700 bg-green-300 hover:text-red-700 hover:bg-red-300 text-base md:text-lg font-IBMPlex font-semibold flex justify-center items-center gap-2 py-1 px-2 transition-all duration-300 rounded-lg'
                          }
                          disabled={bookStatus(b) !== 'cf'}
                          onClick={() => setCancle(b.id)}
                          onMouseEnter={() => setHoverCf(b.id)}
                          onMouseLeave={() => setHoverCf(false)}
                        >
                          {hoverCf === b.id ? (
                            <Fragment>
                              <FontAwesomeIcon icon={faCalendarXmark} />
                              <span className=''>ยกเลิกการลงทะเบียน</span>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <FontAwesomeIcon icon={faCalendarCheck} />
                              <span className=''>ลงทะเบียนแล้ว</span>
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
                  <FontAwesomeIcon icon={faSpinner} className='animate-spin' />
                  <span className=''>กำลังโหลดข้อมูล</span>
                </div>
              </div>
            )}
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
                      <span className='font-bold'>ตรวจสอบการลงทะเบียน</span>
                      <span className='font-medium'>
                        กิจกรรม: {bookData.find((x) => x.id === selected).title}
                      </span>
                    </div>
                    {/* <span className='text-gray-500'>
                    กรุณาอย่าปิดหรือรีโหลดหน้า
                  </span> */}
                    <button
                      className='rounded-full transition-all duration-300 border border-green-500 bg-transparent hover:bg-green-500 text-green-500 hover:text-white py-1'
                      onClick={(e) => bookReq(e, selected)}
                    >
                      ยืนยันการลงทะเบียน
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
                        ยกเลิกการลงทะเบียน
                      </span>
                      <span className='font-medium'>
                        กิจกรรม: {bookData.find((x) => x.id === cancle).title}
                      </span>
                    </div>
                    {/* <span className='text-gray-500'>
                    กรุณาอย่าปิดหรือรีโหลดหน้า
                  </span> */}
                    <button
                      className='rounded-full transition-all duration-300 border border-red-500 bg-transparent hover:bg-red-500 text-red-500 hover:text-white py-1'
                      onClick={(e) => bookCancle(e, cancle)}
                    >
                      ยกเลิกการลงทะเบียน
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
