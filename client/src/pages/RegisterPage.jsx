
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router'
// import {registerRequest} from '../api/auth'


function RegisterPage() {
    const { register, handleSubmit, formState: {
        errors
    } } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();


    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (data) => { //esto es lo que se va a ejecutar cuando se haga el submit
        signup(data)
    });


    return (
        <div className='h-screen bg-blue-900 flex items-center justify-center'>
            <div className='items-center justify-center bg-zinc-800 max-w-md p-10 rounded-md' >

                {
                    RegisterErrors.map((error, i) => (
                        <div className='bg-red-700 p-2 my-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }

                <form className=' ' onSubmit={onSubmit}>
                    <input type="text" {...register("username", { required: true })}
                        className="w-full bg-zinc-500 text-white px-6 py-2 rounded-md"
                        placeholder='username' />

                    {
                        errors.username && (
                            <p className='text-red-500'>
                                username is required
                            </p>
                        )
                    }

                    <input type="email" {...register("email", { required: true })}
                        className="w-full bg-zinc-500 text-white px-6 py-2 my-3 rounded-md"
                        placeholder='ej: testigo23@gmail.com' />

                    {
                        errors.email && (
                            <p className='text-red-500'>
                                email is required
                            </p>
                        )
                    }

                    <input type="password" {...register("password", { required: true })}
                        className='w-full bg-zinc-200 py-2 px-6 mr-9 rounded-md' placeholder='password' />

                    {
                        errors.password && (
                            <p className='text-red-500'>
                                password is required
                            </p>
                        )
                    }


                    <button type="submit" className='bg-green-500 hover:bg-emerald-400 text-white px-6 py-2 my-3 rounded-md justify-center '>
                        register
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between text-white'>
                    do u already have an account? <Link to="/login" className='text-sky-500'>Sign up</Link>
                </p>
            </div></div>
    );
}

export default RegisterPage

