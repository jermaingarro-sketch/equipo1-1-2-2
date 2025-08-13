import { useForm } from "react-hook-form"
import { useTask } from "../context/taskContext"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"

export const TaskFormPage = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const { createTask, getTask, updateTask } = useTask()
  const navigate = useNavigate()
  const params = useParams()
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        try {
          const task = await getTask(params.id)
          setValue("title", task.title)
          setValue("description", task.description)
        } catch (error) {
          console.error("Error loading task:", error)
        }
      }
    }
    loadTask()
  }, [params.id])

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     if (!data.title.trim()) {
  //       setFormError("El título es requerido")
  //       return
  //     }

  //     if (params.id) {
  //       await updateTask(params.id, data)
  //     } else {
  //       await createTask(data)
  //     }
  //     navigate("/tasks")
  //   } catch (error) {
  //     console.error("Error submitting form:", error)
  //     setFormError(error.message || "Ocurrió un error al guardar la tarea")
  //   }
  // })

  const onSubmit = handleSubmit(async (data) => {
  try {
    // Validación mínima del frontend
    if (!data.description.trim()) {
      setFormError("La descripción es obligatoria");
      return;
    }

    const result = params.id 
      ? await updateTask(params.id, data)
      : await createTask(data);

    if (result.success) {
      navigate("/tasks");
    } else {
      setFormError(result.error);
    }
  } catch (error) {
    setFormError(error.message);
  }
});

  return (
    <div className='flex h-[calc(100vh-50px)] items-center justify-center bg-zinc-900'>
      <div className='flex bg-zinc-700 max-w-md w-full p-10 items-center justify-center text-center'>
        <form onSubmit={onSubmit}>
          <h1 className="text-white font-extrabold from-neutral-700 p-4 m-2">TAREAS</h1>
          
          {formError && (
            <p className="bg-red-500 text-white p-2 mb-3 rounded">{formError}</p>
          )}

          <input 
            type="text" 
            placeholder="title"
            {...register("title", { required: true })}
            className="w-full bg-zinc-500 text-white px-6 py-2 my-3 rounded-md"
            autoFocus 
          />
          {errors.title && <p className="text-red-500">El título es requerido</p>}

          <textarea 
            placeholder="description"
            {...register("description")}
            className="w-full bg-zinc-500 text-white px-6 py-2 my-3 rounded-md"
          ></textarea>

          <button className='bg-green-500 text-white px-6 py-2 my-3 rounded-md justify-center'>
            {params.id ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  )
}


// import { get, useForm } from "react-hook-form"
// import { useTask, } from "../context/taskContext"
// import { useNavigate, useParams } from "react-router"
// import { use, useEffect } from "react"


// export const TaskFormPage = () => {
//   const { register, handleSubmit, setValue } = useForm()
//   const { createTask, getTask, updateTask } = useTask()
//   const navigate = useNavigate()
//   const params = useParams()


//   useEffect(() => {
//    async function loadtask() {
//       if (params.id) {
//         const task = await getTask(params.id)
//         console.log(params)
//         setValue("title", task.title)
//         setValue("description", task.description)
//       }
//     }
//     loadtask()
//   }, []);


//   const onSubmit = handleSubmit((data) => {
//     if (params.id) {
//       updateTask(params.id, data)
//     }
//     else {
//       createTask(data)
//     }
//     navigate("/tasks")
//   })
//   return (
//     <div className='flex h-[calc(100vh-50px)] items-center justify-center bg-zinc-900'>
//       <div className='flex bg-zinc-700 max-w-md w-full p-10 items-center justify-center text-center'>

//         <form onSubmit={onSubmit}> <h1 className=" text-white font-extrabold from-neutral-700 p-4 m-2  ">TAREAS</h1>
//           <input type="text" placeholder="title"
//             {...register("title")}
//             className="w-full bg-zinc-500 text-white px-6 py-2 my-3 rounded-md"
//             autoFocus />

//           <textarea name="" id="" placeholder="description"
//             {...register("description")}
//             className="w-full bg-zinc-500 text-white px-6 py-2 my-3 rounded-md" ></textarea>

//           <button className=' bg-green-500 text-white px-6 py-2 my-3 rounded-md justify-center '>save</button>
//         </form>
//       </div>
//     </div>
//   )
// }
