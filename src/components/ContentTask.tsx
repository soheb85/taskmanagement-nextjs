import React from 'react'
import {IconDots} from '@tabler/icons-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface TaskDataProps {
  id: string;
  name: string;
  description: string;
  deadline: string; // Date is stored as a string in MongoDB
  status: boolean;
}





const ContentTask: React.FC<TaskDataProps> = ({id, name, description, deadline, status }) => {

  const popover = true;

  const handleCompleted = async (id:string) =>{
    try{
      const response = await fetch("http://localhost:3000/api/tasks",
        {method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({id})
        }
      )

      if(!response.ok){
        throw new Error("Failed to update task status")
      }

      const updatedTask = await response.json();
      console.log(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const handleDelete = async (id:string)=>{
    try{
    const response = await fetch(
      "http://localhost:3000/api/tasks",
        {method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({id})
        }
    )

    if(!response.ok){
      throw new Error("Failed to update task status")
    }

    const updatedTask = await response.json();
    console.log(updatedTask);
  }catch (error) {
    console.error("Error updating task:", error);
  }
  }

  return (
    <div className="w-[325px] h-[180px] bg-white rounded-2xl mt-4 shadow-lg">
      <div className="flex justify-between pt-6 px-6">
        <div
          className={`min-w-[35px] h-[24px] rounded-sm text-sm text-center px-1 content-center 
          ${status ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-400"}`}
        >
          {status ? "Completed" : "Pending"}
        </div>
        <div>
          
        {popover && (
              <Popover>
              <PopoverTrigger asChild>
               <IconDots size={18}/>
              </PopoverTrigger>
              <PopoverContent className="w-36">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Button variant={'outline'} onClick={()=>handleCompleted(id)}>Complete</Button> 
                    <Button variant={'outline'} onClick={()=>handleDelete(id)}>Delete</Button>
               
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            )}
        </div>
      </div>
      <div className="pl-6 pt-1">
        <h1 className="text-xl font-semibold">{name}</h1>
      </div>
      <div className="pl-6">
        <p className="text-[13px] text-gray-500">{description}</p>
      </div>
      <div className="mt-6 pl-6">
        <h1 className="text-[13px] text-gray-600 font-semibold">
          <span className="font-bold">Deadline: </span>
          {new Date(deadline).toLocaleDateString()}
        </h1>
      </div>
    </div>
  );
};

export default ContentTask
