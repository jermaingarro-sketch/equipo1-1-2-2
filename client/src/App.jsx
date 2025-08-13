// rfec //comando para crear un componente funcional sin exportación por defecto
// rafc //comando para crear un componente funcional con exportación por defecto
import { BrowserRouter, Routes, Route } from "react-router"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { AuthProvider } from "./context/authContext"
import { ProfilePage } from "./pages/ProfilePage"
import { TaskFormPage } from "./pages/TaskFormPage"
import { TasksPage } from "./pages/TasksPage"
import { HomePage } from "./pages/HomePage"
import ProtectedRoute from "./ProtectedRoute"
import { TaskProvider } from "./context/taskContext"
import Navbar from "./components/Navbar"
import "../src/pages/fontAwesome";
export const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
          <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/new" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
          
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
