import Link from 'next/link'
import MetaHeader from '../../components/metaHeader'

export default function VirtualLab() {
  const meta = {
    title: 'Virtual Lab & Activity | MWIT Open House 2022',
    url: 'lab',
    description:
      'Virtual lab & activity ร่วมทำกิจกรรมการทดลองของแต่ละสาขาวิชาผ่านเว็บไซต์ สำหรับผู้เข้าร่วมงาน MWIT Open House 2022 ทุกคน โดยไม่ต้องทะเบียน | MWIT Open House 2022',
    img: 'ogimage.png',
  }

  const labList = [
    {
      title: 'สาขาวิชาคณิตศาสตร์และวิทยาการคำนวณ',
      subtt:
        'เกร็ดความรู้และปัญหาทางคณิตศาสตร์และวิทยาการคำนวณในระดับมัธยมศึกษาตอนต้น',
      img: 'math1',
      desc: 'ห้องนิทรรศการออนไลน์เกี่ยวกับเรื่องราวที่น่าสนใจทางคณิตศาสตร์และวิทยาการคำนวณ โดยจะมีเกม walk rally ให้ผู้เข้าชมตามหาคำถามที่ซ่อนไว้ในบริเวณต่างๆ แล้วจึงตอบให้ถูกต้องใน Google Form เพื่อรับรางวัลสำหรับผู้ตอบคำถามได้มากที่สุด 5 อันดับแรก',
      href: 'mathcom',
    },
    {
      title: 'สาขาวิชาเคมี',
      subtt:
        'เรียนรู้ทักษะพื้นฐานงานปฏิบัติการเคมี และความรู้เกี่ยวกับปฏิกิริยาเคมีในชีวิตประจำวัน',
      img: 'chem1',
      desc: 'เรียนรู้การทดลองทางเคมีผ่านแพลทฟอร์มออนไลน์ที่ได้ทั้งความรู้และความสนุก เช่น การหาความเข้มข้นสารละลายด้วย simulation, เรียนรู้การทำปฏิกิริยาเคมีจากการทำแซนวิช หรือฝึกทักษะพื้นฐานทางเคมี และปฏิบัติการการทดลองที่สามารถทำได้จากที่บ้านด้วย',
      href: 'chemistry',
    },
    {
      title: 'สาขาวิชาชีววิทยาและวิทยาศาสตร์สุขภาพ',
      subtt:
        'กิจกรรมจากกลุ่มสาระชีววิทยา และกลุ่มสาระสุขศึกษาและพลศึกษา ที่ลุ้นรับของรางวัลมากมาย',
      img: 'bio',
      desc: 'เรียนรู้เกี่ยวกับสิ่งมีชีวิต ดีเอ็นเอ ส่วนของสมองมนุษย์ และการเล่นกีฬาผ่านกิจกรรมและคลิปวิดีโอต่าง ๆ เพื่อตอบคำถามลุ้นรับของรางวัลอีกมากมาย',
      href: 'biology',
    },
    {
      title: 'สาขาวิชาฟิสิกส์',
      subtt:
        'เรียนรู้หลักการและปัญหาทางฟิสิกส์ผ่าน Nearpod เพื่อการเรียนที่ Interactive',
      img: 'phy',
      desc: 'กิจกรรมการเรียนรู้ฟิสิกส์แผนเดิม เพื่อเสริมสร้างความรู้พื้นฐาน และการคิดวิเคราะห์เพื่อแก้ปัญหา โดยประกอบด้วยเรื่องกลศาสตร์ การเคลื่อนที่แบบต่าง ๆ หลักการของแสง กระจกและเลนส์ การต่อวงจรไฟฟ้า รวมไปถึงหลักการทางดาราศาสตร์ ซึ่งการทำกิจกรรมและแลกเปลี่ยนความรู้จะดำเนินอยู่บน Nearpod',
      href: 'physic',
    },
  ]

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-bvl/60'>
        <div className='flex flex-col text-black items-center mx-auto justify-self-center w-full max-w-6xl px-6 pt-10 pb-4'>
          <span className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
            Virtual Lab & Activities
          </span>
          <span className='font-IBMPlexLoop text-center text-gray-700 text-base md:text-lg lg:text-xl'>
            กดที่กล่องข้อความของแต่ละสาชาวิชาเพื่อเข้าร่วมกิจกรรม
          </span>
        </div>
        <div className='flex flex-col relative overflow-y-hidden max-w-6xl mx-auto px-6 justify-center gap-4 pt-4 pb-10'>
          {labList.map((l, li) => (
            <Link href={'/lab/' + l.href} key={li}>
              <a
                className={
                  'w-full relative group shadow-lg flex flex-col md:flex-row rounded-xl overflow-hidden min-h-[15rem] ' +
                  (li % 2 === 1 && 'justify-end')
                }
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      process.env.CDN_URL + '/img/' + 'lab/' + l.img + '.webp'
                    })`,
                  }}
                  className='relative md:absolute bg-cover bg-bottom bg-no-repeat w-full aspect-[16/5] md:inset-0'
                />
                <div className='w-full md:w-fit md:max-w-md bg-white/70 group-hover:bg-white/90 transition-colors duration-300 backdrop-blur-md px-4 py-3 flex flex-col'>
                  <span className='font-CS font-semibold text-xl md:text-2xl text-bmw'>
                    {l.title}
                  </span>
                  <span className='font-IBMPlex font-semibold text-sm md:text-base text-gray-700'>
                    {l.subtt}
                  </span>
                  <span className='font-IBMPlexLoop text-xs md:text-sm leading-relaxed md:leading-relaxed pt-2'>
                    {l.desc}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
