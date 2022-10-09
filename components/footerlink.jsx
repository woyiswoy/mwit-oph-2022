import Link from 'next/link'

export default function FooterLink({ footerLink, children, ...props }) {
  return (
    <div {...props}>
      {footerLink.map(
        (f, i) =>
          f.nt ? (
            <Link href={f.href} key={i}>
              <a
                className='hover:scale-105 hover:text-gray-200 transition-all duration-200 whitespace-nowrap'
                target='_blank'
                rel='noopener noreferrer'
              >
                {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                {f.name}
              </a>
            </Link>
          ) : (
            <Link href={f.href} key={i}>
              <a className='hover:scale-105 hover:text-gray-200 transition-all duration-200 whitespace-nowrap'>
                {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                {f.name}
              </a>
            </Link>
          ),
        // <div className='text-white' key={i}>
        //   {f.name}
        // </div>
      )}
    </div>
  )
}
