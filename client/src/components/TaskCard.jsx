import React from 'react'
import { useTask } from '../context/taskContext'
import { Link } from 'react-router'





function TaskCard({ task }) {

  const { deleteTask } = useTask()

  return (
    // tasks.map(task => (//el key es para que react sepa que elemento es el que se esta modificando
    //     //key es un atributo especial que se necesita para que react sepa qué elemento está cambiando
    <>
      <div className='w-full max-w-md p-15 rounded-xl bg-zinc-700'>

        <header className='flex justify-between'>
          <h1 className='text-2xl font-bold text-white'>{task.title}</h1>
          <div className='flex gap-x-2 items-center'>
            <button onClick={() => {
              // deleteTask(task._id)
              deleteTask(task._id)
            }
            }
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded my-2'>delete</button>
            <Link to= {`/tasks/${task._id}`} > <button className='bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-5 rounded'>edit</button>
            </Link>
          </div>
        </header>

        <p className='text-slate-300'>{task.description}</p>
        <p className='text-green-400'> {new Date(task.date).toLocaleDateString()} </p>
      </div>
    </>
  )
}

export default TaskCard