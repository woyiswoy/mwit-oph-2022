import { faFlaskVial } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import MetaHeader from '../../components/metaHeader'

export default function VirtualLab() {
  const meta = {
    title:
      'Math&Com Rally in Gather.town - สาขาวิชาคณิตศาสตร์และวิทยาการคำนวณ | Virtual Lab & Activity | MWIT Open House 2022',
    url: 'lab/mathcom',
    description:
      'นิทรรศการออนไลน์เกี่ยวกับเรื่องราวที่น่าสนใจทางคณิตศาสตร์และวิทยาการคำนวณ โดยจะมีเกม walk rally ให้ผู้เข้าชมตามหาคำถามที่ซ่อนไว้ในบริเวณต่าง ๆ แล้วจึงตอบให้ถูกต้องใน Google Form เพื่อชิงเงินรางวัล | MWIT Open House 2022',
    img: 'ogimage.png',
  }

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-bvl/60'>
        <div className='flex flex-col text-center text-black items-center mx-auto justify-self-center w-full max-w-6xl px-6 pt-10 pb-4'>
          <span className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
            สาขาวิชาคณิตศาสตร์และวิทยาการคำนวณ
          </span>
          <span className='font-CS font-bold text-bbk text-xl md:text-2xl lg:text-3xl'>
            Virtual Lab & Activities
          </span>
        </div>
        <div className='flex flex-col relative overflow-y-hidden max-w-6xl mx-auto px-6 justify-center gap-4 pt-4 pb-10'>
          <div className='flex relative flex-col gap-2 items-center shadow-lg py-3 px-4 bg-pink-200/40 backdrop-blur-md rounded-xl'>
            <span className='text-lg md:text-xl lg:text-2xl font-CS font-semibold text-center mt-2'>
              Math&Com Rally in Gather.town
            </span>
            <div className='grid grid-flow-row md:grid-flow-col gap-4 justify-items-center'>
              <img
                src={process.env.CDN_URL + '/img/lab/' + 'mathact.webp'}
                className='w-full max-w-sm rounded-xl'
              />
              <div className='flex flex-col justify-center gap-2'>
                <span className='font-IBMPlexLoop text-sm md:text-base'>
                  นิทรรศการออนไลน์เกี่ยวกับเรื่องราวที่น่าสนใจทางคณิตศาสตร์และวิทยาการคำนวณ
                  โดยจะมีเกม walk rally
                  ให้ผู้เข้าชมตามหาคำถามที่ซ่อนไว้ในบริเวณต่างๆ
                  แล้วจึงตอบให้ถูกต้องใน Google Form เพื่อชิงเงินรางวัล
                </span>
                <span className='font-IBMPlexLoop text-sm md:text-base font-semibold'>
                  พบกับนักเรียนปัจจุบัน ในช่วงเวลาดังนี้
                </span>
                <ol className='font-IBMPlexLoop text-sm md:text-base list-inside list-disc space-y-1'>
                  <li>ทุกวันเวลา 18:00-21:00 น.</li>
                  <li>
                    เสาร์อาทิตย์เพิ่มช่วง 9:00-12:00 น. และ 13:00-16:00 น.
                  </li>
                </ol>
                <Link
                  href={
                    'https://app.gather.town/app/RJ7jsDxnstdu3JVS/MWIT_MathCom'
                  }
                >
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className='self-center text-sm md:text-base flex gap-1 items-center mt-2 px-3 py-1 rounded-full font-IBMPlex font-semibold bg-ymw/60 hover:bg-ymw transition-colors duration-300'
                  >
                    <FontAwesomeIcon icon={faFlaskVial} className='w-[1em]' />
                    <span>เข้าร่วมกิจกรรม</span>
                  </a>
                </Link>
              </div>
            </div>
            <Link href={'/lab'}>
              <a className='absolute text-sm md:text-base left-3 font-IBMPlex font-semibold text-gray-600 hover:text-black transition-colors duration-300 -top-4 bg-purple-300/60 hover:bg-purple-300/80 rounded-full py-1 px-3'>
                {'< Back'}
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
