import {
  faArrowUpRightFromSquare,
  faFileDownload,
  faFilePen,
  faFlaskVial,
  faVideo,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import MetaHeader from '../../components/metaHeader'

export default function Physic() {
  const meta = {
    title: 'สาขาวิชาฟิสิกส์ | Virtual Lab & Activity | MWIT Open House 2022',
    url: 'lab/physic',
    description:
      'กิจกรรมการเรียนรู้ฟิสิกส์แผนเดิม เพื่อเสริมสร้างความรู้พื้นฐาน และการคิดวิเคราะห์เพื่อแก้ปัญหา โดยประกอบด้วยเรื่องกลศาสตร์ การเคลื่อนที่แบบต่าง ๆ หลักการของแสง กระจกและเลนส์ การต่อวงจรไฟฟ้า รวมไปถึงหลักการทางดาราศาสตร์ ซึ่งการทำกิจกรรมและแลกเปลี่ยนความรู้จะดำเนินอยู่บน Nearpod | MWIT Open House 2022',
    img: 'ogimage.png',
  }

  const labData = [
    {
      name: 'กิจกรรมที่ 1 แรงเสียดทานกับความร้อน',
      img: 'phycov.webp',
      button: [
        {
          name: 'Nearpod',
          href: 'https://app.nearpod.com/?pin=M8TRE',
          icon: faArrowUpRightFromSquare,
        },
      ],
    },
    {
      name: 'กิจกรรมที่ 2 การเคลื่อนที่แบบโปรเจ็กไทล์',
      img: 'phya2.webp',
      button: [
        {
          name: 'Nearpod',
          href: 'https://app.nearpod.com/?pin=S5GAR',
          icon: faArrowUpRightFromSquare,
        },
      ],
    },
    {
      name: 'กิจกรรมที่ 3 การเคลื่อนที่แบบวงกลม',
      img: 'phya3.webp',
      button: [
        {
          name: 'Nearpod',
          href: 'https://app.nearpod.com/?pin=UGRBN',
          icon: faArrowUpRightFromSquare,
        },
      ],
    },
    {
      name: 'กิจกรรมที่ 4 ธรรมชาติของการสะท้อนและการหักเหของแสง',
      img: 'phya4.webp',
      button: [
        {
          name: 'Nearpod',
          href: 'https://app.nearpod.com/?pin=N6R3D',
          icon: faArrowUpRightFromSquare,
        },
      ],
    },
    {
      name: 'กิจกรรมที่ 5 การเกิดจากกระจกผิวโค้ง',
      img: 'phya5.webp',
      button: [
        {
          name: 'Nearpod',
          href: 'https://app.nearpod.com/?pin=FQAXD',
          icon: faArrowUpRightFromSquare,
        },
      ],
    },
    {
      name: 'กิจกรรมที่ 6 การเกิดภาพจากเลนส์นูน',
      img: 'phya6.webp',
      button: [
        {
          name: 'Nearpod',
          href: 'https://app.nearpod.com/?pin=QHXEP',
          icon: faArrowUpRightFromSquare,
        },
      ],
    },
    {
      name: 'กิจกรรมที่ 7 การวิเคราะห์และต่อวงจรไฟฟ้าเสมือนจริง',
      img: 'phya7.webp',
      button: [
        {
          name: 'Nearpod',
          href: 'https://app.nearpod.com/?pin=MC3F5',
          icon: faArrowUpRightFromSquare,
        },
      ],
    },
    {
      name: 'กิจกรรมที่ 8 ดาราศาสตร์พื้นฐาน',
      img: 'phya8.webp',
      button: [
        {
          name: 'Nearpod',
          href: 'https://app.nearpod.com/?pin=WTGYM',
          icon: faArrowUpRightFromSquare,
        },
      ],
    },
  ]

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-bvl/60'>
        <div className='flex flex-col text-center text-black items-center mx-auto justify-self-center w-full max-w-6xl px-6 pt-10 pb-4'>
          <span className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
            สาขาวิชาฟิสิกส์
          </span>
          <span className='font-CS font-bold text-bbk text-xl md:text-2xl lg:text-3xl'>
            Virtual Lab & Activities
          </span>
        </div>
        <div className='flex flex-col relative overflow-y-hidden max-w-6xl mx-auto px-6 justify-center gap-4 pt-4 pb-10'>
          <div className='flex relative flex-col gap-2 items-center shadow-lg py-3 px-8 bg-white backdrop-blur-md rounded-xl'>
            <span className='text-lg md:text-xl lg:text-2xl font-CS font-semibold text-center'>
              เรียนรู้หลักการและปัญหาทางฟิสิกส์ผ่าน Nearpod เพื่อการเรียนที่
              Interactive
            </span>
            <div className='grid grid-flow-row md:grid-flow-col gap-4 justify-items-center'>
              <div className='flex flex-col justify-center gap-2'>
                <span className='font-IBMPlexLoop text-sm md:text-base'>
                  กิจกรรมการเรียนรู้ฟิสิกส์แผนเดิม เพื่อเสริมสร้างความรู้พื้นฐาน
                  และการคิดวิเคราะห์เพื่อแก้ปัญหา โดยประกอบด้วยเรื่องกลศาสตร์
                  การเคลื่อนที่แบบต่าง ๆ หลักการของแสง กระจกและเลนส์
                  การต่อวงจรไฟฟ้า รวมไปถึงหลักการทางดาราศาสตร์
                  ซึ่งการทำกิจกรรมและแลกเปลี่ยนความรู้จะดำเนินอยู่บน Nearpod
                </span>
                <span className='font-IBMPlexLoop text-sm md:text-base font-semibold'>
                  พบกับ 8 กิจกรรม
                </span>
                <ol className='font-IBMPlexLoop text-sm md:text-base list-inside list-disc space-y-1'>
                  {labData.map((l, li) => (
                    <li key={li}>{l.name}</li>
                  ))}
                </ol>
              </div>
            </div>
            <Link href={'/lab'}>
              <a className='absolute text-sm md:text-base left-3 font-IBMPlex font-semibold text-gray-600 hover:text-black transition-colors duration-300 -top-4 bg-purple-300/60 hover:bg-purple-300/80 rounded-full py-1 px-3'>
                {'< Back'}
              </a>
            </Link>
          </div>
          {labData.map((l, li) => (
            <div
              key={li}
              className='flex relative flex-col gap-2 items-start shadow-lg py-3 px-4 bg-white backdrop-blur-md rounded-xl'
            >
              <div className='grid grid-flow-row md:grid-flow-col gap-6'>
                {l.img && (
                  <img
                    src={process.env.CDN_URL + '/img/lab/' + l.img}
                    className='w-full max-w-sm rounded-xl'
                  />
                )}
                <div
                  className={
                    'flex flex-col justify-center gap-2 ' +
                    (!l.img && 'items-center')
                  }
                >
                  <span className='text-lg md:text-xl lg:text-2xl font-CS font-semibold'>
                    {l.name}
                  </span>
                  <span className='font-IBMPlexLoop text-sm md:text-base'>
                    {l.desc}
                  </span>
                  {/* <span className='font-IBMPlexLoop text-sm md:text-base font-semibold'>
                  พบกับ 6 กิจกรรม
                </span>
                <ol className='font-IBMPlexLoop text-sm md:text-base list-inside list-disc space-y-1'>
                  <li>ทุกวันเวลา 18:00-21:00 น.</li>
                  <li>
                    เสาร์อาทิตย์เพิ่มช่วง 9:00-12:00 น. และ 13:00-16:00 น.
                  </li>
                </ol> */}
                  <div className='flex flex-wrap gap-1'>
                    {l.button.map((b, bi) => (
                      <Link key={bi} href={b.href}>
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          className='self-center text-sm md:text-base flex gap-1 items-center mt-2 px-3 py-1 rounded-full font-IBMPlex font-semibold bg-ymw/60 hover:bg-ymw transition-colors duration-300'
                        >
                          <FontAwesomeIcon icon={b.icon} />
                          <span>{b.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
