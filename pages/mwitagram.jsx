import { useEffect, useState } from 'react'
import Navbaragram from '../components/navtagram'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { postList } from '../data/postlist'
import Postagram from '../components/postagram'
import MetaHeader from '../components/metaHeader'

export default function MWITagram() {
  const [search, setSearch] = useState('')

  const [likes, setLikes] = useState([])
  const router = useRouter()
  const { tag, user, id } = router.query

  useEffect(
    () =>
      localStorage.getItem('likes') === null
        ? setLikes([])
        : setLikes(JSON.parse(localStorage.getItem('likes'))),
    [],
  )

  const toggleLike = (id) => {
    likes.includes(id) ? removeLike(id) : addLike(id)
  }

  const removeLike = (id) => {
    localStorage.setItem('likes', JSON.stringify(likes.filter((x) => x !== id)))
    setLikes(likes.filter((x) => x !== id))
  }

  const addLike = (id) => {
    localStorage.setItem('likes', JSON.stringify(likes.concat([id])))
    setLikes(likes.concat([id]))
  }

  useEffect(() => setSearch(localStorage.getItem('search') || ''), [])

  const meta = {
    title: 'MWITagram | MWIT Open House 2022',
    url: 'mwitagram',
    description:
      'MWITagram แกลเลอรีผลงานภาพถ่ายบรรยากาศในบริเวณโรงเรียนมหิดลวิทยานุสรณ์ ทั้งบรรยากาศสถานที่ต่าง ๆ ในโรงเรียน และภาพกิจกรรมที่จัดขึ้น | MWIT Open House 2022',
    img: 'ogimage.png',
  }

  return (
    <>
      <MetaHeader meta={meta} />

      <Navbaragram search={search} setSearch={(s) => setSearch(s)} />
      <div className='space-y-2 pt-[3.3rem] pb-3'>
        <div className=' max-w-lg mx-auto space-y-2 p-2'>
          {user && (
            <div className='text-sm space-x-2'>
              <span className='text-gray-400 italic'>From: {user}</span>
              <Link href={'/mwitagram' + (tag ? '?tag=' + tag : '')}>
                <a className='text-gray-500 underline'>remove</a>
              </Link>
            </div>
          )}
          {tag && (
            <div className='text-sm space-x-2'>
              <span className='text-gray-400 italic'>Tag: {tag}</span>
              <Link href={'/mwitagram' + (user ? '?user=' + user : '')}>
                <a className='text-gray-500 underline'>remove</a>
              </Link>
            </div>
          )}
          {search && (
            <div className='text-sm space-x-2'>
              <span className='text-gray-400 italic'>
                {'Searching for "' + search + '"'}
              </span>
              <a
                onClick={() => setSearch('')}
                className='text-gray-500 underline cursor-pointer'
              >
                remove
              </a>
            </div>
          )}
          {id && (
            <div className='text-sm space-x-2'>
              <a
                onClick={() => router.push('/mwitagram')}
                className='text-gray-500 underline cursor-pointer'
              >
                {'< View all'}
              </a>
            </div>
          )}
          {postList
            .filter(
              (p) =>
                (search
                  ? (p.user + p.cap + p.tag.join())
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  : true) &&
                (tag ? p.tag.includes(tag) : true) &&
                (user ? p.user === user : true) &&
                (id ? p.id === id : true),
            )
            .map((p, idx) => (
              <Postagram
                p={p}
                key={idx}
                likes={likes}
                toggleLike={toggleLike}
                router={router}
              />
            ))}
        </div>
      </div>
    </>
  )
}
