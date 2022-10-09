import {
  faCaretLeft,
  faFaceGrinBeam,
  faHeart,
  faLightbulb,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import MetaHeader from '../../components/metaHeader'
import { clubData } from '../../data/club'
import { motion } from 'framer-motion'
import { clamp } from 'lodash'

export default function ClubBlog({ clubContent }) {
  const router = useRouter()

  const [slideWidth, setSlideWidth] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const slideRef = useRef(null)

  useEffect(() => {
    setSlideWidth(slideRef.current ? slideRef.current.offsetWidth : 100)
  }, [slideRef.current])

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideWidth(slideRef.current ? slideRef.current.offsetWidth : 100)
      setActiveSlide((a) => (a == clubContent.img.length - 1 ? 0 : a + 1))
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const dragEndHandler = (event, info) => {
    const offset = info.offset.x
    if (Math.abs(offset) > 0) {
      const direction = offset < 0 ? 1 : -1
      setActiveSlide((activeSlide) =>
        clamp(activeSlide + direction, 0, clubContent.img.length - 1),
      )
    }
  }

  const meta = {
    title: clubContent.name + ' - MWIT Club | MWIT Open House 2022',
    url: 'club',
    description:
      'Online Exhibition การนำเสนอกิจกรรมชุมนุมที่จัดทำโดยนักเรียน MWIT สู่สายตาบุคคลภายนอกในรูปแบบ Blog โดยนักเรียนใน MWIT ทุกคนสามารถเปิดชุมนุมเพื่อรวมกลุ่มบุคคลที่มีความสนใจด้านเดียวกันมาทำกิจกรรมร่วมกัน ซึ่งในภาคเรียนนี้โรงเรียนของเราก็มีชุมนุมให้นักเรียนทุกคนได้เลือกเข้าถึง 56 ชุมนุม! | MWIT Open House 2022',
    img: 'ogimage.png',
  }

  //   useEffect(() => {
  //     console.log(router)
  //   }, [])

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-phd/30 pt-8 md:pt-12 px-4'>
        {/* <div className='flex flex-col text-black gap-6 items-center mx-auto justify-self-center w-full max-w-6xl px-8 pt-10 pb-4'>
          <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
            {clubContent.name}
          </span>
        </div> */}
        <div className='flex flex-wrap relative rounded-t-3xl shadow-xl overflow-hidden bg-white max-w-4xl mx-auto justify-center pb-6'>
          <Link href={'/club'}>
            <a className='absolute flex items-center gap-1 left-3 top-3 bg-white opacity-60 hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm font-CS font-semibold text-base md:text-xl lg:text-2xl px-2 rounded-full'>
              <FontAwesomeIcon icon={faCaretLeft} />
              <span>Back</span>
            </a>
          </Link>
          <img
            src={
              process.env.CDN_URL +
              '/img/club/cover/' +
              clubContent.cover +
              '.webp'
            }
            className='w-full'
          />
          <div className='flex flex-col px-6 py-4 w-full gap-3'>
            <span className='font-CS font-bold text-3xl md:text-4xl text-bmw'>
              {clubContent.name}
            </span>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1 font-IBMPlex font-semibold text-phd text-xl md:text-2xl'>
                <FontAwesomeIcon
                  className='w-[1.2rem] -rotate-12'
                  icon={faPuzzlePiece}
                />
                <span className=''>กิจกรรมในชุมนุม</span>
              </div>
              <ol className='font-IBMPlexLoop text-sm md:text-base list-inside list-disc space-y-1'>
                {clubContent.act.map((a, ai) => (
                  <li key={ai}>{a}</li>
                ))}
              </ol>
            </div>
            {clubContent.img.length > 0 && (
              <div className='max-w-xl mx-auto mt-1 mb-3 aspect-video overflow-hidden'>
                <motion.div
                  className='w-full flex'
                  drag='x'
                  dragConstraints={{
                    left: -slideWidth,
                    right: 0,
                  }}
                  onDragEnd={dragEndHandler}
                  ref={slideRef}
                  animate={{
                    x: -1 * activeSlide * slideWidth,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                >
                  {clubContent.img.map((a, ai) => (
                    <img
                      src={process.env.CDN_URL + '/img/club/act/' + a + '.webp'}
                      className='w-full'
                      key={ai}
                    />
                  ))}
                </motion.div>
              </div>
            )}
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-1 whitespace-nowrap font-IBMPlex font-semibold text-phd text-xl md:text-2xl'>
                <FontAwesomeIcon className='w-[1.2rem]' icon={faHeart} />
                <span className=''>ประโยชน์ที่ได้รับ</span>
              </div>
              <ol className='font-IBMPlexLoop text-sm md:text-base list-inside list-disc space-y-1'>
                {clubContent.benf.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ol>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-1 whitespace-nowrap font-IBMPlex font-semibold text-phd text-xl md:text-2xl'>
                <FontAwesomeIcon className='w-[1.2rem]' icon={faLightbulb} />
                <span className=''>เกร็ดความรู้</span>
              </div>
              <div className='font-IBMPlexLoop text-sm md:text-base flex flex-col gap-1'>
                {clubContent.fact.split('\n').map((f, fi) => (
                  <span key={fi}>{f}</span>
                ))}
              </div>
            </div>
            {clubContent.factimg && (
              <img
                src={
                  process.env.CDN_URL +
                  '/img/club/fact/' +
                  clubContent.factimg +
                  '.webp'
                }
                className='max-w-xl mx-auto mt-1 mb-3 w-full overflow-hidden'
              />
            )}
            {clubContent.review && (
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-1 whitespace-nowrap font-IBMPlex font-semibold text-phd text-xl md:text-2xl'>
                  <FontAwesomeIcon
                    className='w-[1.2rem]'
                    icon={faFaceGrinBeam}
                  />
                  <span className=''>รีวิวจากสมาชิก</span>
                </div>
                <div className='font-IBMPlexLoop text-sm md:text-base flex flex-col gap-1'>
                  {clubContent.review.split('\n').map((r, ri) => (
                    <span key={ri}>{r}</span>
                  ))}
                </div>
              </div>
            )}
            {clubContent.textpresent && (
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-1 whitespace-nowrap font-IBMPlex font-semibold text-phd text-xl md:text-2xl'>
                  {/* <FontAwesomeIcon
                    className='w-[1.2rem]'
                    icon={faFaceGrinBeam}
                  /> */}
                  <span className=''>ผลงานชุมนุมเพิ่มเติม</span>
                </div>
                <div className='font-IBMPlexLoop text-sm md:text-base flex flex-col gap-1'>
                  {clubContent.textpresent.split('\n').map((p, pi) => (
                    <span key={pi}>{p}</span>
                  ))}
                </div>
              </div>
            )}
            {clubContent.vidpresent && (
              <div className='flex flex-col gap-1'>
                {!clubContent.textpresent && (
                  <div className='flex w-full justify-center items-center gap-1 whitespace-nowrap font-IBMPlex font-semibold text-phd text-xl md:text-2xl'>
                    {/* <FontAwesomeIcon
                    className='w-[1.2rem]'
                    icon={faFaceGrinBeam}
                  /> */}
                    <span className=''>ผลงานชุมนุมเพิ่มเติม</span>
                  </div>
                )}
                <iframe
                  className='w-full max-w-xl mx-auto mt-2 mb-3 aspect-video'
                  src={clubContent.vidpresent}
                ></iframe>
              </div>
            )}
            {clubContent.imgpresent && (
              <div className='flex flex-col gap-1'>
                {!clubContent.textpresent && (
                  <div className='flex w-full justify-center items-center gap-1 whitespace-nowrap font-IBMPlex font-semibold text-phd text-xl md:text-2xl'>
                    {/* <FontAwesomeIcon
                    className='w-[1.2rem]'
                    icon={faFaceGrinBeam}
                  /> */}
                    <span className=''>ผลงานชุมนุมเพิ่มเติม</span>
                  </div>
                )}
                <img
                  src={
                    process.env.CDN_URL +
                    '/img/club/present/' +
                    clubContent.imgpresent +
                    '.webp'
                  }
                  className='max-w-xl mx-auto mt-1 mb-3 w-full overflow-hidden'
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ params: { id } }) {
  const clubContent = clubData.find((x) => x.name.replaceAll(' ', '_') === id)
  return { props: { clubContent } }
}

export async function getStaticPaths() {
  const paths = clubData.map((c) => {
    return { params: { id: c.name.replaceAll(' ', '_') } } // Route is something like "this-is-my-post"
  })

  return {
    paths,
    fallback: false,
  }
}
