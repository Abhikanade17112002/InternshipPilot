import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AdminJobsTable from '../AdminJobsTable/AdminJobsTable';



function AdminJobs() {
   const navigate = useNavigate();
   const [ searchParam , setSearchParam ] = useState("") ;


    return (
        <div className='min-h-[100vh] px-4'>
            
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                    type="search"
                    value={searchParam}
                 
                        className="w-fit text-[8px] sm:text-sm"
                        placeholder="Filter by name"
                        onChange={(e) => setSearchParam(e.target.value)}
                    />
                    <Button className="w-fit text-[8px] sm:text-sm"  onClick={() => navigate("/admin/post/job")}>Post New Job</Button>
                </div>
                <div className="text-center font-bold py-4">Listed Jobs</div>
                <AdminJobsTable   searchParam={searchParam}  setSearchParam={setSearchParam}/>
            </div>
        </div>
    )
}

export default AdminJobs
