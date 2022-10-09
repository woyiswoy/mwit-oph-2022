import Link from 'next/link'
import MetaHeader from '../../components/metaHeader'

const meta = {
  title: 'โครงการวาดภาพและถ่ายภาพทางชีววิทยา | MWIT Open House 2022',
  url: 'biovote/draw',
  description:
    'โครงการวาดภาพและถ่ายภาพทางชีววิทยาของนักเรียนโรงเรียนมหิดลวิทยานุสรณ์ สามารถโหวตผลงานได้ถึง 11 กันยายนนี้ | MWIT Open House 2022',
  img: 'ogimage.png',
}

export default function BioVote() {
  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-yrg/60'>
        <div className='flex flex-col text-black gap-6 items-center mx-auto justify-self-center w-full max-w-6xl px-8 pt-10 pb-4'>
          <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl text-center'>
            โครงการวาดภาพและถ่ายภาพทางชีววิทยา
          </span>
        </div>
        <div className='flex flex-wrap justify-center gap-4 pb-10'>
          {[
            { name: 'โหวตผลงานภาพวาด', href: '/biovote/draw' },
            { name: 'โหวตผลงานภาพถ่าย', href: '/biovote/photo' },
          ].map((b, bi) => (
            <Link key={bi} href={b.href}>
              <a className='px-6 py-6 bg-white/50 hover:bg-white backdrop-blur-sm rounded-xl hover:scale-105 transition-all duration-300 font-IBMPlex font-semibold text-xl md:text-2xl'>
                {b.name}
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
