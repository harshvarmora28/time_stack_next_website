import React from 'react'

const Timer = () => {
  const options = ["Pomodoro", "Short Break", "Long Break"]

  return (
    <div className="w-10/12 mx-auto pt-5 mt-10 text-white flex flex-col justify-center items-center">
        <div className='flex gap-5 items-center'>
            {options.map((options, index) => {
                return <h1 key={index}
                    className={`${index === 0 ? "bg-gray-500 bg-opacity-30" : ""} p-1 cursor-pointer transition-all rounded`}
                >{options}</h1>
            })}
        </div>

        {/* Timer */}
        <div className='mt-10 mb-10'>
            <h1 className='text-8xl font-bold select-none m-0'>20:00</h1>
        </div>
        
        <button className='px-16 py-2 text-2xl rounded-md bg-white text-blue-500 uppercase font-bold'>
            Start
        </button>
    </div>
  )
}

export default Timer