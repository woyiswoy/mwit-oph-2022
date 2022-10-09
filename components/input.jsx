import { Fragment } from 'react'

export default function BeautifulInput({
  d,
  register,
  errors,
  ud,
  children,
  ...props
}) {
  return (
    <Fragment {...props}>
      <div
        className={'col-span-' + d.span + ' flex flex-col justify-end gap-1'}
      >
        <label className='group relative text-base md:text-lg'>
          {ud && ['text', 'email', 'password'].includes(d.type) && (
            <input
              {...register(d.id)}
              id={d.id}
              type={d.type}
              required={d.req}
              defaultValue={d.disable ? undefined : ud[d.id]}
              value={d.disable ? ud[d.id] : undefined}
              className={
                'peer w-full h-[1.8em] bg-transparent rounded-none outline-none border-b-2 border-gray-300 transition-all duration-300' +
                (d.disable
                  ? ' text-gray-400'
                  : ' group-focus-within:border-black')
              }
              //   disabled={d.disable}
            ></input>
          )}
          {ud && d.type === 'dd' && (
            <select
              {...register(d.id)}
              id={d.id}
              type={d.type}
              defaultValue={ud[d.id] || 'กรุณาเลือก'}
              className='peer w-full bg-transparent outline-none border-b-2 border-gray-300 group-focus-within:border-black transition-all duration-300'
            >
              <option value={'กรุณาเลือก'} disabled>
                กรุณาเลือก
              </option>
              {d.data.map((o, idx) => (
                <option key={idx} value={o}>
                  {o}
                </option>
              ))}
            </select>
          )}
          <label
            htmlFor={d.id}
            className={
              (['text', 'email', 'password'].includes(d.type)
                ? 'cursor-text '
                : '') +
              (d.req &&
                'after:content-["*"] after:ml-0.5 after:text-red-400 ') +
              (d.disable ? 'text-sm bottom-full ' : '') +
              'absolute left-0 bottom-0 group-focus-within:bottom-full peer-valid:bottom-full text-gray-400 group-focus-within:text-sm peer-valid:text-sm group-focus-within:text-black transition-all duration-300'
            }
          >
            {d.name}
          </label>
        </label>
        <p className='text-red-500 text-xs md:text-sm'>
          {errors[d.id]?.message}
        </p>
      </div>
      {d.space - d.span > 0 && <div />}
    </Fragment>
  )
}
