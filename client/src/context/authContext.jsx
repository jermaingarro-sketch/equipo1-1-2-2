//en authcontext.jsx se crea el contexto de autenticación y se exporta el provider y el contexto
//es decir el estado global de la autenticación

import { createContext, useState, useContext, useEffect } from "react"; //tenemos que importar createContext de react
//  para crear el contexto
import { registerRequest, loginRequest, verifyTokenRequest} from "../api/auth";
import Cookies from "js-cookie";
// 
export const AuthContext = createContext(); //Este contexto almacenará y proporcionará datos relacionados con la autenticación 
// (como el usuario actual y si está autenticado o no).
export const useAuth = () => {
    const context = useContext(AuthContext); //creamos un hook para usar el contexto de autenticación
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
} //creamos el provider y el consumer del contexto de autenticación

export const AuthProvider = ({ children }) => { //creamos el provider del contexto de autenticación
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //creamos el estado del usuario y la funcion para cambiarlo
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signin = async (user) => {
    try {
        const res = await loginRequest(user);
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors([]); // Limpiar errores previos
    } catch (error) {
        // Manejo seguro del error (antes fallaba aquí)
        const errorMessage = error.response?.data?.message || 
                            error.response?.data || 
                            "Error al iniciar sesión";
        setErrors([errorMessage]); // Mostrar error al usuario
    }
};

    const signup = async (user) => {
        try {
            const res = await registerRequest(user) //esto es lo que pasamos de REGISTEREQUEST
            console.log(res.data); //nos da un log mas detallado
            if (res.status === 200) {
                setUser(res.data);
                setIsAuthenticated(true);
            }
        }
        catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    };


    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    const signout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
        clearTasks();
};

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get("token");
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return;
            }
            try {
                const res = await verifyTokenRequest(token);
                setUser(res.data);
                console.log(res.data);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            }

            setLoading(false);
        };
        checkAuth();
    }, []);


    return (
        <AuthContext.Provider
            value={
                {
                    user,
                    signup,
                    signin,
                    signout,
                    loading,
                    isAuthenticated,
                    errors,

                }
            }>
            {children}
        </AuthContext.Provider> //retornamos el provider con el valor del contexto y los hijos
    );
};


// useEffect(() => {
//     const checkLogin = async () => {
//         const cookies = Cookies.get();
//         if (!cookies.token) {
//             setIsAuthenticated(false);
//             setLoading(false);
//             setUser(null);
//             return;
//         }

//         try {
//             const res = await verifyTokenRequest(cookies.token);
//             if (!res.data) return setIsAuthenticated(false);
//             setIsAuthenticated(true);
//             // setUser(res.data);
//             setLoading(false);
//         } catch (error) {
//             setIsAuthenticated(false);
//             setLoading(false);
//             setUser(null);
//         }
//     };
//     checkLogin();
// }, []);

//sirve para que cuando se recargue la página,
//  se mantenga la sesión del usuario

// useEffect(() => {
//     const checkLogin = async () => {
//         //obtenemos las cookies del navegador con el método get
//         //  de la librería js-cookie
//         const cookies = Cookies.get();
//         if (!cookies.token) {
//             // setIsAuthenticated(false);
//             // setLoading(false);
//             // setUser(null);
//             return; //si no hay token, no hacemos nada y
//             // retornamos, para que no se ejecute el código de abajo
//         }

//         try {
//             const res = await verifyTokenRequest(cookies.token);
//             // console.log(res);
//             //si no hay respuesta, no hay usuario autenticado y
//             //retornamos false, el if se termina y no se ejecuta el código de abajo
//             if (!res.data) return setIsAuthenticated(false);
//             setIsAuthenticated(true);
//             // setUser(res.data);
//             setLoading(false);
//         } catch (error) {
//             setIsAuthenticated(false);
//             setLoading(false);
//             setUser(null);
//         }
//     };
//     checkLogin(); //es necesario llamar a la función
//     // para que se ejecute, ya que está dentro de un useEffect
// }, []); //no tiene dependencias, por lo que solo se ejecuta una vez
// //en el montaje del componente


