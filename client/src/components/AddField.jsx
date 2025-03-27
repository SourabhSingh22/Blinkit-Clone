import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddField = ({close, value, onChange, submit}) => {
  return (
    <section className='fixed right-0 left-0 bottom-0 top-0 bg-neutral-900 bg-opacity-70 z-50 flex items-center justify-center p-4'>
        <div className='bg-white rounded p-4 max-w-md w-full'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Field</h1>
                <button className='hover:text-red-600' onClick={close}>
                    <IoClose size={25}/>
                </button>
            </div>
            <input
                className='bg-blue-50 p-2 border outline-none my-3 focus-within:border-yellow-400 rounded w-full'
                placeholder='Add field name'
                value={value}
                onChange={onChange}
              />
              <button
               onClick={submit}
               className='border bg-yellow-400 hover:bg-yellow-300 px-4 py-1 rounded mx-auto w-fit block'>Add Filed</button>
        </div>
    </section>
  )
}

export default AddField