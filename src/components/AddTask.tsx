"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { toast, Toaster } from "sonner"; // For alert notification


const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [open, setOpen] = useState(false); // Controls dialog visibility
  const [alerts,setAlerts] = useState(false);


   // New states for storing task data for the alert popover
   const [alertTaskName, setAlertTaskName] = useState("");
   const [alertTaskDesc, setAlertTaskDesc] = useState("");
   const [alertDeadline, setAlertDeadline] = useState<Date | undefined>();

  // Handle Task Submission
  const handleSubmit = async () => {

    

    if (!taskName || !taskDesc || !deadline) {
      toast.error("Please fill all fields!");
      return;
    }
    const formattedDate = deadline.toISOString();

    const taskData = {
      name: taskName,
      description: taskDesc,
      deadline: formattedDate, 
      status:false
    };

    

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        // Store the task data for the alert popover
        setAlertTaskName(taskName);
        setAlertTaskDesc(taskDesc);
        setAlertDeadline(deadline);

        setTimeout(()=>setAlerts(true),1000);
        setTimeout(()=>setAlerts(false),6000);
        setTaskName("");
        setTaskDesc("");
        setDeadline(undefined);
        setOpen(false);
      } else {
        toast.error("Failed to add task!");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="md:w-[70%] w-full bg-slate-900 text-white">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-w-[350px] rounded-xl" onInteractOutside={(e) => e.preventDefault()} >
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Fill in the details and assign the task.
          </DialogDescription>
        </DialogHeader>

        {/* Task Name */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="taskName" className="text-right">
              Task Name
            </Label>
            <Input
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Task Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="taskDesc" className="text-right">
              Description
            </Label>
            <Textarea
              id="taskDesc"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Deadline Picker */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="col-span-3">
                  {deadline ? format(deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  captionLayout="dropdown" // Enables year and month selection
                  fromYear={2020}
                  toYear={2030}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Assign Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Toaster 
        position="top-center" 
        richColors 
        toastOptions={{
          style: {
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '16px',
          },
        }}
      />

        {/* Popup after task is successfully added */}
      {alerts && (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full bg-green-500 text-white">
                Task Added Successfully
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{alertTaskName}</h4>
                  <p className="text-sm text-muted-foreground">{alertTaskDesc}</p>
                  <p className="text-sm text-muted-foreground">{alertDeadline ? format(alertDeadline, "dd-MM-yyyy") : "No deadline"}</p> {/* Display formatted date */}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
};

export default AddTask;
