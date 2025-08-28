// Importing global styles for Mantine
import "@mantine/core/styles.css";

// Importing necessary components from Mantine
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

// Importing routing components
// CORRECTION: Importer depuis 'react-router-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// Importing the AuthProvider
import { AuthProvider } from "./context/AuthProvider";

// Importing the pages
import { AppLayout } from "./AppLayout";
import { Login } from "./pages/Login";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { StudentHomePage } from "./pages/StudentHomePage";

export default function App() {
  return (
  <MantineProvider theme={theme}>
          <AuthProvider>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route element={<AppLayout />}>
                  <Route path="/student" element={<StudentHomePage />} />
                </Route>
              </Route>
            </Routes>
            </BrowserRouter>
          </AuthProvider>
  </MantineProvider>
  )
}
