import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen } from 'lucide-react';



const UpdateProfilePhoto = () => {

    return (<Dialog>
        <DialogTrigger asChild>
          <button className='py-1 bg-slate-300 px-4 rounded-md font-bold'>Update</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Profile Image</DialogTitle>
            
          </DialogHeader>
          <div className="grid gap-4 py-4">
          
           
          </div>
         
        </DialogContent>
      </Dialog>)

  
}

export default UpdateProfilePhoto
