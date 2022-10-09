import Link from 'next/link'
import MetaHeader from '../../components/metaHeader'
import { currData } from '../../data/curr'

const meta = {
  title: 'MWIT Curriculum | MWIT Open House 2022',
  url: 'curriculum/',
  description:
    'หลักสูตร คำอธิบายรายวิชา และลักษณะการเรียนการสอนแต่ละสาขาของโรงเรียนมหิดลวิทยานุสรณ์ | MWIT Open House 2022',
  img: 'ogimage.png',
}

export default function Curriculum() {
  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-gray-300/30'>
        <div className='flex flex-col text-black items-center mx-auto justify-self-center w-full max-w-6xl px-6 pt-10 pb-2'>
          <span className='font-CS font-bold text-bmw text-3xl md:text-4xl lg:text-5xl'>
            MWIT Curriculum
          </span>
          <div className='px-3 py-1 mt-2 mb-4 font-IBMPlex text-center text-base md:text-lg text-bbk'>
            หลักสูตร คำอธิบายรายวิชา
            และลักษณะการเรียนการสอนแต่ละสาขาของโรงเรียนมหิดลวิทยานุสรณ์
          </div>
        </div>

        <div className='flex flex-wrap relative overflow-y-hidden max-w-6xl mx-auto px-6 justify-center gap-4 pb-10'>
          {currData.map((c, i) => (
            <Link href={'/curriculum/' + c.id} key={i}>
              <a className='rounded-xl bg-white hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg max-w-xs overflow-hidden'>
                <img
                  src={
                    process.env.CDN_URL + '/img/subject/' + c.cover + '.webp'
                  }
                  className='w-full'
                />
                <div className='px-3 py-2 flex flex-col gap-1'>
                  <span className='font-CS font-semibold text-xl text-bmw'>
                    {c.name}
                  </span>
                  {c.sub && (
                    <span className='font-IBMPlex font-semibold text-base text-bbk'>
                      {c.sub}
                    </span>
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
