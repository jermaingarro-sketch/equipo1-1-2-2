import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '../context/authContext'
// import { useEffect } from 'react';
import { Link, useNavigate, } from 'react-router'
// import { useRedirectAuthenticated } from '../ProtectedRoute';
//useNavigate

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const { signin, isAuthenticated, errors: signinErrors } = useAuth();

  // useRedirectAuthenticated('/tasks');

  const navigate = useNavigate();
 const onSubmit = handleSubmit(async (data) => { //esto es lo que se va a ejecutar cuando se haga el submit
    signin(data)
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

 

  return (
    <div className='flex h-[calc(100vh-50px)] items-center justify-center bg-zinc-900'>
      <div className='bg-zinc-700 max-w-md w-full p-10 rounded-md'>
        {
          signinErrors.map((error, i) => (
            <div className='bg-red-700 p-2 my-2 text-white' key={i}>
              {error}
            </div>
          ))
        }

        <form className=' ' onSubmit={onSubmit}>


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
            className=' w-full bg-zinc-200 py-2 my-3 px-6 mr-9 rounded-md' placeholder='password' />

          {
            errors.password && (
              <p className='text-red-500'>
                password is required
              </p>
            )
          }


          <button type="submit" className='bg-green-500 hover:bg-indigo-500 text-white px-6 py-2 my-3 rounded-md justify-center '>
            Login
          </button>
        </form>
        <p className='flex gap-x-2 justify-between text-white'>
          dont have an account yet? <Link to="/register" className='text-sky-500'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage