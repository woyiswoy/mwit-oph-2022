import Link from 'next/link'
import { useRouter } from 'next/router'
import { projData } from '../../data/sciproj'
import MetaHeader from '../../components/metaHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCircleMinus,
  faCircleXmark,
  faClock,
  faDoorClosed,
  faDownload,
  faTags,
  faUser,
  faUserGear,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'
import TextFormat from '../../components/textformat'

export default function SciProject({ userData }) {
  const router = useRouter()
  const [cardSelected, setCardSelected] = useState(false)
  const [projList, setProjList] = useState(null)
  const [projDate, setProjDate] = useState(null)
  const [projRoom, setProjRoom] = useState(null)
  const [projSearch, setProjSearch] = useState('')
  const [filterHover, setFilterHover] = useState(false)
  const [dateHover, setDateHover] = useState(false)
  const [roomHover, setRoomHover] = useState(false)
  const [search, setSearch] = useState('')
  const cardRefs = useMemo(
    () =>
      Array(projData.length)
        .fill(0)
        .map((i) => React.createRef()),
    [],
  )

  useEffect(() => {
    if (!router.query.id) {
      setCardSelected(false)
      return
    } else {
      setCardSelected(projData.find((x) => x.id === router.query.id))
      const cdx = projData.findIndex((item, i) => item.id === router.query.id)
      cardRefs[cdx].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [router.query.id])

  useEffect(() => {
    if (!router.query.subject) {
      setProjList(projData)
      return
    } else {
      setProjList(
        projData.filter((x) => x.id.slice(2, 4) === router.query.subject),
      )
    }
  }, [router.query.subject])

  useEffect(() => {
    if (!router.query.date) {
      setProjDate(projList)
      return
    } else {
      setProjDate(
        projList.filter(
          (x) => new Date(x.start).getDate() === parseInt(router.query.date),
        ),
      )
    }
  }, [router.query.date, projList])

  useEffect(() => {
    if (!router.query.room) {
      setProjRoom(projDate)
      return
    } else {
      setProjRoom(
        projDate.filter((x) => x.room === parseInt(router.query.room)),
      )
    }
  }, [router.query.room, projDate])

  useEffect(() => {
    if (!router.query.search) {
      setProjSearch(projRoom)
      return
    } else {
      setSearch(router.query.search)
      setProjSearch(
        projRoom.filter((x) =>
          Object.values(x)
            .map((e, i) => (i > 3 ? (Array.isArray(e) ? e.join('') : e) : ''))
            .join('')
            .split('<br>')
            .join('')
            .split('<i>')
            .join('')
            .split('</i>')
            .join('')
            .includes(router.query.search),
        ),
      )
    }
  }, [router.query.search, projRoom])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    router.push(
      {
        query: { ...router.query, search: event.target.value },
      },
      undefined,
      { scroll: false },
    )
  }

  const subjList = [
    {
      name: 'ชีววิทยา',
      href: 'BI',
    },
    {
      name: 'เคมี',
      href: 'CH',
    },
    {
      name: 'ฟิสิกส์',
      href: 'PH',
    },
    {
      name: 'คณิตศาสตร์',
      href: 'MA',
    },
    {
      name: 'คอมพิวเตอร์',
      href: 'CO',
    },
    {
      name: 'ศิลปศาสตร์',
      href: 'LA',
    },
    {
      name: 'ภาษาต่างประเทศ',
      href: 'FO',
    },
  ]

  const dateList = [
    {
      name: '22 สิงหาคม',
      href: '22',
    },
    {
      name: '23 สิงหาคม',
      href: '23',
    },
    {
      name: '24 สิงหาคม',
      href: '24',
    },
  ]

  const roomList = [
    {
      name: 'ห้องที่ 1',
      href: '1',
    },
    {
      name: 'ห้องที่ 2',
      href: '2',
    },
    {
      name: 'ห้องที่ 3',
      href: '3',
    },
    {
      name: 'ห้องที่ 4',
      href: '4',
    },
    {
      name: 'ห้องที่ 5',
      href: '5',
    },
    {
      name: 'ห้องที่ 6',
      href: '6',
    },
  ]

  const meta = {
    title:
      (cardSelected
        ? cardSelected.nameTh
            .split('<br>')
            .join('')
            .split('<i>')
            .join('')
            .split('</i>')
            .join('') + ' - '
        : '') + 'Science Project | MWIT Open House 2022',
    url: 'sciproject',
    description:
      (cardSelected
        ? cardSelected.nameTh
            .split('<br>')
            .join('')
            .split('<i>')
            .join('')
            .split('</i>')
            .join('') + ' - '
        : '') +
      'Online Exhibition โครงงานวิทยาศาสตร์ของนักเรียนโรงเรียนมหิดลวิทยานุสรณ์ทั้ง 6 กลุ่มสาระ | MWIT Open House 2022',
    img: 'ogimage.png',
  }

  // const setSelected = (cid) => {
  //     router.push({
  //         query: {id: cid}
  //     })
  //     const cdx = projDatafindIndex((item, i) => item.id === cid)
  //     cardRefs[cdx].current?.scrollIntoView({ behavior: 'smooth' })
  // }

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

      <main className='w-full bg-yrg/60'>
        <div className='flex flex-col text-black gap-6 items-center mx-auto justify-self-center w-full max-w-6xl px-8 pt-10 pb-4'>
          <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
            Science Project
          </span>
          {!userData || !userData.ok ? (
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
          )}
        </div>
        <div className='flex flex-wrap relative overflow-y-hidden max-w-6xl mx-auto px-8 justify-center gap-4 pb-10'>
          <div className='w-full flex flex-wrap justify-start font-IBMPlex font-semibold text-base gap-2 text-center'>
            <button
              className='flex relative gap-2 shadow-md items-center bg-white/60 text-gray-700 hover:bg-gray-200/60 hover:text-bmw transition-colors duration-300 hover:rounded-b-none rounded-lg py-1 px-2'
              onMouseEnter={() => setFilterHover(true)}
              onMouseLeave={() => setFilterHover(false)}
            >
              <span className='whitespace-nowrap'>
                สาขาวิชา:{' '}
                {subjList.find((x) => x.href === router.query.subject)?.name ||
                  'ดูทั้งหมด'}
              </span>
              <FontAwesomeIcon icon={faCaretDown} />
              <AnimatePresence>
                {filterHover && (
                  <motion.div
                    className='absolute shadow-md overflow-hidden text-base w-full top-full left-0 z-50 flex flex-col bg-white/75 backdrop-blur-sm rounded-b-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link
                      href={{
                        pathname: '/sciproject',
                        query: { ...router.query, subject: undefined },
                      }}
                      scroll={false}
                      passHref
                    >
                      <a
                        className={
                          ' py-1 px-3 flex gap-2 items-center border-gray-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200'
                        }
                      >
                        ดูทั้งหมด
                      </a>
                    </Link>
                    {subjList.map((s, si) => (
                      <Link
                        // href={'/sciproject?subject=' + s.href}
                        href={{
                          pathname: '/sciproject',
                          query: { ...router.query, subject: s.href },
                        }}
                        scroll={false}
                        passHref
                        key={si}
                      >
                        <a
                          className={
                            'border-t py-1 px-3 flex gap-2 items-center border-gray-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200'
                          }
                        >
                          {s.name}
                        </a>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              className='flex relative gap-2 shadow-md items-center bg-white/60 text-gray-700 hover:bg-gray-200/60 hover:text-bmw transition-colors duration-300 hover:rounded-b-none rounded-lg py-1 px-2'
              onMouseEnter={() => setDateHover(true)}
              onMouseLeave={() => setDateHover(false)}
            >
              <span className='whitespace-nowrap'>
                วันที่นำเสนอ:{' '}
                {dateList.find((x) => x.href === router.query.date)?.name ||
                  'ดูทั้งหมด'}
              </span>
              <FontAwesomeIcon icon={faCaretDown} />
              <AnimatePresence>
                {dateHover && (
                  <motion.div
                    className='absolute shadow-md overflow-hidden text-base w-full top-full left-0 z-50 flex flex-col bg-white/75 backdrop-blur-sm rounded-b-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link
                      href={{
                        pathname: '/sciproject',
                        query: { ...router.query, date: undefined },
                      }}
                      scroll={false}
                      passHref
                    >
                      <a
                        className={
                          ' py-1 px-3 flex gap-2 items-center border-gray-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200'
                        }
                      >
                        ดูทั้งหมด
                      </a>
                    </Link>
                    {dateList.map((s, si) => (
                      <Link
                        href={{
                          pathname: '/sciproject',
                          query: { ...router.query, date: s.href },
                        }}
                        scroll={false}
                        passHref
                        key={si}
                      >
                        <a
                          className={
                            'border-t py-1 px-3 flex gap-2 items-center border-gray-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200'
                          }
                        >
                          {s.name}
                        </a>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              className='flex relative gap-2 shadow-md items-center bg-white/60 text-gray-700 hover:bg-gray-200/60 hover:text-bmw transition-colors duration-300 hover:rounded-b-none rounded-lg py-1 px-2'
              onMouseEnter={() => setRoomHover(true)}
              onMouseLeave={() => setRoomHover(false)}
            >
              <span className='whitespace-nowrap'>
                ห้อง:{' '}
                {roomList.find((x) => x.href === router.query.room)?.name ||
                  'ดูทั้งหมด'}
              </span>
              <FontAwesomeIcon icon={faCaretDown} />
              <AnimatePresence>
                {roomHover && (
                  <motion.div
                    className='absolute shadow-md overflow-hidden text-base w-full top-full left-0 z-50 flex flex-col bg-white/75 backdrop-blur-sm rounded-b-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link
                      href={{
                        pathname: '/sciproject',
                        query: { ...router.query, room: undefined },
                      }}
                      scroll={false}
                      passHref
                    >
                      <a
                        className={
                          ' py-1 px-3 flex gap-2 items-center border-gray-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200'
                        }
                      >
                        ดูทั้งหมด
                      </a>
                    </Link>
                    {roomList.map((s, si) => (
                      <Link
                        href={{
                          pathname: '/sciproject',
                          query: { ...router.query, room: s.href },
                        }}
                        scroll={false}
                        passHref
                        key={si}
                      >
                        <a
                          className={
                            'border-t py-1 px-3 flex gap-2 items-center border-gray-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-200'
                          }
                        >
                          {s.name}
                        </a>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <input
              className='grow px-3 py-1 min-w-[18rem] shadow-md placeholder:text-slate-400 block bg-white/75 backdrop-blur-sm rounded-lg outline-none text-base'
              placeholder='ค้นหา'
              type='text'
              name='search'
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <AnimateSharedLayout type='crossfade'>
            {projSearch &&
              projSearch.map((p, i) => (
                <Link
                  href={{
                    pathname: '/sciproject',
                    query: { ...router.query, id: p.id },
                  }}
                  key={p.id}
                  scroll={false}
                  passHref
                  //   replace
                >
                  <motion.a
                    layoutId={'proj-card-' + p.id}
                    // key={p.id}
                    //   onClick={() => {
                    //     router.push(
                    //       {
                    //         query: { ...router.query, id: p.id },
                    //       },
                    //       undefined,
                    //       { scroll: false },
                    //     )
                    //     //   router.query.id = p.id
                    //     //   setCardSelected(p)
                    //   }}
                    // onClick={() => setSelected(p)}
                    className={
                      'w-full cursor-pointer relative flex gap-2 rounded-2xl shadow-md overflow-hidden'
                    }
                    ref={cardRefs[p.index]}
                  >
                    {/* <div className='h-full relative inline-block'> */}
                    <motion.img
                      src={
                        process.env.CDN_URL +
                        '/img/sciproj/webp/' +
                        p.id +
                        '.webp'
                      }
                      className='absolute blur-[9px] right-0 left-0 bottom-0 z-0 w-full'
                      //   layoutId={'proj-img-' + p.id}
                    />
                    <div className='absolute inset-0 bg-white/70' />
                    {/* </div> */}
                    <div className='flex z-10 flex-col gap-2 py-3 px-4'>
                      <motion.span
                        className='font-IBMPlex font-semibold text-xs md:text-sm lg:text-base text-bbk'
                        layoutId={'proj-subj-' + p.id}
                      >
                        {p.subj}
                      </motion.span>
                      <TextFormat
                        className='font-CS font-semibold whitespace-pre-line text-lg md:text-xl lg:text-2xl text-bmw'
                        layoutId={'proj-name-' + p.id}
                        content={p.nameTh}
                      />
                      <motion.div
                        className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-2'
                        layoutId={'proj-member-' + p.id}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className='text-[0.9rem]'
                        />
                        <span className='font-medium whitespace-nowrap'>
                          สมาชิก:
                        </span>
                        <span className='whitespace-pre-wrap'>
                          {p.member.join(', ')}
                        </span>
                      </motion.div>
                      <motion.div
                        className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-2'
                        layoutId={'proj-adv-' + p.id}
                      >
                        <FontAwesomeIcon
                          icon={faUserTie}
                          className='text-[0.9rem]'
                        />
                        <span className='font-medium whitespace-nowrap'>
                          อาจารย์ที่ปรึกษาโครงงาน:
                        </span>
                        <span className='whitespace-pre-wrap'>
                          {p.adv.map((a) => 'อ.' + a).join(', ')}
                        </span>
                      </motion.div>
                      <motion.div
                        className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-2'
                        layoutId={'proj-kw-' + p.id}
                      >
                        <FontAwesomeIcon
                          icon={faTags}
                          className='text-[0.9rem]'
                        />
                        <span className='font-medium whitespace-nowrap'>
                          คำสำคัญ:
                        </span>
                        <TextFormat
                          className='whitespace-pre-wrap'
                          content={p.kw.join(', ')}
                        />
                      </motion.div>
                      <motion.div
                        className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-3'
                        layoutId={'proj-time-' + p.id}
                      >
                        <div className='flex gap-2 items-center'>
                          <FontAwesomeIcon
                            icon={faClock}
                            className='text-[0.9rem]'
                          />
                          <span className='font-medium whitespace-nowrap'>
                            เวลานำเสนอ:
                          </span>
                          <span className='whitespace-nowrap'>
                            {timeRangeString(p.start, p.end)}
                          </span>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <FontAwesomeIcon
                            icon={faDoorClosed}
                            className='text-[0.9rem]'
                          />
                          <span className='font-medium whitespace-nowrap'>
                            ห้อง:
                          </span>
                          <span className=''>{p.room}</span>
                        </div>
                      </motion.div>
                      <motion.div
                        className='font-IBMPlexLoop text-gray-500 text-xs md:text-sm flex gap-2'
                        // layoutId={'proj-abs-' + p.id}
                      >
                        <TextFormat className='line-clamp-2' content={p.abs} />
                      </motion.div>
                      {/* <div className='font-IBMPlexLoop grow text-base flex items-end gap-2'>
                    <Link href={'/sciproject/?id=30CH15-01'}>
                      <a className='text-gray-500'>อ่านเพิ่มเติม...</a>
                    </Link>
                  </div> */}
                    </div>
                  </motion.a>
                </Link>
              ))}
            <AnimatePresence>
              {cardSelected && (
                <div
                  className={
                    'fixed overflow-scroll overflow-x-hidden top-0 pt-[4rem] bottom-0 max-w-7xl z-20 mx-auto right-0 left-0 px-4 pb-6'
                  }
                >
                  <motion.div
                    className=' bg-white/80 relative overflow-hidden backdrop-blur-sm flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-6 rounded-2xl shadow-md p-4'
                    layoutId={'proj-card-' + cardSelected.id}
                  >
                    <div
                      className='absolute right-3 top-3 cursor-pointer z-30'
                      onClick={() => {
                        delete router.query['id']
                        router.push({ query: router.query }, undefined, {
                          scroll: false,
                        })
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className='text-3xl text-gray-400/60 hover:text-red-500/60 transition-colors duration-300'
                      />
                    </div>
                    <div className='flex flex-col items-center gap-2 text-center font-IBMPlex font-medium text-sm md:text-base'>
                      <motion.img
                        src={
                          process.env.CDN_URL +
                          '/img/sciproj/webp/' +
                          cardSelected.id +
                          '.webp'
                        }
                        className='max-w-xs'
                        // layoutId={'proj-img-' + cardSelected.id}
                      />
                      {[
                        {
                          name: 'โปสเตอร์ประชาสัมพันธ์',
                          href:
                            process.env.CDN_URL +
                            '/img/sciproj/' +
                            cardSelected.id +
                            '.png',
                        },
                        {
                          name: 'บทคัดย่อ',
                          href:
                            process.env.CDN_URL +
                            '/file/sciproject/' +
                            cardSelected.id +
                            '.pdf',
                        },
                      ].map((b, bi) => (
                        <Link href={b.href} key={bi}>
                          <a
                            className='py-1 px-2 flex gap-1 justify-center items-center rounded-lg bg-white/50 text-gray-600 hover:text-bmw hover:bg-white/80 transition-colors duration-300 w-full'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              className='text-[0.9rem]'
                            />
                            <span>{b.name}</span>
                          </a>
                        </Link>
                      ))}
                    </div>
                    <div className='flex z-10 flex-col gap-2'>
                      <motion.span
                        className='font-IBMPlex font-semibold text-sm md:text-base lg:text-lg text-bbk'
                        layoutId={'proj-subj-' + cardSelected.id}
                      >
                        {cardSelected.subj}
                      </motion.span>
                      <TextFormat
                        className='font-CS font-bold text-xl md:text-2xl lg:text-3xl text-bmw'
                        layoutId={'proj-name-' + cardSelected.id}
                        content={cardSelected.nameTh}
                      />
                      <TextFormat
                        className='font-CS font-bold text-base md:text-lg lg:text-xl text-bmw'
                        content={cardSelected.nameEn}
                      />
                      <motion.div
                        className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-2'
                        layoutId={'proj-member-' + cardSelected.id}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className='text-[0.9rem]'
                        />
                        <span className='font-medium whitespace-nowrap'>
                          สมาชิก:
                        </span>
                        <span className='whitespace-pre-wrap'>
                          {cardSelected.member.join(', ')}
                        </span>
                      </motion.div>
                      <motion.div
                        className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-2'
                        layoutId={'proj-adv-' + cardSelected.id}
                      >
                        <FontAwesomeIcon
                          icon={faUserTie}
                          className='text-[0.9rem]'
                        />
                        <span className='font-medium whitespace-nowrap'>
                          อาจารย์ที่ปรึกษาโครงงาน:
                        </span>
                        <span className='whitespace-pre-wrap'>
                          {cardSelected.adv.map((a) => 'อ.' + a).join(', ')}
                        </span>
                      </motion.div>
                      {cardSelected.ext !== '' && (
                        <div className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-2'>
                          <FontAwesomeIcon
                            icon={faUserTie}
                            className='text-[0.9rem]'
                          />
                          <span className='font-medium whitespace-nowrap'>
                            อาจารย์ที่ปรึกษาภายนอก:
                          </span>
                          <span className=''>
                            {'อ.' + cardSelected.ext + ' '}
                            <span className='text-gray-600'>
                              {cardSelected.extAdr}
                            </span>
                          </span>
                        </div>
                      )}
                      <div className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-2'>
                        <FontAwesomeIcon
                          icon={faUserGear}
                          className='text-[0.9rem]'
                        />
                        <span className='font-medium whitespace-nowrap'>
                          ผู้รับผิดชอบบทความ:
                        </span>
                        <span className=''>{cardSelected.owner}</span>
                        <Link href={'mailto:' + cardSelected.ownerEmail}>
                          <a className='text-bmw'>{cardSelected.ownerEmail}</a>
                        </Link>
                      </div>
                      <motion.div
                        className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-2'
                        layoutId={'proj-kw-' + cardSelected.id}
                      >
                        <FontAwesomeIcon
                          icon={faTags}
                          className='text-[0.9rem]'
                        />
                        <span className='font-medium whitespace-nowrap'>
                          คำสำคัญ:
                        </span>
                        <TextFormat
                          className='whitespace-pre-wrap'
                          content={cardSelected.kw.join(', ')}
                        />
                      </motion.div>
                      <motion.div
                        className='font-IBMPlexLoop text-xs md:text-sm lg:text-base flex flex-wrap items-center gap-3'
                        layoutId={'proj-time-' + cardSelected.id}
                      >
                        <div className='flex gap-2 items-center'>
                          <FontAwesomeIcon
                            icon={faClock}
                            className='text-[0.9rem]'
                          />
                          <span className='font-medium whitespace-nowrap'>
                            เวลานำเสนอ:
                          </span>
                          <span className='whitespace-nowrap'>
                            {timeRangeString(
                              cardSelected.start,
                              cardSelected.end,
                            )}
                          </span>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <FontAwesomeIcon
                            icon={faDoorClosed}
                            className='text-[0.9rem]'
                          />
                          <span className='font-medium whitespace-nowrap'>
                            ห้อง:
                          </span>
                          <span className=''>{cardSelected.room}</span>
                        </div>
                      </motion.div>
                      <motion.div
                        className='font-IBMPlexLoop text-gray-700 text-sm md:text-base flex flex-col gap-1'
                        // layoutId={'proj-abs-' + cardSelected.id}
                      >
                        <span className='font-medium text-base md:text-lg text-black whitespace-nowrap'>
                          บทคัดย่อ
                        </span>
                        <TextFormat
                          className='indent-10 leading-relaxed'
                          content={cardSelected.abs}
                        />
                      </motion.div>

                      {/* <div className='font-IBMPlexLoop grow text-base flex items-end gap-2'>
                    <Link href={'/sciproject/?id=30CH15-01'}>
                      <a className='text-gray-500'>อ่านเพิ่มเติม...</a>
                    </Link>
                  </div> */}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </AnimateSharedLayout>
        </div>
      </main>
    </>
  )
}
