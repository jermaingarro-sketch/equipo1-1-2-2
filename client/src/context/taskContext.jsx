import { createContext, useContext, useState, } from 'react'
import { createTaskRequest, deleteTaskRequest, getTasksRequest, updateTaskRequest, getTaskRequest } from '../api/tasks';
import { useAuth } from './authContext';
const TaskContext = createContext();

//boilerplate code esto significa que es un codigo que se repite mucho
// y que se puede reutilizar
export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider')
    }
    return context;
}


export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    // const { isAuthenticated, user } = useAuth();
const [errors, setErrors] = useState([]); // ¡Añade esto!
  

// const getTasks = async () => {
    //     try {
    //         const res = await getTasksRequest();
    //         setTasks(res.data)
    //         console.log(res.data)
    //     } catch (error) {
    //         console.error(error.response.data)
    //     }
    // }

     const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data || res);
    } catch (error) {
      setErrors([error.response?.data?.message || "Error al cargar tareas"]); // Ahora setErrors existe
    }
  };

    // const createTask = async (task) => {
    //     try {
    //         const res = await createTaskRequest(task);
    //         setTasks([...tasks, res.data]) //
    //         console.log(res.data)
    //     } catch (error) {
    //         console.error(error.response.data)
    //     }
    // }

    const createTask = async (task) => {
  try {
    // Validación básica en el frontend
    if (!task.title || !task.title.trim()) {
      throw new Error("El título de la tarea no puede estar vacío");
    }

    const res = await createTaskRequest(task); // Llama a tu API
    
    // Asegúrate de que la respuesta tenga datos
    if (!res || !res.data) {
      throw new Error("La respuesta del servidor no contiene datos");
    }

    setTasks([...tasks, res.data]); // Actualiza el estado
    return { success: true, task: res.data }; // Éxito

  } catch (error) {
    console.error("Error al crear la tarea:", error.message);
    
    // Manejo de errores para el usuario
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        "Error al guardar la tarea";
    
    return { success: false, error: errorMessage }; // Falla
  }
};

    // useEffect(() => {
    //     if (isAuthenticated) {
    //       getTasks();
    //     } else {
    //       setTasks([]);
    //     }
    //   }, [isAuthenticated, user]);

    const deleteTask = async (id) => {
        // const res = await deleteTaskRequest(id)
        // console.log(res);
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 200) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
        return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task)
        } catch (error) {
            console.error(error)
        }
    }

    const clearTasks = () => {
        setTasks([]); // Limpia el estado de las tareas
    };



    return (
        <TaskContext.Provider value={
            {
                tasks,
                createTask,
                getTasks,
                deleteTask,
                clearTasks,
                getTask,
                updateTask, errors
            }
        }>
            {children}
        </TaskContext.Provider>
    )
}
