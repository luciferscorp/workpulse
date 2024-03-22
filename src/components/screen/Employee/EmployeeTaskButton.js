import React, { useState ,useEffect } from 'react'
import AdminTaskPagination from '../../common/AdminTaskPagination'
import Button from '../../common/Button'
import Pagination from '../../common/Pagination'


function EmployeeTask() {
const [showTaskPagination, setshowTaskPagination] = useState(false)
const [hidePagination, sethidePagination] = useState(true)
const [count, setcount] = useState(0);


const newdata = showTaskPagination ? "back" : "Task" ;


function Handle()
{
  if(count>1)
  {
    setshowTaskPagination(false);
          sethidePagination(true);
  }
  if(count>1)
  {
    setcount(0);
  }
}

useEffect(() => {
  Handle();
}, [count])


  return (
    <>
    <div>
        <Button type="button" Title={newdata}  classfield={"blue-task-button"}  onClick={() => { 
          setshowTaskPagination(true);
          sethidePagination(false);
          setcount(count+1); 
        }
          }  />
      </div>

      {showTaskPagination &&   (<AdminTaskPagination />)}
    {hidePagination && (<Pagination/>)}
    </>
  )
}

export default EmployeeTask