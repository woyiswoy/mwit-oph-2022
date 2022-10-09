import {
  faExclamationCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import MetaHeader from '../components/metaHeader'

const meta = {
  title: 'Verify Email | MWIT Open House 2022',
  url: 'verifyemail',
  description: 'ยืนยันอีเมล | MWIT Open House 2022',
  img: 'ogimage.png',
}

export default function LogoutPage({ setData }) {
  const router = useRouter()
  const [verifyError, setVerifyError] = useState(false)
  const [verifySuccess, setVerifySuccess] = useState(false)
  const [verifyProcess, setVerifyProcess] = useState(false)

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
    fetch(process.env.API_URL + '/api/logout/', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.ok) {
          setData({ ok: false })
          setVerifyError(false)
          setVerifySuccess(true)
        } else {
          setVerifyError(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        setVerifyProcess(true)
      })
  }, [])

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-white/40'>
        <div className='flex flex-col text-black gap-10 items-center mx-auto justify-self-center w-full max-w-6xl px-8 py-10'>
          <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
            ออกจากระบบ
          </span>
          {!verifyProcess && (
            <span className='font-IBMPlexLoop text-center text-lg sm:text-xl flex gap-2 justify-center items-center text-gray-500'>
              <FontAwesomeIcon icon={faSpinner} className='animate-spin' />
              กำลังดำเนินการ
            </span>
          )}
          {verifySuccess && (
            <span className='font-IBMPlexLoop text-center text-lg sm:text-xl text-green-500'>
              ออกจากระบบสำเร็จ!{' '}
              <Link href={'/login'}>
                <a className='underline font-semibold'>เข้าสู่ระบบ</a>
              </Link>
            </span>
          )}
          {verifyError && (
            <div className='font-IBMPlexLoop text-center text-base sm:text-lg md:text-xl flex flex-wrap gap-2 justify-center items-center text-red-500'>
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span>เกิดข้อผิดพลาด</span>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
