'use client'
import AddTask from "@/components/AddTask";
import CountTask from "@/components/CountTask";
import Navbar from "@/components/Navbar";
import TaskContainer from "@/components/TaskContainer";
import React, { useCallback } from "react";
import {
  IconAlertTriangle,
  IconClockHour3,
  IconBriefcase,
} from "@tabler/icons-react";
import { useEffect } from "react";

interface Task {
  _id: string;
  name: string;
  description: string;
  deadline: string; // Date is stored as a string in MongoDB
  status: boolean;
}

export default function Home() {

  const [taskData,setTaskData] = React.useState<Task[]>([])
  const [expiredCount, setExpiredCount] = React.useState(0);
  const [todoTasks, setTodoTasks] = React.useState<Task[] | null>([]);
  const [onProgressTasks, setOnProgressTasks] = React.useState<Task[] | null>([]);
  const [doneTasks, setDoneTasks] = React.useState<Task[] | null>([]);
  const [activeTask,setActiveTask] = React.useState(0);
  const [completed,setCompleted] = React.useState(0);
  const [totalTask,setTotalTask] = React.useState(0);
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await fetch("/api/tasks");
          const data = await response.json();
  
          console.log("Fetched Tasks:", data); // Debugging: Check if data is correct

  
          if (Array.isArray(data.tasks)) {
            setTaskData(data.tasks);
          } else {
            console.error("Unexpected data format:", data);
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
  
      fetchTasks();
      
    }, []);

     // Function to count expired tasks
  

    const countExpiredTasks = useCallback(() => {
      const today = new Date;
      console.log(today);
      let expiredTaskCount = 0;
      let activeTaskCount = 0;
      let completeTaskCount=0;
    

      
     taskData.forEach((task)=>{

      if(!task.status){
        activeTaskCount++;
      }else{
        completeTaskCount++;
      }

      if(!task.deadline) return;

      const taskDeadline = new Date(task.deadline); // Month is zero-based
      console.log(`Task: ${task.name}, Deadline: ${taskDeadline.toDateString()}`);

      if (taskDeadline < today) {
        expiredTaskCount++;
      }




     })

     let todoTaskFilter = null;
     let completedFilter = null;
     let progressFilter = null;
     if(taskData.length>0){
      todoTaskFilter = taskData.filter((task)=> !task.status)
      completedFilter = taskData.filter((task)=> task.status)
      
      progressFilter = taskData.filter((task)=>{

        if(!task.status){
        const currentDate = new Date();
        const taskDeadline = new Date(task.deadline);
        const getDifference = taskDeadline.getTime() - currentDate.getTime()
        return getDifference <= 24 * 60 * 60 * 1000 && getDifference > 0;
        }
        
      })
     }

    

   

     

     setExpiredCount(expiredTaskCount);
     setActiveTask(activeTaskCount);
     setCompleted(completeTaskCount);
     setTodoTasks(todoTaskFilter);
     setDoneTasks(completedFilter);
     setOnProgressTasks(progressFilter);
     setTotalTask(taskData.length);
    
    },[taskData])

    useEffect(() => {
      if (taskData.length > 0) {
        countExpiredTasks();
      }
    },[taskData,countExpiredTasks]); // Runs when `taskData` is updated
    

    

  const tasks = [
    {
      name: "Expired Tasks",
      icon: IconAlertTriangle,
      color: "bg-red-500",
      
    },
    {
      name: "All Active Tasks",
      icon: IconClockHour3,
      color: "bg-yellow-500",
      
    },
    {
      name: "Completed Tasks",
      icon: IconBriefcase,
      color: "bg-green-500",
      
    },
  ];

  const header = [
    {
      name:"To Do",
      color:"bg-blue-600"
    },
    {
      name:"On Progress",
      color:"bg-orange-600"
    },
    {
      name:"Done",
      color:"bg-green-600"
    },
    
  ]


  return (
    <>
       <Navbar />

{/* Main Layout - 4 Columns */}
<div className="container mx-auto px-4 py-6">
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    
    {/* Left Column: CountTask + AddTask */}
    <div className="flex flex-col gap-1 md:gap-4">
      
        <CountTask  name={tasks[0].name} color={tasks[0].color} icon={tasks[0].icon} count={expiredCount} total={totalTask} />
        <CountTask  name={tasks[1].name} color={tasks[1].color} icon={tasks[0].icon} count={activeTask} total={totalTask}  />
        <CountTask  name={tasks[2].name} color={tasks[2].color} icon={tasks[0].icon} count={completed} total={totalTask} />
      
      <div className="mt-4 ml-8 md:ml-0">
        <AddTask />
      </div>
    </div>

    {/* Right 3 Columns: TaskContainers */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-3 md:gap-40 gap-10">
      <TaskContainer name={header[0].name} color={header[0].color} task={todoTasks} />
      <TaskContainer name={header[1].name} color={header[1].color} task={onProgressTasks}/>
      <TaskContainer name={header[2].name} color={header[2].color} task={doneTasks}/>
    </div>

  </div>
</div>
    </>
  );
}
