import Head from 'next/head'

export default function MetaHeader({ meta, ...props }) {
  return (
    <Head>
      {/* <!-- HTML Meta Tags --> */}
      <title>{meta.title}</title>
      <meta name='description' content={meta.description} />

      {/* <!-- Facebook Meta Tags --> */}
      <meta
        property='og:url'
        content={'https://openhouse.mwit.ac.th/' + meta.url}
      />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={meta.title} />
      <meta property='og:description' content={meta.description} />
      <meta
        property='og:image'
        content={'https://mwitophcdn.woyiswoy.com/img/' + meta.img}
      />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta property='twitter:domain' content='openhouse.mwit.ac.th' />
      <meta property='twitter:url' content={meta.url} />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta
        name='twitter:image'
        content={'https://mwitophcdn.woyiswoy.com/img/' + meta.img}
      />
    </Head>
  )
}
