import { NextResponse } from "next/server";
import { connectDB } from "@/lib/moongose";
import Tasks from "@/models/TaskSchema";


export async function POST(req: Request) {
    try {
      await connectDB();
      const body = await req.json();
  
      
  
      const { name, description, deadline, status } = body;
  
      //Convert deadline to Date format before saving
      const parsedDeadline = deadline ? new Date(deadline) : null;
  
      const newTask = new Tasks({
        name,
        description,
        deadline: parsedDeadline, // Ensure deadline is set
        status: status ?? false,
      });
  

  
      await newTask.save();
  
      return NextResponse.json({ message: "Task Added", task: newTask }, { status: 200 });
    } catch (error) {
      console.error("Error saving task:", error);
      return NextResponse.json({ message: "Error adding Task", error }, { status: 500 });
    }
  }

  export async function GET() {
    try {
      await connectDB(); // Ensure DB connection
      const tasks = await Tasks.find(); // Fetch all tasks
  
      return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json(
        { message: "Error fetching tasks", error },
        { status: 500 }
      );
    }
  }

  export async function PUT(req:Request){
    try{
      await connectDB();
      
      const {id} = await req.json();

      const updatedTask = await Tasks.findByIdAndUpdate(
        id,{status:true}
      )

      if(!updatedTask){
        return NextResponse.json({message:"Task Not Found"},{status:404})
      }

      return NextResponse.json(updatedTask,{status:200})

    }catch (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json(
        { message: "Error fetching tasks", error },
        { status: 500 }
      );
    }
  }

  export async function DELETE(req:Request) {
    try{
      await connectDB();
      const {id} = await req.json();

      const deletedTask = await Tasks.findByIdAndDelete(id) ;

      if(!deletedTask){
        return NextResponse.json({message:"Task Not Found"},{status:404})
      }

      return NextResponse.json(deletedTask,{status:200})

    }catch (error) {
      console.error("Error Deleting tasks:", error);
      return NextResponse.json(
        { message: "Error Deleting tasks", error },
        { status: 500 }
      );
    }
  }