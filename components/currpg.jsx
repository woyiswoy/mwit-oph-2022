import { Fragment } from 'react'

export default function CurrParagraph({ c, children, ...props }) {
  return (
    <div className='flex flex-col gap-1'>
      <div
        className={
          'flex gap-1 font-IBMPlex font-semibold text-xl md:text-2xl' +
          (c.subtt ? ' self-center text-center text-bmw' : ' text-phd')
        }
      >
        <span>{c.title}</span>
      </div>
      <span
        className={
          'font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ' +
          (!c.noid && 'indent-8 ')
        }
      >
        {c.ct.split('<b>').map((c, i) =>
          i === 0 ? (
            c.split('<w>').map((w, wi) =>
              wi === 0 ? (
                w
              ) : (
                <Fragment key={wi}>
                  <span className='whitespace-nowrap'>
                    {w.split('</w>')[0]}
                  </span>
                  {w.split('</w>')[1]}
                </Fragment>
              ),
            )
          ) : (
            <Fragment key={i}>
              <b>{c.split('</b>')[0]}</b>
              {c
                .split('</b>')[1]
                .split('<w>')
                .map((w, wi) =>
                  wi === 0 ? (
                    w
                  ) : (
                    <Fragment key={wi}>
                      <span className='whitespace-nowrap'>
                        {w.split('</w>')[0]}
                      </span>
                      {w.split('</w>')[1]}
                    </Fragment>
                  ),
                )}
            </Fragment>
          ),
        )}
      </span>
      {c.table && (
        <table className='table-auto font-IBMPlexLoop text-xs md:text-sm w-fit self-center'>
          <thead className='border-b-2 border-b-gray-400'>
            <tr>
              {c.table[0].map((h, hi) => (
                <th key={hi} className='px-2'>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.table.map(
              (t, ti) =>
                ti > 0 && (
                  <tr
                    key={ti}
                    className='border-b border-gray-300 hover:bg-gray-200/80 transition-colors duration-200'
                  >
                    {t.map((ct, cti) => (
                      <td key={cti} className='p-1'>
                        {ct}
                      </td>
                    ))}
                  </tr>
                ),
            )}
          </tbody>
        </table>
      )}
      {c.list && (
        <ol
          className={
            (c.listdot ? 'list-disc' : 'list-decimal') +
            ' font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed list-inside space-y-1'
          }
        >
          {c.list.map((b, bi) => (
            <li key={bi}>{b}</li>
          ))}
        </ol>
      )}
    </div>
  )
}
