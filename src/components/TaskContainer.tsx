'use client'

import ContentTask from './ContentTask'


interface TaskProps {
    
      name: string;
      color: string; 
      task: Task[] | null;
      
}

  interface Task {
    _id: string;
    name: string;
    description: string;
    deadline: string; // Date is stored as a string in MongoDB
    status: boolean;
  }

const TaskContainer: React.FC<TaskProps> = ({name,color,task}) => {

  


   

  return (
    <>
        <div className=' max-w-[400px] h-[400px] md:w-[400px] md:h-[750px] bg-gray-200 rounded-xl overflow-y-auto shadow-xl'>
            <div className='flex mt-4 justify-center items-center gap-4'>
                <div className={`w-[15px] h-[15px] ${color} rounded-full`}></div>
                <h1 className='text-lg font-semibold'>{name}</h1>
                <div className='w-[23px] h-[23px] bg-gray-300 rounded-full flex justify-center font-semibold text-gray-700'>3</div>
            </div>
            <div className={`w-[80%] h-[5px] border-t-5 rounded-xl ${color} mt-4 mx-auto`}></div>
            <div className='mt-2 flex justify-center '>
              <div className='mt-2'>
              
              </div>
              <div className='flex flex-col'>
              {task!=null ?(
                task.map((taskData)=>(
                    <ContentTask key={taskData._id}
                    id={taskData._id}
                    name={taskData.name}
                    description={taskData.description}
                    deadline={taskData.deadline}
                    status={taskData.status}/>
                ))
              ):(
                <p className="text-gray-500 mt-4">No tasks available</p>
              )}
            </div>
            </div>
        </div>
        
    </>
  )
}

export default TaskContainer
