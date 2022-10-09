import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MetaHeader from '../../components/metaHeader'
import { clubData } from '../../data/club'

const meta = {
  title: 'MWIT Club | MWIT Open House 2022',
  url: 'club',
  description:
    'Online Exhibition การนำเสนอกิจกรรมชุมนุมที่จัดทำโดยนักเรียน MWIT สู่สายตาบุคคลภายนอกในรูปแบบ Blog โดยนักเรียนใน MWIT ทุกคนสามารถเปิดชุมนุมเพื่อรวมกลุ่มบุคคลที่มีความสนใจด้านเดียวกันมาทำกิจกรรมร่วมกัน ซึ่งในภาคเรียนนี้โรงเรียนของเราก็มีชุมนุมให้นักเรียนทุกคนได้เลือกเข้าถึง 56 ชุมนุม! | MWIT Open House 2022',
  img: 'ogimage.png',
}

const clubType = [
  'Media',
  'Show',
  'Entertainment',
  'Arts',
  'Lifestyle',
  'Food',
  'Academics',
  'Social',
  'Economy',
  'Games',
  'Sports',
  'Music',
  'Politics',
  'Environment',
]

const clubAct = [
  'Discussion',
  'Group Activity',
  'Practice',
  'Fun Activity',
  'Performance',
  'Cooking',
  'Lecture',
  'Working',
  'Playing',
]

export default function Club() {
  const [selectedType, setSelectedType] = useState([])
  const [selectedAct, setSelectedAct] = useState([])
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => setSelectedType(clubType), [clubType])
  useEffect(() => setSelectedAct(clubAct), [clubAct])
  useEffect(() => {
    sessionStorage.getItem('loadclub') === 'false' && setShowInfo(true)
  }, [])

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-phd/20'>
        <AnimatePresence>
          {showInfo && (
            <motion.div
              className='w-full h-full fixed z-30 flex justify-center items-center px-6 bg-gray-300/50 backdrop-blur-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className='w-full max-w-3xl bg-white shadow-lg px-6 py-5 rounded-2xl flex flex-col items-center gap-2'>
                <span className='font-CS font-semibold text-bmw text-2xl md:text-3xl lg:text-4xl'>
                  MWIT Club คืออะไร?
                </span>
                <span className='font-IBMPlexLoop text-gray-700 indent-8 md:indent-10 text-sm md:text-base lg:text-lg'>
                  MWIT
                  ได้เปิดโอกาสให้นักเรียนทุกคนสามารถเปิดชุมนุมของตนเองได้ตามความสนใจ
                  และทุกคนก็สามารถเลือกเข้าชุมนุมต่าง ๆ ได้ไม่จำกัด
                  โดยปกติกิจกรรมชุมนุมจะจัดขึ้นในช่วงเวลาหลังเลิกเรียน
                  ซึ่งเวลาที่ชัดเจนจะแตกต่างไปในแต่ละชุมนุม นอกจากนี้
                  ในช่วงปลายภาคเรียนของทุกเทอมจะมีกิจกรรมที่ชื่อว่า Club
                  Festival
                  ซึ่งเป็นพื้นที่ที่ทุกชุมนุมจะมานำเสนอและประชันความสุดยอดของตัวเองกัน!
                </span>
                <button
                  className='px-3 py-1 mt-2 rounded-full font-IBMPlex text-sm md:text-base border text-bmw border-bmw hover:bg-bmw hover:text-white transition-colors duration-300'
                  onClick={() => setShowInfo(!showInfo)}
                >
                  เข้าชมนิทรรศการ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='flex flex-col text-black items-center mx-auto justify-self-center w-full max-w-6xl px-6 pt-10 pb-4'>
          <span className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
            MWIT Club
          </span>
          <button
            className='px-3 py-1 mt-2 mb-4 rounded-full font-IBMPlex text-sm md:text-base border text-bmw opacity-70 border-bmw hover:bg-bmw hover:text-white transition-colors duration-300'
            onClick={() => setShowInfo(!showInfo)}
          >
            MWIT Club คืออะไร?
          </button>
          {/* {!userData || !userData.ok ? (
            <div className='flex flex-wrap text-center justify-center font-IBMPlexLoop text-gray-500 text-base md:text-lg gap-x-2 gap-y-1'>
              <span className=''>
                เข้าสู่ระบบเพื่อลงทะเบียนฟังการนำเสนอโครงงาน
              </span>
              <Link href={'/login'}>
                <a className='underline'>เข้าสู่ระบบ</a>
              </Link>
            </div>
          ) : (
            <div className='flex flex-wrap text-center justify-center font-IBMPlexLoop text-gray-500 text-base md:text-lg gap-x-2 gap-y-1'>
              <span className=''>ลงทะเบียนเข้าฟังการนำเสนอโครงงาน</span>
              <Link href={'/booking'}>
                <a className='underline'>ลงทะเบียน</a>
              </Link>
            </div>
          )} */}
          <div className='flex flex-col gap-3 justify-center px-4 py-3 bg-white rounded-xl shadow-lg w-full max-w-4xl mx-auto'>
            <span className='font-CS font-bold text-xl md:text-2xl self-center'>
              What clubs suited me?
            </span>
            <div className='flex flex-col gap-2'>
              <span className='font-CS font-semibold text-lg md:text-xl'>
                Your interest
              </span>
              <div className='flex flex-wrap text-sm md:text-base gap-x-1 gap-y-2 font-CS font-regular'>
                <button
                  className={
                    (selectedType === clubType && 'bg-ycb text-white') +
                    ' px-3 rounded-full border border-ycb hover:bg-ycb hover:text-white transition-all duration-300'
                  }
                  onClick={() =>
                    selectedType === clubType
                      ? setSelectedType([])
                      : setSelectedType(clubType)
                  }
                >
                  All
                </button>
                {clubType.map((t, ti) => (
                  <button
                    className={
                      (selectedType.includes(t) &&
                        selectedType !== clubType &&
                        'bg-ycb text-white') +
                      ' px-3 rounded-full border border-ycb hover:bg-ycb hover:text-white transition-all duration-300'
                    }
                    key={ti}
                    onClick={() =>
                      selectedType === clubType
                        ? setSelectedType([t])
                        : selectedType.includes(t)
                        ? selectedType.length === 1
                          ? setSelectedType(clubType)
                          : setSelectedType(selectedType.filter((x) => x !== t))
                        : setSelectedType(selectedType.concat([t]))
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-2 pt-1'>
              <span className='font-CS font-semibold text-lg md:text-xl'>
                Activities you like
              </span>
              <div className='flex flex-wrap text-sm md:text-base gap-x-1 gap-y-2 font-CS font-regular'>
                <button
                  className={
                    (selectedAct === clubAct && 'bg-bcb text-white') +
                    ' px-3 rounded-full border border-bcb hover:bg-bcb hover:text-white transition-all duration-300'
                  }
                  onClick={() =>
                    selectedAct === clubAct
                      ? setSelectedAct([])
                      : setSelectedAct(clubAct)
                  }
                >
                  All
                </button>
                {clubAct.map((t, ti) => (
                  <button
                    className={
                      (selectedAct.includes(t) &&
                        selectedAct !== clubAct &&
                        'bg-bcb text-white') +
                      ' px-3 rounded-full border border-bcb hover:bg-bcb hover:text-white transition-all duration-300'
                    }
                    key={ti}
                    onClick={() =>
                      selectedAct === clubAct
                        ? setSelectedAct([t])
                        : selectedAct.includes(t)
                        ? selectedAct.length === 1
                          ? setSelectedAct(clubAct)
                          : setSelectedAct(selectedAct.filter((x) => x !== t))
                        : setSelectedAct(selectedAct.concat([t]))
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap relative overflow-y-hidden max-w-6xl mx-auto px-6 justify-center gap-4 pt-4 pb-10'>
          {clubData
            .filter(
              (c) =>
                c.about.filter((a) => selectedType.includes(a)).length > 0 &&
                c.actabout.filter((a) => selectedAct.includes(a)).length > 0,
            )
            .map((c, i) => (
              <Link href={'/club/' + c.name.replaceAll(' ', '_')} key={i}>
                <a className='rounded-xl bg-white hover:bg-ycbg transition-colors duration-300 shadow-lg max-w-xs overflow-hidden'>
                  <img
                    src={
                      process.env.CDN_URL +
                      '/img/club/cover/' +
                      c.cover +
                      '.webp'
                    }
                    className='w-full'
                  />
                  <div className='px-3 py-2 flex flex-col gap-2'>
                    <span className='font-CS font-semibold text-xl text-bmw'>
                      {c.name}
                    </span>
                    <div className='flex flex-wrap gap-1 font-CS font-semibold text-xs md:text-[0.8rem]'>
                      {c.about.map((a, ai) => (
                        <div className='px-2 rounded-full bg-ycb/50' key={ai}>
                          {a}
                        </div>
                      ))}
                    </div>
                    <div className='flex flex-wrap gap-1 font-CS font-semibold text-xs md:text-[0.8rem]'>
                      {c.actabout.map((a, ai) => (
                        <div className='px-2 rounded-full bg-bcb/50' key={ai}>
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </main>
    </>
  )
}
