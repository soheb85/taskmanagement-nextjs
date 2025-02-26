import React from 'react'


interface TaskProps {
   
      name: string;
      icon: React.ElementType;
      color: string;
      count:number;
      total:number;
  }


const CountTask: React.FC<TaskProps>  = ({name,count,icon:Icon,color,total}) => {
  return (
    <>

    <div className='w-[360px] h-[60px] bg-gray-200 mt-4 rounded-sm shadow-xl md:hidden'>
        <div className='w-[100%] h-full  grid grid-cols-3 place-items-center'>
            <div className={`w-[35px] h-[35px] ${color} rounded-full flex items-center justify-center`}>
                <Icon/>
            </div>
            <div className='font-semibold text-[15px]'>
                <h1>{name}</h1>
            </div>
            <div className='font-bold text-[30px]'>
                <h1>{count}</h1>
            </div>
        </div>
    </div>

    <div className='w-[250px] h-[200px] bg-gray-200 md:block hidden rounded-xl mt-4 shadow-xl ' >
        <div className='w-[80%] h-[90%] mx-auto grid grid-rows-3 '>
            <div className={`w-[45px] h-[45px] ${color} rounded-full flex justify-center items-center mt-2`}> 
                <Icon size={30}/>
            </div>
            <div className='text-[25px] font-semibold'>
                <h2>{name}</h2>
            </div>
            <div className='font-semibold text-[35px]'>
                <h2>{count}/<span className='text-[27px]'>{total}</span> </h2>
                </div>
        </div>
    </div>
    
    </>
  )
}

export default CountTask
