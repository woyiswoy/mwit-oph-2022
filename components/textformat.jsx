import { motion } from 'framer-motion'
import { Fragment } from 'react'

export default function TextFormat({ content, children, ...props }) {
  return (
    <motion.span {...props}>
      {content.split('<i>').map((c, i) =>
        i === 0 ? (
          c.split('<w>').map((w, wi) =>
            wi === 0 ? (
              w
            ) : (
              <Fragment key={wi}>
                <span className='whitespace-nowrap'>{w.split('</w>')[0]}</span>
                {w.split('</w>')[1]}
              </Fragment>
            ),
          )
        ) : (
          <Fragment key={i}>
            <i>{c.split('</i>')[0]}</i>
            {c
              .split('</i>')[1]
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
    </motion.span>
  )
}
