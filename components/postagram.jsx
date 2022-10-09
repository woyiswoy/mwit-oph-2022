import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect, Fragment } from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
} from 'next-share'

export default function Postagram({
  p,
  likes,
  toggleLike,
  router,
  children,
  ...props
}) {
  const [share, setShare] = useState(false)
  const [copied, setCopied] = useState(false)
  const shareUrl = 'https://openhouse.mwit.ac.th/mwitagram' + '/?id=' + p.id
  return (
    <div
      className=' rounded-lg border border-gray-300 bg-white font-IBMPlexLoop'
      {...props}
    >
      <div className=' px-3 py-2 grid grid-flow-col auto-cols-max gap-2'>
        <img
          className=' rounded-full w-7 md:w-9 cursor-pointer'
          src='https://www.gravatar.com/avatar/95e1985f09ba7581f0f73b1dbb05938f?d=mp'
          onClick={() => {
            delete router.query.id
            router.push({
              query: {
                ...router.query,
                user: p.user,
              },
            })
          }}
        ></img>
        <div className='grid grid-rows-2'>
          <span
            className='text-xs md:text-sm font-bold cursor-pointer font-IBMPlex'
            onClick={() => {
              delete router.query.id
              router.push({
                query: {
                  ...router.query,
                  user: p.user,
                },
              })
            }}
          >
            {p.user}
          </span>
          <span className='text-[0.65rem] md:text-xs'>
            Mahidol Wittayanusorn School
          </span>
        </div>
      </div>
      <img
        className=' w-full'
        src={process.env.CDN_URL + '/img/mwitagram/' + p.id + '.webp'}
      ></img>
      <div className='px-3 py-2 space-y-1 md:space-y-2'>
        <div className='grid grid-cols-1'>
          <div className='grid grid-flow-col auto-cols-max space-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={
                'h-6 md:h-7 transition-all duration-200 hover:stroke-red-500 hover:scale-110 ' +
                (likes && likes.includes(p.id) && 'fill-red-500 stroke-red-500')
              }
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              onClick={() => toggleLike(p.id)}
              strokeWidth={1.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              />
            </svg> */}
            <div
              className='hover:visible flex space-x-1'
              onMouseOver={() => setShare(true)}
              onMouseOut={() => {
                setShare(false)
                setCopied(false)
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 md:h-7 transition-all duration-200 hover:stroke-blue-500 hover:scale-110'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                />
              </svg>
              {share && (
                <div className='pl-2 flex space-x-1'>
                  <div
                    className={
                      'h-6 px-1 rounded-full grid grid-cols-1 justify-items-center content-center hover:cursor-pointer ' +
                      (copied ? 'bg-green-400' : 'bg-gray-400')
                    }
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl).then(
                        () => setCopied(true),
                        (err) => console.log(err),
                      )
                    }}
                  >
                    {copied ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 fill-white'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 fill-white'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z'
                          clipRule='evenodd'
                        />
                      </svg>
                    )}
                  </div>
                  <FacebookShareButton
                    url={shareUrl}
                    hashtag={'#MWITOpenHouse2022'}
                  >
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <LineShareButton url={shareUrl} title={''}>
                    <LineIcon size={24} round />
                  </LineShareButton>
                  <FacebookMessengerShareButton url={shareUrl} appId={''}>
                    <FacebookMessengerIcon size={24} round />
                  </FacebookMessengerShareButton>
                  <EmailShareButton url={shareUrl} subject={''} body=''>
                    <EmailIcon size={24} round />
                  </EmailShareButton>
                </div>
              )}
            </div>
          </div>
          {/* <div className=' justify-self-end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                    />
                  </svg>
                </div> */}
        </div>
        <div className='text-xs md:text-sm space-x-1'>
          <span
            onClick={() => {
              delete router.query.id
              router.push({
                pathname: '/mwitagram',
                query: {
                  ...router.query,
                  user: p.user,
                },
              })
            }}
            className='font-bold cursor-pointer font-IBMPlex'
          >
            {p.user}
          </span>
          <span className=''>
            {p.cap.split('\n').map((t, ti) =>
              ti === 0 ? (
                t
              ) : (
                <Fragment key={ti}>
                  <br />
                  {t}
                </Fragment>
              ),
            )}
          </span>
          {p.tag.map(
            (t, tidx) =>
              t !== '' && (
                <a
                  onClick={() => {
                    // delete router.query.id
                    router.push({
                      pathname: '/mwitagram',
                      query: {
                        ...router.query,
                        tag: t,
                      },
                    })
                  }}
                  key={tidx}
                  className=' text-blue-600 cursor-pointer'
                >
                  {t}
                </a>
              ),
          )}
        </div>
      </div>
    </div>
  )
}
