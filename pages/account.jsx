import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import MetaHeader from '../components/metaHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import BeautifulInput from '../components/input'
import Link from 'next/link'
import { useRouter } from 'next/router'

const meta = {
  title: 'Account | MWIT Open House 2022',
  url: 'account',
  description: 'บัญชีของคุณ | MWIT Open House 2022',
  img: 'ogimage.png',
}

const reqmes = 'จำเป็นต้องกรอก'
const schema = yup
  .object({
    title: yup
      .string()
      .required(reqmes)
      .matches(
        /(เด็กชาย|เด็กหญิง|นาย|นางสาว|นาง)/,
        'กรุณาเลือกตัวเลือกที่กำหนด',
      ),
    firstname: yup
      .string()
      .required(reqmes)
      .max(50, 'ชื่อจะต้องมีความยาวไม่เกิน 50 ตัวอักษร'),
    lastname: yup
      .string()
      .required(reqmes)
      .max(50, 'นามสกุลจะต้องมีความยาวไม่เกิน 50 ตัวอักษร'),
    status: yup
      .string()
      .required(reqmes)
      .matches(
        /(นักเรียนประถมศึกษา|นักเรียนมัธยมศึกษาตอนต้น|นักเรียนมัธยมศึกษาตอนปลาย|อาจารย์ประถมศึกษา|อาจารย์มัธยมศึกษาตอนต้น|อาจารย์มัธยมศึกษาตอนปลาย|ผู้ปกครอง)/,
        'กรุณาเลือกตัวเลือกที่กำหนด',
      ),
    school: yup.string().required(reqmes),
    email: yup.string().required(reqmes).email('กรุณาใส่รูปแบบอีเมลที่ถูกต้อง'),
    password: yup.string().required(reqmes),
  })
  .required()

export default function Account({ userData, setData }) {
  const router = useRouter()
  const [registError, setRegistError] = useState(false)
  const [registSuccess, setRegistSuccess] = useState(false)
  const [registProcess, setRegistProcess] = useState(false)
  const topRef = useRef()
  const inputData = [
    {
      id: 'title',
      name: 'คำนำหน้าชื่อ',
      span: 1,
      space: 1,
      type: 'dd',
      data: ['เด็กชาย', 'เด็กหญิง', 'นาย', 'นางสาว', 'นาง'],
      req: true,
    },
    {
      id: 'firstname',
      name: 'ชื่อ',
      span: 1,
      space: 1,
      type: 'text',
      req: true,
    },
    {
      id: 'lastname',
      name: 'สกุล',
      span: 1,
      space: 2,
      type: 'text',
      req: true,
    },
    {
      id: 'status',
      name: 'สถานะ',
      span: 1,
      space: 1,
      type: 'dd',
      data: [
        'นักเรียนประถมศึกษา',
        'นักเรียนมัธยมศึกษาตอนต้น',
        'นักเรียนมัธยมศึกษาตอนปลาย',
        'อาจารย์ประถมศึกษา',
        'อาจารย์มัธยมศึกษาตอนต้น',
        'อาจารย์มัธยมศึกษาตอนปลาย',
        'ผู้ปกครอง',
      ],
      req: true,
    },
    {
      id: 'school',
      name: 'โรงเรียน',
      span: 1,
      space: 2,
      type: 'text',
      req: true,
    },
    {
      id: 'email',
      name: 'อีเมล',
      span: 1,
      space: 1,
      type: 'email',
      req: true,
      disable: true,
    },
    {
      id: 'password',
      name: 'ยืนยันรหัสผ่านเพื่อแก้ไขข้อมูล',
      span: 1,
      space: 1,
      type: 'password',
      req: true,
    },
  ]
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    setRegistProcess(true)
    fetch(process.env.API_URL + '/api/update/', {
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
          setRegistError(false)
          setRegistSuccess(true)
          reset({ password: '', ...resData })
          topRef.current?.scrollIntoView()
          delete resData['message']
          setData(resData)
        } else {
          setRegistError(true)
          topRef.current?.scrollIntoView()
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => setRegistProcess(false))
  }

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-white/40' ref={topRef}>
        <div className='flex flex-col text-black gap-10 items-center mx-auto justify-self-center w-full max-w-6xl px-8 py-10'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
              บัญชีของคุณ
            </span>
            <div className='flex font-IBMPlexLoop text-gray-500 text-base md:text-lg gap-2'>
              {/* <span className=''>มีบัญชีแล้ว?</span> */}
              <Link href={'/logout'}>
                <a className='underline'>ออกจากระบบ</a>
              </Link>
            </div>
            {registError && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-red-500'>
                เกิดข้อผิดพลาดในการแก้ไขข้อมูล <b>กรุณาลองใหม่อีกครั้ง</b>
              </span>
            )}
            {registSuccess && (
              <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-green-500'>
                <b>แก้ไขข้อมูลสำเร็จ!</b>
              </span>
            )}
            {/* <span className='font-IBMPlexLoop text-center text-sm sm:text-base text-black'>
              {JSON.stringify(userData)}
            </span> */}
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
              แก้ไขข้อมูล
            </button>
          </form>
          {registProcess && (
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
