'use client'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {IconSearch} from '@tabler/icons-react'
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import React from "react"

  type Checked = DropdownMenuCheckboxItemProps["checked"]

const Navbar = () => {

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(false)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)
  return (
    <>
    <div className="w-[95%] bg-gray-200 h-[65px] mx-auto mt-5 rounded-xl shadow-lg content-center">
        <div className="w-full flex justify-between md:px-16">
            
            <div className="flex w-full max-w-sm items-center px-2">
                <IconSearch className="text-gray-600 relative left-8" size={22}/>
                <Input type="search" placeholder="Search..." className=" bg-white placeholder:font-bold pl-10"/>
            </div>
            
            <div className="pr-2">
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          To Do
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          On Progress
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Done
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar
