// Importing global styles for Mantine
import "@mantine/core/styles.css";

// Importing necessary components from Mantine
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

// Importing routing components
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// Importing the AuthProvider
import { AuthProvider } from "./context/AuthProvider";

// Importing the pages
import { AppLayout } from "./AppLayout";
import { Login } from "./pages/Login";
import { CreateAccount } from "./pages/CreateAccount";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
  <MantineProvider theme={theme}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />

              <Route element={<ProtectedRoutes />}>
                <Route element={<AppLayout />}>
                  <Route path="/home" element={<HomePage />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
  </MantineProvider>
  )
}
