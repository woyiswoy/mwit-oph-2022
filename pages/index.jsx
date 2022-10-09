import Head from 'next/head'
import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimateSharedLayout, motion, useScroll } from 'framer-motion'
import { clamp } from 'lodash'
import Link from 'next/link'
import ActCard from '../components/actcard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faCircleXmark,
  faFileInvoice,
  faFlaskVial,
  faPeopleRobbery,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'

const wcmes =
  'สเต็ปโบว์ธุหร่ำวาทกรรม เทรลเลอร์บ๊วย โทรโข่งเพรส มาร์เก็ตติ้ง นิวสแล็กดีพาร์ตเมนต์อาร์พีจีแฮนด์ ซิตีพุทธศตวรรษรีไทร์ ยังไง คีตปฏิภาณเอ็กซ์เพรสเอ็นเตอร์เทน โฮลวีตเคลื่อนย้าย เพียวคันถธุระวอร์รูมจ๊าบคอลัมน์ เบิร์ดแหวว หมิง วีซ่า คีตกวีเบนโลทอล์ค โค้กศิลปวัฒนธรรมเชอร์รี่เกย์ เปียโนจอหงวน\nโฮลวีตเลิฟอ่อนด้อย แซ็กสโตร์ออทิสติกปิกอัพ เย้วเย้วไพลินแฮมเบอร์เกอร์ เอ๊าะแฟรีไอซ์ เวสต์ เลคเชอร์โลโก้น้องใหม่ยาวีแรลลี รวมมิตรเวสต์โดมิโนสแควร์สวีท คำตอบ คีตราชันวิลเลจอึมครึมสไปเดอร์ แพลน โอเวอร์โมเดิร์น แต๋วตุ๊ด ซีอีโออ่วม ซีเนียร์เยนปิยมิตรปิยมิตร แช่แข็ง ผลักดันมาราธอน\nเดอะ เฮอร์ริเคนพันธกิจรีทัชชะโนดสหรัฐ กาญจน์หลวงตาทริป อัลบัมมอยส์เจอไรเซอร์ คำสาปแชมเปี้ยนโหงวเฮ้งสต็อกภูมิทัศน์ อ่วม มาร์เก็ตติ้งโชว์รูม โปรเจกเตอร์โทรโข่งโปรโมชั่นแชมปิยองเดี้ยง เปปเปอร์มินต์แดนซ์หลวงตา แฮนด์เวิร์ลด์ห่วยกรุ๊ปมายาคติ โต๊ะจีนไบเบิลเบิร์ดปฏิสัมพันธ์คัตเอาต์ เมจิกอิมพีเรียล พริตตี้ คองเกรสไอติมเซี้ยว หล่อฮังก้วยแม็กกาซีน ลาติน'

const allAct = [
  {
    name: 'Class @MWIT',
    src: 'class',
    desc: 'น้อง ๆ จะได้มีโอกาสมาร่วมทำกิจกรรมกับอาจารย์และพี่ ๆ MWIT ผ่าน Zoom โดยเรานำกิจกรรมทุกสาขาวิชามาให้เลือกลงทะเบียนรับจำนวนจำกัดเฉพาะผู้ที่ลงทะเบียนเท่านั้น !!',
    href: '/booking',
    button: 'ลงทะเบียน',
  },
  {
    name: 'Science Project',
    src: 'projcover',
    desc: 'รับชมการนำเสนอโครงงานของนักเรียน MWIT กว่า 90 โครงงานพร้อม Q&A session ที่เปิดโอกาสให้ผู้ชมถามข้อสงสัยกันได้ !',
    href: '/sciproject',
    button: 'Exhibition',
  },
  {
    name: 'MWIT Club',
    src: 'club',
    desc: 'กิจกรรมชุมนุมที่จัดทำโดยนักเรียน MWIT ในรูปแบบ Blog โดยนักเรียนทุกคนสามารถเปิดชุมนุมเพื่อรวมกลุ่มบุคคลที่มีความสนใจด้านเดียวกันมาทำกิจกรรมร่วมกัน ซึ่งในภาคเรียนนี้โรงเรียนของเราก็มีชุมนุมให้นักเรียนทุกคนได้เลือกเข้าถึง 56 ชุมนุม!',
    href: '/club',
    button: 'Exhibition & Blog',
  },
  {
    name: 'Virtual Lab & Activities',
    src: 'lab',
    desc: 'ร่วมทำกิจกรรมการทดลองของแต่ละสาขาวิชาผ่านเว็บไซต์ สำหรับผู้เข้าร่วมงาน MWIT Open House 2022 ทุกคน โดยไม่ต้องทะเบียน',
    href: '/lab',
    button: 'Lab',
  },
  {
    name: 'MWIT Curriculum',
    src: 'curr',
    desc: 'หลักสูตร คำอธิบายรายวิชา และลักษณะการเรียนการสอนแต่ละสาขาของโรงเรียนมหิดลวิทยานุสรณ์',
    href: '/curriculum',
    button: 'Exhibition & Blog',
  },
  {
    name: 'School Tour',
    src: 'sctour',
    desc: 'ชมรายละเอียดสถานที่ต่าง ๆ ภายในโรงเรียนมหิดลวิทยานุสรณ์ ในรูปแบบคลิปวิดีโอ',
    href: '/tour',
    button: 'Exhibition & Vlog',
  },
  {
    name: 'MWITagram',
    src: 'mwitagram',
    desc: 'แกลเลอรีผลงานภาพถ่ายบรรยากาศในบริเวณโรงเรียนมหิดลวิทยานุสรณ์ และภาพกิจกรรมต่าง ๆ',
    href: '/mwitagram',
    button: 'Gallery',
  },
  {
    name: 'โครงการวาดภาพและถ่ายภาพทางชีววิทยา',
    src: 'biovote',
    desc: 'ผลงานการวาดภาพและถ่ายภาพทางชีววิทยาของนักเรียน MWIT สามารถโหวตได้ตั้งแต่วันนี้ถึง 11 กันยายน 2565',
    href: '/biovote',
    button: 'Gallery',
  },
]

const wcText =
  'สวัสดีผู้ร่วมงาน MWIT Open House 2022\n\nกระผมในนามของโรงเรียนมหิดลวิทยานุสรณ์ หรือ MWIT ขอขอบคุณที่ท่านให้เกียรติมาแวะเวียนเยี่ยมชมและร่วมกิจกรรมเปิดบ้านโรงเรียนมหิดลวิทยานุสรณ์ (MWIT Open House 2022) ในปีนี้ สิ่งที่ท่านเห็นทั้งหมดเกิดจากน้ำพักน้ำแรงของนักเรียน ม.4 ม.5 ม.6 ของ MWIT ที่ภูมิใจนำเสนอผลจากการที่เขาได้รับการพัฒนาเมื่ออยู่ที่ MWIT รวมถึงบรรยากาศการใช้ชีวิตในรั้วโรงเรียนและหลังจากจบจาก MWIT ให้สังคมไทยได้ร่วมกันชื่นชม\n\nนักเรียน MWIT ทุกคน เป็นผู้ที่มีความสามารถพิเศษด้านวิทยาศาสตร์และคณิตศาสตร์ของประเทศไทย และมีความตั้งใจที่จะพัฒนาตนเองให้มีทักษะการเป็นนักวิจัยและความสามารถในการคิดค้นสิ่งใหม่ ประดิษฐ์และสร้างนวัตกรรม โดยที่เขาเลือก MWIT เพราะเป็นโรงเรียนแห่งโอกาส โอกาสที่จะทำให้เขาได้รับการพัฒนาอย่างรอบด้าน ทั้งด้านวิชาการ ความสามารถเฉพาะในการสร้างองค์ความรู้ และโอกาสในการพัฒนาการใช้ชีวิตอย่างกลมกลืนในสังคมใหญ่ เรียนรู้ที่จะเป็นผู้นำและผู้ตาม ใช้เหตุใช้ผลในการดำรงชีวิต เพื่อที่ร่วมกันสร้างสังคมไทยที่เจริญก้าวหน้า และเป็นสังคมที่อยู่ร่วมกันอย่างผาสุกได้\n\nทีมงานผู้จัดเป็นบุคลากร MWIT ทั้งโรงเรียน โดยมีคณะกรรมการนักเรียน (กน.) เป็นแกนนำ เราวางแผนและดำเนินการร่วมกันเพื่อนำเสนอผลสำเร็จในมิติต่างๆ ไม่ว่าจะเป็น \n- ผลการพัฒนาทักษะวิจัยผ่านกิจกรรม Science Project กว่า 90 โครงงาน\n- ผลการจัดการเรียนการสอนผ่านห้องเรียน Class@MWIT จากทุกสาขาวิชา \n- ผลการจัดการเรียนรู้แบบบูรณาการของกิจกรรม STEM Challenge ผ่าน MWIT Pitching\n- ผลการจัดกิจกรรม สอวน. และโอลิมปิกวิชาการ ซึ่งเราเป็นโรงเรียนแห่งเดียวที่เป็นศูนย์ สอวน. ทั้ง 8 สาขาผ่านกิจกรรม MWIT Square ครั้งที่ 14\n- ผลการสร้างบุคลากรของประเทศ ผ่านกิจกรรม Interview MWIT Alumni \n- ผลการเตรียมตัวก่อนเข้า MWIT ผ่านกิจกรรม TIPs & TRICKs by MWIT Students\n- ผลงานริเริ่มของนักเรียนในการเปิดพื้นที่ทำกิจกรรมที่ตนสนใจและมีประโยชน์ ผ่านนิทรรศการออนไลน์ MWIT Club ซึ่งในปีนี้เรามีถึง 56 ชุมนุม สำหรับนักเรียนเพียง 720 คนของเรา\n\nนอกจากนี้ยังมี Blog, Vlog, Virtual Tour, Gallery และ MWITagram ซึ่งเป็นผลงานของนักเรียนทั้งหมด\n\nกิจกรรมและผลงานที่แสดงในงาน MWIT Open House 2022 ครั้งนี้จะยืนยันในคุณลักษณะของนักเรียน MWIT ที่จะได้รับการหล่อหลอมและส่งเสริมเมื่อเข้ามาเป็นสมาชิกของครอบครัว MWIT ขอให้ผู้ร่วมงานทุกท่านใช้เวลากับกิจกรรมต่างๆ อย่างเต็มที่ เพื่อให้เรียนรู้ถึง MWIT DNA และสมรรถนะที่แท้จริงของนักเรียน MWIT ผมมั่นใจว่า หากได้ร่วมชมผลงานแล้วในทุกกิจกรรมแล้วก็คงอยากมาเป็นครอบครัว MWIT\n\nขอให้มีความสุขกับการชื่นชมผลงานของนักเรียน MWIT ด้วยกันนะครับ\n\nด้วยความเคารพ\n\nดร.วรวรงค์ รักเรืองเดช\nผู้อำนวยการโรงเรียนมหิดลวิทยานุสรณ์\n21 สิงหาคม 2565'

const subjAct = [
  {
    name: 'สาชาวิชาคณิตศาสตร์และวิทยาการคำนวณ',
    img: 'mth169',
    vl: 'mathcom',
    curr: 'mathcom',
  },
  {
    name: 'สาขาวิชาเคมี',
    img: 'chm169',
    vl: 'chemistry',
    curr: 'chemistry',
  },
  {
    name: 'สาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ',
    sub: 'กลุ่มสาระการเรียนรู้ชีววิทยา',
    img: 'bio169',
    vl: 'biology',
    curr: 'biology',
  },
  {
    name: 'สาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ',
    sub: 'กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา',
    img: 'hpe169',
    vl: 'biology',
    curr: 'hpe',
  },
  {
    name: 'สาขาวิชาฟิสิกส์',
    img: 'phy169',
    vl: 'physics',
    curr: 'physics',
  },
  {
    name: 'สาขาภาษาต่างประเทศ',
    img: 'fld169',
    curr: 'foreignlanguage',
  },
  {
    name: 'สาขาวิชาศิลปศาสตร์',
    sub: 'กลุ่มสาระการเรียนรู้สังคมศึกษาและศิลปะ',
    img: 'lba169',
    curr: 'liberalart',
  },
  {
    name: 'สาขาวิชาศิลปศาสตร์',
    sub: 'กลุ่มสาระการเรียนรู้ภาษาไทย',
    img: 'tha169',
    curr: 'thai',
  },
]

export default function Home({ userData }) {
  const [showWC, setShowWC] = useState(false)
  const lifeRef = useRef(null)
  const actRef = useRef(null)
  const subjRef = useRef(null)
  const WelcomeButton = [
    {
      name: 'LIFE at MWIT',
      icon: faPeopleRobbery,
      ref: lifeRef,
    },
    {
      name: 'All Activities',
      icon: faPuzzlePiece,
      ref: actRef,
    },
    {
      name: 'ตามสาขาวิชา',
      icon: faBook,
      ref: subjRef,
    },
  ]
  return (
    <>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>MWIT Open House 2022</title>
        <meta
          name='description'
          content='MWIT Open House 2022 เปิดบ้านโรงเรียนมหิดลวิทยานุสรณ์ พบกับกิจกรรมและนิทรรศการมากมายตลอดวันที่ 22 - 28 สิงหาคม 2565 ในรูปแบบออนไลน์'
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property='og:url' content='https://openhouse.mwit.ac.th' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='MWIT Open House 2022' />
        <meta
          property='og:description'
          content='MWIT Open House 2022 เปิดบ้านโรงเรียนมหิดลวิทยานุสรณ์ พบกับกิจกรรมและนิทรรศการมากมายตลอดวันที่ 22 - 28 สิงหาคม 2565 ในรูปแบบออนไลน์'
        />
        <meta
          property='og:image'
          content='https://mwitophcdn.woyiswoy.com/img/ogimage.png'
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='openhouse.mwit.ac.th' />
        <meta property='twitter:url' content='https://openhouse.mwit.ac.th' />
        <meta name='twitter:title' content='MWIT Open House 2022' />
        <meta
          name='twitter:description'
          content='MWIT Open House 2022 เปิดบ้านโรงเรียนมหิดลวิทยานุสรณ์ พบกับกิจกรรมและนิทรรศการมากมายตลอดวันที่ 22 - 28 สิงหาคม 2565 ในรูปแบบออนไลน์'
        />
        <meta
          name='twitter:image'
          content='https://mwitophcdn.woyiswoy.com/img/ogimage.png'
        />
      </Head>
      <div className='flex flex-col w-full'>
        <div
          style={{
            backgroundImage: `url(${process.env.CDN_URL + '/img/sky.webp'})`,
          }}
          className={
            'w-full bg-cover bg-bottom sm:bg-fixed flex items-end min-h-screen relative justify-self-center self-center space-y-2'
          }
        >
          {/* <div
            style={{
              backgroundImage: `url(${'' + '/img/welcome.webp'})`,
            }}
            className='block fixed inset-0 bg-cover -z-10'
          /> */}
          <div className='w-full h-full py-6 flex items-center'>
            <div className='w-full max-w-7xl grid md:grid-cols-2 gap-6 items-center justify-items-center mx-auto px-6'>
              <iframe
                type='text/html'
                className='w-full max-w-xl aspect-video rounded-xl'
                src='https://www.youtube.com/embed/NPT5ljzqJr4?modestbranding=1&color=white&iv_load_policy=3'
                frameBorder='0'
                allowFullScreen
              />
              <div className='flex flex-col gap-3'>
                <AnimateSharedLayout type='crossfade'>
                  <motion.div
                    className='flex flex-col gap-1 bg-white/40 shadow-lg backdrop-blur-sm px-4 py-5 rounded-xl'
                    layoutId='welcome-canvas'
                  >
                    <motion.span
                      layoutId={'welcome-title'}
                      className='font-CS text-3xl md:text-4xl font-bold text-bmw'
                    >
                      Welcome Message
                    </motion.span>
                    <motion.span
                      layoutId={'welcome-desc'}
                      className='font-CS text-base md:text-lg lg:text-xl text-blue-500'
                    >
                      สาส์นจากผู้อำนวยการโรงเรียนมหิดลวิทยานุสรณ์
                    </motion.span>
                    <div className='flex flex-col gap-2 mt-2'>
                      {wcText.split('\n\n').map(
                        (t, ti) =>
                          ti < 2 && (
                            <motion.span
                              key={ti}
                              layoutId={'welcome-ct-' + ti.toString()}
                              className='font-IBMPlexLoop leading-relaxed md:leading-relaxed text-sm md:text-base text-black'
                            >
                              {t}
                            </motion.span>
                          ),
                      )}
                    </div>
                    <button
                      onClick={() => setShowWC(true)}
                      className='text-sm md:text-base bg-white/30 w-fit hover:bg-white/60 hover:text-bmw transition-all duration-300 backdrop-blur-sm text-bmw/70 rounded-full px-4 py-1 mt-2 font-IBMPlex font-semibold'
                    >
                      Read full text
                    </button>
                  </motion.div>
                  {showWC && (
                    <div className='fixed inset-0 pt-16 px-6 pb-6 z-50 overflow-y-scroll'>
                      <motion.div
                        className='w-full relative max-w-2xl mx-auto flex flex-col gap-1 bg-white/80 shadow-lg backdrop-blur-md px-4 py-5 rounded-xl'
                        layoutId='welcome-canvas'
                      >
                        <div
                          className='absolute right-3 top-3 cursor-pointer z-30'
                          onClick={() => setShowWC(false)}
                        >
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className='text-3xl text-gray-400/60 hover:text-red-500/60 transition-colors duration-300'
                          />
                        </div>
                        <motion.span
                          layoutId={'welcome-title'}
                          className='font-CS text-3xl md:text-4xl font-bold text-bmw'
                        >
                          Welcome Message
                        </motion.span>
                        <motion.span
                          layoutId={'welcome-desc'}
                          className='font-CS text-base md:text-lg lg:text-xl text-blue-500'
                        >
                          สาส์นจากผู้อำนวยการโรงเรียนมหิดลวิทยานุสรณ์
                        </motion.span>
                        <div className='flex flex-col gap-2 mt-2'>
                          {wcText.split('\n\n').map((t, ti) =>
                            ti < 2 ? (
                              <motion.span
                                key={ti}
                                layoutId={'welcome-ct-' + ti.toString()}
                                className='font-IBMPlexLoop leading-relaxed md:leading-relaxed text-sm md:text-base text-black'
                              >
                                {t}
                              </motion.span>
                            ) : (
                              <span
                                className='font-IBMPlexLoop leading-relaxed md:leading-relaxed text-sm md:text-base text-black'
                                key={ti}
                              >
                                {t.split('\n').map((tn, tni) => (
                                  <Fragment key={tni}>
                                    {tn}
                                    <br />
                                  </Fragment>
                                ))}
                              </span>
                            ),
                          )}
                        </div>
                        <button
                          onClick={() => setShowWC(false)}
                          className='text-sm md:text-base bg-white/30 w-fit hover:bg-white/60 hover:text-bmw transition-all duration-300 backdrop-blur-sm text-bmw/70 rounded-full px-4 py-1 mt-2 font-IBMPlex font-semibold'
                        >
                          Close
                        </button>
                      </motion.div>
                    </div>
                  )}
                </AnimateSharedLayout>
                <div className='grid grid-cols-3 gap-2 sm:gap-3 rounded-xl'>
                  {WelcomeButton.map((w, wi) => (
                    <button
                      key={wi}
                      onClick={() =>
                        w.ref.current?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className='px-3 py-2 text-xs group hover:bg-white/60 transition-colors duration-300 md:text-sm lg:text-base rounded-xl gap-2 font-IBMPlex flex flex-col justify-center items-center bg-white/40 shadow-lg backdrop-blur-sm'
                    >
                      <FontAwesomeIcon
                        icon={w.icon}
                        className='text-[2em] text-phd opacity-70 group-hover:opacity-100 transition-opacity duration-300'
                      />
                      <span className='opacity-70 group-hover:opacity-100 transition-opacity duration-300'>
                        {w.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          // style={{
          //   backgroundImage: `url(${
          //     process.env.CDN_URL + '/img/projcover.jpg'
          //   })`,
          // }}
          className={
            'w-full flex bg-cover ' +
            'bg-bottom' +
            ' bg-no-repeat sm:bg-fixed relative justify-self-center self-center'
          }
        >
          <div
            className='flex flex-col items-center w-full max-w-7xl px-8 py-6 gap-4 mx-auto'
            ref={lifeRef}
          >
            <span className='font-CS font-bold text-2xl md:text-3xl lg:text-4xl mt-10'>
              FACTs About MWIT
            </span>
            <iframe
              type='text/html'
              className='w-full max-w-3xl aspect-video rounded-xl'
              src='https://www.youtube.com/embed/sBPFl6MWh9M?modestbranding=1&color=white&iv_load_policy=3'
              frameBorder='0'
              allowFullScreen
            />
            <span className='font-CS font-bold text-2xl md:text-3xl lg:text-4xl mt-10'>
              ONE DAY in MWIT
            </span>
            <iframe
              type='text/html'
              className='w-full max-w-3xl aspect-video rounded-xl'
              src='https://www.youtube.com/embed/NL83Ginirbc?modestbranding=1&color=white&iv_load_policy=3'
              frameBorder='0'
              allowFullScreen
            />
            <span
              className='font-CS font-bold text-2xl md:text-3xl lg:text-4xl pt-16'
              ref={actRef}
            >
              All Activities
            </span>
            <div className='w-full flex flex-wrap justify-center gap-3 pb-8'>
              {allAct.map((a, ai) => (
                <ActCard
                  key={ai}
                  src={a.src}
                  name={a.name}
                  desc={a.desc}
                  href={a.href}
                  button={a.button}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className='w-full min-h-screen bg-black/80 px-8 py-6'
          ref={subjRef}
        >
          <div className='w-full h-full max-w-7xl mx-auto flex flex-col justify-center items-center gap-6'>
            <span className='font-CS font-bold text-2xl md:text-3xl lg:text-4xl mt-5 text-white'>
              กิจกรรมตามสาขาวิชา
            </span>
            <div className='flex flex-wrap gap-4 justify-center'>
              {subjAct.map((s, si) => (
                <div
                  key={si}
                  className='flex flex-col group w-full max-w-sm overflow-hidden rounded-xl'
                >
                  <img
                    src={
                      process.env.CDN_URL + '/img/subject/' + s.img + '.webp'
                    }
                    className='w-full'
                  />

                  <div
                    className={
                      'w-full relative grid bg-black ' +
                      (s.vl ? 'grid-cols-2' : 'grid-cols-1')
                    }
                  >
                    <div className='flex flex-col absolute bottom-full right-0 left-0 px-3 py-2 bg-black/60 group-hover:bg-black/80 transition-all duration-300 backdrop-blur-md'>
                      <span className='font-CS font-semibold text-white text-xl'>
                        {s.name}
                      </span>
                      <span className='font-IBMPlex font-semibold text-blue-300 text-base'>
                        {s.sub}
                      </span>
                    </div>
                    {s.vl && (
                      <Link href={'/lab/' + s.vl}>
                        <a className='w-full justify-center items-center font-IBMPlex font-semibold flex gap-1 py-2 px-3 bg-ymw/20 text-ymw/40 hover:bg-ymw/30 hover:text-white/70 transition-colors duration-300'>
                          <FontAwesomeIcon
                            icon={faFlaskVial}
                            className='pb-1'
                          />
                          <span className=''>Virtual Lab</span>
                        </a>
                      </Link>
                    )}
                    <Link href={'/curriculum/' + s.curr}>
                      <a className='w-full justify-center items-center font-IBMPlex font-semibold flex gap-1 py-2 px-3 bg-bmw/30 text-white/40 hover:bg-bmw/50 hover:text-white/70 transition-colors duration-300'>
                        <FontAwesomeIcon
                          icon={faFileInvoice}
                          className='pb-1'
                        />
                        <span className=''>Curriculum</span>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${
              process.env.CDN_URL + '/img/clubcover.webp'
            })`,
          }}
          className={
            'w-full flex items-end h-screen bg-cover ' +
            'bg-bottom' +
            ' bg-no-repeat bg-fixed relative justify-self-center self-center space-y-2'
          }
        >
          <div className='w-full h-full bg-black/70'>
            <div className='w-full h-full max-w-5xl flex flex-col gap-2 justify-center mx-auto px-8'>
              <span className='font-CS text-4xl md:text-5xl font-bold text-purple-300'>
                MWIT Club
              </span>
              <span className='text-base md:text-lg lg:text-xl font-IBMPlex text-white leading-relaxed md:leading-relaxed'>
                Online Exhibition การนำเสนอกิจกรรมชุมนุมที่จัดทำโดยนักเรียน MWIT
                สู่สายตาบุคคลภายนอกในรูปแบบ Blog โดยนักเรียนใน MWIT
                ทุกคนสามารถเปิดชุมนุมเพื่อรวมกลุ่มบุคคลที่มีความสนใจด้านเดียวกันมาทำกิจกรรมร่วมกัน
                ซึ่งในภาคเรียนนี้โรงเรียนของเราก็มีชุมนุมให้นักเรียนทุกคนได้เลือกเข้าถึง
                56 ชุมนุม!
              </span>
              <div className='flex gap-2 mt-2'>
                <Link href={'/club'}>
                  <a className='bg-white/20 hover:bg-white/60 hover:text-purple-700 transition-all duration-300 backdrop-blur-sm text-purple-200/80 rounded-full px-4 py-2 font-IBMPlex font-semibold'>
                    Online Exhibiton
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer></footer>
    </>
  )
}
