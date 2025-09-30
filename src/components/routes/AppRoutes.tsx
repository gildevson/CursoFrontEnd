import { Routes, Route } from "react-router-dom";
import Landing from "@components/pages/Landing/Landing";
import Login from "@components/Login/Login";
import Menu from "@components/Menu/Menu";
import PrivateRoutes from "./PrivateRoutes";
import PasswordForgot from "@pages/PasswordForgot/PasswordForgot";
import PasswordReset from "@pages/PasswordReset/PasswordReset";
import ListaUsuario from "@components/ListaUsuario/ListaUsuario";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<PasswordForgot />} />
      <Route path="/reset-password" element={<PasswordReset />} />

      {/* Rotas protegidas */}
      <Route
        path="/menu"
        element={
          <PrivateRoutes>
            <Menu />
          </PrivateRoutes>
        }
      />

      {/* ✅ Nova rota de Usuários */}
      <Route
        path="/users"
        element={
          <PrivateRoutes>
            <ListaUsuario />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
