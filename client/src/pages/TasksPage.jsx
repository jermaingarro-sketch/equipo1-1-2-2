import React, { useEffect } from 'react'
import { useTask } from '../context/taskContext'
import { useAuth } from '../context/authContext'
import TaskCard from '../components/TaskCard'




export const TasksPage = () => {

  const {getTasks, tasks} = useTask()
  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length === 0) return <p>No tasks
  </p>

  return (
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {
          tasks.map((task)=>(
            <TaskCard task={task} key={task._id}/>
          )
        )}
      </div>
  )
}
