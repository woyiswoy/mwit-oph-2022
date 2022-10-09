import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import MetaHeader from '../components/metaHeader'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import BeautifulInput from '../components/input'
import Link from 'next/link'
import { useRouter } from 'next/router'

const meta = {
  title: 'Login | MWIT Open House 2022',
  url: 'login',
  description: 'เข้าสู่ระบบ | MWIT Open House 2022',
  img: 'ogimage.png',
}

const reqmes = 'จำเป็นต้องกรอก'
const schema = yup
  .object({
    email: yup.string().required(reqmes).email('กรุณาใส่รูปแบบอีเมลที่ถูกต้อง'),
    password: yup.string().required(reqmes),
  })
  .required()

const inputData = [
  {
    id: 'email',
    name: 'อีเมล',
    span: 1,
    space: 1,
    type: 'email',
    req: true,
  },
  {
    id: 'password',
    name: 'รหัสผ่าน',
    span: 1,
    space: 1,
    type: 'password',
    req: true,
  },
]

export default function LoginPage({ userData, setData }) {
  const router = useRouter()
  const [loginError, setLoginError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginProcess, setLoginProcess] = useState(false)
  const [redirect, setRedirect] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const topRef = useRef()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    setLoginProcess(true)
    fetch(process.env.API_URL + '/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.ok) {
          setLoginError(false)
          setLoginSuccess(true)
          reset()
          topRef.current?.scrollIntoView()
          delete resData['message']
          setData(resData)
          router.push(redirect)
        } else {
          setLoginError(resData.message)
          setLoginSuccess(false)
          topRef.current?.scrollIntoView()
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        setLoginProcess(false)
      })
  }

  useEffect(() => {
    if (!userData) {
      return
    }
    userData.ok && router.push(redirect)
  }, [userData, router.query.to])

  useEffect(() => {
    setRedirect(router.query.to ? router.query.to : '/')
    setShowInfo(router.query.to)
  }, [router.query.to])

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-white/40' ref={topRef}>
        <AnimatePresence>
          {showInfo && (
            <motion.div
              className='w-full h-full fixed z-30 flex justify-center items-center px-6 bg-gray-300/50 backdrop-blur-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className='w-full max-w-xs bg-white shadow-lg px-6 py-5 rounded-2xl flex flex-col items-center gap-2'>
                <span className='font-IBMPlexLoop font-semibold text-red-500 text-base md:text-lg lg:text-xl'>
                  กรุณาเข้าสู่ระบบ
                </span>
                <button
                  className='px-3 py-1 mt-2 rounded-full font-IBMPlex font-semibold text-sm md:text-base border text-bmw border-bmw hover:bg-bmw hover:text-white transition-colors duration-300'
                  onClick={() => setShowInfo(!showInfo)}
                >
                  ปิด
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='flex flex-col text-black gap-10 items-center mx-auto justify-self-center w-full max-w-6xl px-8 py-10'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
              เข้าสู่ระบบ
            </span>
            <div className='flex font-IBMPlexLoop text-gray-500 text-base md:text-lg gap-2'>
              <span className=''>ยังไม่มีบัญชี?</span>
              <Link href={'/register'}>
                <a className='underline'>ลงทะเบียน</a>
              </Link>
            </div>
            <div className='flex flex-wrap justify-center items-center text-center font-IBMPlexLoop text-gray-500 text-base md:text-lg gap-2'>
              <span className='whitespace-nowrap'>พบปัญหาในการสมัครบัญชี?</span>
              <Link href={'/support/registeration'}>
                <a className='whitespace-nowrap underline'>
                  ดูขั้นตอนการสมัครบัญชีใหม่
                </a>
              </Link>
            </div>
            {/* <div className='flex font-IBMPlexLoop text-gray-500 text-base md:text-lg gap-2'>
              {JSON.stringify(userData)}
            </div> */}
            {loginError && (
              <div className='font-IBMPlexLoop text-center text-sm sm:text-base text-red-500'>
                {loginError === 'm' && (
                  <span>
                    อีเมลหรือรหัสผ่านไม่ถูกต้อง <b>กรุณาลองใหม่อีกครั้ง</b>
                  </span>
                )}
                {loginError === 'v' && (
                  <span>
                    กรุณายืนยันอีเมลของคุณก่อนเข้าสู่ระบบ{' '}
                    <Link href={'/resendemail'}>
                      <a className='underline'>ส่งอีเมลยืนยันอีกครั้ง</a>
                    </Link>
                  </span>
                )}
              </div>
            )}
            {loginSuccess && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-green-500'>
                เข้าสู่ระบบสำเร็จ
              </span>
            )}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='font-IBMPlexLoop w-full max-w-md grid grid-cols-1 gap-x-3 gap-y-8'
          >
            {inputData.map((d, i) => (
              <BeautifulInput
                d={d}
                register={register}
                errors={errors}
                key={i}
                ud={userData}
              />
            ))}

            <button
              type='submit'
              className='font-medium text-base md:text-lg justify-self-center bg-phd hover:bg-bft transition-all duration-300 text-white w-fit py-1 px-3 rounded-full'
            >
              เข้าสู่ระบบ
            </button>
          </form>
          {loginProcess && (
            <div className='font-IBMPlexLoop fixed flex justify-center items-center inset-0 z-50 w-full h-full bg-white/60'>
              <div className='flex flex-col gap-3 p-4 rounded-lg'>
                <div className='flex gap-2 text-xl justify-center items-center'>
                  <FontAwesomeIcon icon={faSpinner} className='animate-spin' />
                  <span className=''>กำลังดำเนินการ</span>
                </div>
                <span className='text-gray-500'>
                  กรุณาอย่าปิดหรือรีโหลดหน้า
                </span>
                {/* <button className='rounded-full border border-phd transition-all duration-300 text-black py-1'>
                ปิด
              </button> */}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
