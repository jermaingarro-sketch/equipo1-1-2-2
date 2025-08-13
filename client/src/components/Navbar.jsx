import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { door } from './fontAwesome'
import { Link } from 'react-router'
import { useAuth } from '../context/authContext'

function Navbar() {

    const { isAuthenticated, signout, user } = useAuth();


    return (
        <section className='bg-zinc-800'>
            <nav className='flex justify-end w-full p-3 my-4'>
                <Link to="/">
                    <img src="..\src/assets\Sin título-1_Mesa de trabajo 1 copy.png" className="w-35 h-auto max-w-full" alt="Logo" />
                </Link>

                {
                    isAuthenticated ? (
                        <>
                            <ul className='flex items-center font-mono' role='navigation'>

                                <li className='text-white'>
                                    <Link to="/Tasks"> Tareas</Link>
                                </li>
                            </ul>
                            <Link className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 mx-5 rounded' to="/tasks/new">
                                New Task
                            </Link>
                            <div className="flex flex-col items-center gap-2">
  <Link to="/Profile">
    <img
      className="w-16 h-16 rounded-full object-cover"
      src="..\src\assets\react.svg"
      alt="Profile"
    />
  </Link>
  <Link to="/Profile">
    <span className="text-white text-sm font-medium">Welcome, {user.username}</span>
  </Link>
</div>
                            {/* <div className='flex flex-col items-center'>
                                <Link to="/Profile">
                                    <img className=' rounded-md' src="..\src\assets\react.svg " alt="" />
                                </Link>
                                <Link to="/Profile">
                                    <li className='text-white '>welcome {user.username} </li>
                                </Link>
                            </div> */}
                            {/* {() => signout()}></> */}
                            <Link to="/" onClick={signout}>
                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded'>
                                    <FontAwesomeIcon icon="door-open" />
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>

                            {/* <Link to="/login"
                                className='bg-gray-900 outline-white outline-2 focus:bg-amber-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded'>
                                Login
                            </Link>

                            <Link to="/register">
                                <button className='bg-blue-500 outline-white outline-2 focus:bg-amber-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded'>
                                    Register
                                </button>
                            </Link> */}
                        </>
                    )
                }
            </nav>
        </section>
    );
}
export default Navbar;
