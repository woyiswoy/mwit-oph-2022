import {
  faAward,
  faChalkboard,
  faChartPie,
  faChartSimple,
  faFlag,
  faFlaskVial,
  faGlobeAsia,
  faLightbulb,
  faMicrophoneLines,
  faPersonChalkboard,
  faSquareRootAlt,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { m } from 'framer-motion'
import Head from 'next/head'
import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

const meta = {
  title: 'Schedule | MWIT Open House 2022',
  url: 'schedule',
  description:
    'กำหนดการ Live session MWIT Open House 2022 พบกับกิจกรรมรูปแบบออนไลน์ที่ผู้เข้าร่วมจะได้สัมผัสประสบการณ์และเรียนรู้เกี่ยวกับ MWIT ด้วยตัวเอง อาทิเช่น การนำเสนอโครงงานของนักเรียน กิจกรรม Class @MWIT การแข่งขัน MWIT Square กิจกรรมสัมภาษณ์ศิษย์เก่า และ TIPs & TRICKs by MWIT students',
  img: 'ogimage.png',
}

const timetb = [
  {
    date: '22 - 24 สิงหาคม 2565',
    slot: [
      {
        time: '16.50 - 18.00 น.',
        act: [
          {
            title: 'การนำเสนอโครงงาน',
            desc: 'รับชมการนำเสนอโครงงานของนักเรียน MWIT กว่า 90 โครงงานพร้อม Q&A session ที่เปิดโอกาสให้ผู้ชมถามข้อสงสัย',
            icon: faPersonChalkboard,
          },
        ],
      },
    ],
  },
  {
    date: '25 สิงหาคม 2565',
    head: {
      title: 'Class @MWIT',
      desc: 'เรียนรู้การจัดการเรียนการสอนของ MWIT ผ่านกิจกรรมคุณครูแต่ละสาขาวิชา',
    },
    slot: [
      {
        time: '16.50 - 17.25 น.',
        act: [
          {
            title: 'Class @MWIT',
            desc: 'เรียนรู้การจัดการเรียนการสอนของ MWIT ผ่านกิจกรรมคุณครูแต่ละสาขาวิชา',
          },
          {
            title: 'กิจกรรมสาขาคณิตศาสตร์และวิทยาการคำนวณ',
            icon: faLightbulb,
            desc: 'Cath-Mom - เป็นกิจกรรมแนะนำสาขาวิชา การจัดการเรียนการสอน สื่อต่างๆ และมีตัวอย่างโจทย์ปัญหาที่แก้ได้โดยบูรณาการความรู้ทางคณิตศาสตร์และวิทยาการคำนวณ ให้ผู้เข้าร่วมได้ร่วมแสดงความคิดเห็น ตอบคำถามชิงรางวัล',
          },
          {
            title: 'กิจกรรมสาขาวิชาศิลปศาสตร์ 1 (สังคมศึกษาและศิลปะ)',
            icon: faLightbulb,
            desc: 'Liberal Arts for Fun - เรียนรู้วิธีการเรียนแบบศิลปศาสตร์ ที่ผสมผสานวิชาสังคมศึกษาและศิลปะได้อย่างลงตัวและสนุกสนาน',
          },
        ],
      },
      {
        time: '17.25 - 18.00 น.',
        act: [
          {
            title: 'กิจกรรมสาขาวิชาเคมี',
            icon: faLightbulb,
            desc: 'Chemistry and Earth Science at MWIT (CES@MWIT) - ตัวอย่างการจัดการเรียนการสอนวิชาเคมี และวิทยาศาสตร์โลกและอวกาศ แบบ interactive',
          },
          {
            title: 'กิจกรรมสาขาวิชาศิลปศาสตร์ 2 (ภาษาไทย)',
            icon: faLightbulb,
            desc: 'Thai@MWIT - ทำกิจกรรมทดสอบทักษะและความรู้เกี่ยวกับภาษาไทย',
          },
        ],
      },
    ],
  },
  {
    date: '26 สิงหาคม 2565',
    slot: [
      {
        time: '16.50 - 17.25 น.',
        act: [
          {
            title: 'Class @MWIT',
            desc: 'เรียนรู้การจัดการเรียนการสอนของ MWIT ผ่านกิจกรรมคุณครูแต่ละสาขาวิชา',
          },
          {
            title: 'กิจกรรมสาขาวิชาฟิสิกส์',
            icon: faLightbulb,
            desc: "Let's Learn Physics - เรียนรู้สิ่งต่าง ๆ รอบตัวที่น่าสนใจด้วยหลักฟิสิกส์",
          },
          {
            title: 'กิจกรรมสาขาวิชาภาษาต่างประเทศ',
            icon: faLightbulb,
            desc: 'English is Fun: Jeopardy Style - Answering content-based questions using English through Jeopardy game format',
          },
        ],
      },
      {
        time: '17.25 - 18.00 น.',
        act: [
          {
            title: 'กิจกรรมสาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ 1 (ชีววิทยา)',
            icon: faLightbulb,
            desc: 'Taxo-Pokemon - กิจกรรมจัดจำแนกสิ่งมีชีวิตด้วยการ์ตูนในโปเกม่อน',
          },
          {
            title: 'กิจกรรมสาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ 2 (พลานามัย)',
            icon: faLightbulb,
            desc: 'กีฬาพาเพลิน - พบตัวอย่างการเรียนรู้ในรายวิชาสุขศึกษาและพลศึกษา และเกม “แต่งกายสไตล์กีฬา” พร้อมทั้งคำแนะนำเรื่องการเรียนกับรุ่นพี่ที่น่ารัก',
          },
        ],
      },
    ],
  },
  {
    date: '27 สิงหาคม 2565',
    slot: [
      {
        time: '09.00 - 15.00 น.',
        act: [
          {
            title: 'การแข่งขัน MWIT Square ครั้งที่ 14',
            desc: 'การแข่งขันคณิตศาสตร์และวิทยาศาสตร์สำหรับนักเรียนมัธยมศึกษาตอนต้น ครั้งที่ 14',
            icon: faFlag,
          },
        ],
      },
      {
        time: '13.00 - 14.00 น.',
        act: [
          {
            title: 'Interview MWIT Alumni',
            desc: 'สัมภาษณ์ศิษย์เก่า เกี่ยวกับประสบการณ์ที่ได้รับจาก MWIT และการนำความรู้หรือทักษะเหล่านั้น ไปพัฒนาและต่อยอดในการทำงานและการใช้ชีวิต',
            icon: faMicrophoneLines,
            live: true,
          },
        ],
      },
      {
        time: '14.00 - 14.55 น.',
        act: [
          {
            title: 'TIPs & TRICKs by MWIT Students',
            desc: 'สัมภาษณ์นักเรียน MWIT เกี่ยวกับเทคนิคการเตรียมตัวสอบเข้า และความน่าสนใจของ MWIT',
            icon: faMicrophoneLines,
            live: true,
          },
        ],
      },
      {
        time: '15.00 - 16.00 น.',
        act: [
          {
            title:
              'พิธีปิดงาน และมอบรางวัลผลการแข่งขัน MWIT Square และ MWIT Pitching',
            icon: faAward,
          },
        ],
      },
    ],
  },
]

const motionProp = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.8 },
}

export default function Schedule() {
  return (
    <>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta
          property='og:url'
          content={'https://openhouse.mwit.ac.th/' + meta.url}
        />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={meta.title} />
        <meta property='og:description' content={meta.description} />
        <meta
          property='og:image'
          content={'https://mwitophcdn.woyiswoy.com/img/' + meta.img}
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='openhouse.mwit.ac.th' />
        <meta property='twitter:url' content={meta.url} />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta
          name='twitter:image'
          content={'https://mwitophcdn.woyiswoy.com/img/' + meta.img}
        />
      </Head>

      <main className='w-full bg-sdbg/75'>
        <div className='flex flex-col text-white gap-6 items-center mx-auto justify-self-center w-full max-w-6xl px-8 py-10'>
          <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
            Schedule
          </span>
          <div className='flex flex-col sm:grid sm:grid-cols-fitc-2 md:grid-cols-fitc-3 gap-x-4 gap-y-4 font-IBMPlex font-medium text-lg lg:text-xl'>
            {timetb.map((t, i) => (
              <Fragment key={i}>
                <motion.span
                  className='text-center text-sddt text-xl md:text-lg lg:text-xl md:text-end font-bold col-span-2 md:col-span-1'
                  {...motionProp}
                >
                  {t.date}
                </motion.span>
                {t.slot.map((s, id) => (
                  <Fragment key={id}>
                    <motion.span
                      className='col-start-1 md:col-start-2 text-sdtm whitespace-nowrap'
                      {...motionProp}
                    >
                      {s.time}
                    </motion.span>
                    <div
                      className={
                        (id === t.slot.length - 1 && 'mb-4') +
                        ' flex flex-col gap-2 border-l-2 border-sdtt pl-3'
                      }
                    >
                      {s.act.map((a, idx) => (
                        <motion.div
                          className='flex flex-col gap-1'
                          key={idx}
                          {...motionProp}
                        >
                          <div className='flex flex-col gap-2'>
                            {/* <FontAwesomeIcon
                              icon={a.icon}
                              className='h-[0.8em] pt-1'
                            /> */}
                            {a.live && (
                              <div className='flex w-fit h-fit items-center gap-1 px-2 text-white bg-gradient-to-r from-sdf1 to-sdf2 rounded-md'>
                                <FontAwesomeIcon
                                  icon={faFacebook}
                                  className='text-xs'
                                />
                                <span className='text-sm font-semibold'>
                                  LIVE
                                </span>
                              </div>
                            )}
                            <span className='text-lg lg:text-xl text-sdtt hover:text-sdth transition-colors duration-500'>
                              {a.title}
                            </span>
                          </div>
                          {a.desc && (
                            <span className='font-IBMPlexLoop font-normal text-sm sm:text-base lg:text-lg'>
                              {a.desc}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
