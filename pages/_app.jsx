import Navbar from '../components/navbar'
import LandingPage from '../components/landing'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const isHome = router.pathname === '/'
  const homeRef = useRef()

  const useEffectOnce = (effect) => {
    const destroyFunc = useRef()
    const effectCalled = useRef(false)
    const renderAfterCalled = useRef(false)
    const [val, setVal] = useState(0)

    if (effectCalled.current) {
      renderAfterCalled.current = true
    }

    useEffect(() => {
      // only execute the effect first time around
      if (!effectCalled.current) {
        destroyFunc.current = effect()
        effectCalled.current = true
      }

      // this forces one render after the effect is run
      setVal((val) => val + 1)

      return () => {
        // if the comp didn't render since the useEffect was called,
        // we know it's the dummy React cycle
        if (!renderAfterCalled.current) {
          return
        }
        if (destroyFunc.current) {
          destroyFunc.current()
        }
      }
    }, [])
  }

  useEffectOnce(() => {
    fetch(process.env.API_URL + '/api/refresh/', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    !isHome && sessionStorage.setItem('loadhome', true)
    if (isHome && sessionStorage.getItem('loadhome')) {
      homeRef.current?.scrollIntoView()
    }
    router.pathname === '/club/[id]'
      ? sessionStorage.setItem('loadclub', true)
      : router.pathname !== '/club' && sessionStorage.setItem('loadclub', false)
  }, [router.pathname])

  useEffect(() => {
    if (!userData) {
      return
    }
    if (!userData.ok && ['/booking/'].includes(router.asPath)) {
      router.push({
        pathname: '/login',
        query: { to: router.asPath },
      })
    }
  }, [router.asPath, userData])

  // useEffect(() => {
  //   router.push('https://openhouse.mwit.ac.th')
  // }, [])

  return (
    <div className=''>
      <div className='fixed -z-10 bg-[url("https://mwitophcdn.woyiswoy.com/img/wbg.png")] bg-no-repeat w-full h-screen' />
      {isHome && <LandingPage homeRef={homeRef} />}
      <Navbar
        userData={userData}
        addClass={isHome && 'w-full absolute top-[100%]'}
        homeRef={isHome ? homeRef : null}
      >
        <Component userData={userData} setData={setUserData} {...pageProps} />
      </Navbar>
    </div>
  )
}

export default MyApp
