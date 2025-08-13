//permite que solo los usuarios autenticados puedan acceder a las rutas protegidas.
//Si el usuario no está autenticado, se redirige a la página de inicio de sesión.


// import { useEffect } from 'react';
import { useAuth } from './context/authContext'
import { Outlet, Navigate, } from 'react-router'



function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()

  if (loading) return <h1>Loading...</h1>
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace /> //replace fuerza a que no se pueda volver a la página anterior

  // if (user === null && !isAuthenticated, loading === true) return <h1>Loading...</h1>;
  // if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <Outlet /> //Outlet es un componente de react-router que se utiliza para que continúe la navegación anidada
  )
}

// export const useRedirectAuthenticated = (redirectTo) => {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate(redirectTo);
//     }
//   }, [isAuthenticated, navigate, redirectTo]);
// };

export default ProtectedRoute;