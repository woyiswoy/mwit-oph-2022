import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import CurrParagraph from '../../components/currpg'
import MetaHeader from '../../components/metaHeader'
import { currData } from '../../data/curr'

export default function currBlog({ curr }) {
  const meta = {
    title: curr.name + ' - Curriculum | MWIT Open House 2022',
    url: 'curriculum/' + curr.id + '/',
    description:
      'หลักสูตร คำอธิบายรายวิชา และลักษณะการเรียนการสอนแต่ละสาขาของโรงเรียนมหิดลวิทยานุสรณ์ | MWIT Open House 2022',
    img: 'ogimage.png',
  }

  return (
    <>
      <MetaHeader meta={meta} />

      <main className='w-full bg-gray-300/30 pt-8 md:pt-12 px-4'>
        {/* <div className='flex flex-col text-black gap-6 items-center mx-auto justify-self-center w-full max-w-6xl px-8 pt-10 pb-4'>
          <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
            {currContent.name}
          </span>
        </div> */}
        <div className='flex flex-wrap relative rounded-t-3xl overflow-hidden max-w-4xl mx-auto pb-3'>
          <Link href={'/curriculum'}>
            <a className='flex items-center gap-1 left-3 top-3 bg-white opacity-60 hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm font-CS font-semibold text-base md:text-xl lg:text-2xl px-2 rounded-full'>
              <FontAwesomeIcon icon={faCaretLeft} />
              <span>Back</span>
            </a>
          </Link>
        </div>

        <div className='flex flex-wrap relative rounded-t-3xl shadow-xl overflow-hidden bg-white max-w-4xl mx-auto justify-center pb-6'>
          <div className='flex flex-col px-6 py-4 w-full gap-3'>
            <span className='font-CS font-bold text-3xl md:text-4xl text-bmw text-center self-center'>
              {curr.name}
            </span>
            {curr.vid && (
              <iframe
                type='text/html'
                className='w-full max-w-xl aspect-video rounded-xl self-center'
                src={curr.vid}
                frameBorder='0'
                allowFullScreen
              />
            )}
            {curr.content.map((c, ci) => (
              <CurrParagraph c={c} key={ci} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ params: { id } }) {
  const curr = currData.find((x) => x.id === id)
  return { props: { curr } }
}

export async function getStaticPaths() {
  const paths = currData.map((c) => {
    return { params: { id: c.id } } // Route is something like "this-is-my-post"
  })

  return {
    paths,
    fallback: false,
  }
}
