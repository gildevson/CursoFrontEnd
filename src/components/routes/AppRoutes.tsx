import { Routes, Route } from "react-router-dom";
import Landing from "@components/pages/Landing/Landing";
import Login from "@components/Login/Login";
import Menu from "@components/Menu/Menu";
import PrivateRoutes from "./PrivateRoutes";
import PasswordForgot from "@pages/PasswordForgot/PasswordForgot";
import PasswordReset from "@pages/PasswordReset/PasswordReset";
import ListaUsuario from "@components/ListaUsuario/ListaUsuario";
import CriarUsuario from "@components/CriarUsuario/CriarUsuario";
import EditarUsuario from "@components/EditarUsuario/EditarUsuario";
import ListaClientes from "@components/ListaCliente/ListaClientes";
import CriarCliente from "@components/ListaCliente/CriarCliente";

function ProtectedLayout() {
  return (
    <div className="app-layout">
      <Menu /> {/* sempre visível na esquerda */}
      <main className="main-content">
        <Routes>
          {/* Usuários */}
          <Route path="/users" element={<ListaUsuario />} />
          <Route path="/usuarios/novo" element={<CriarUsuario />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
          <Route path="/clientes" element={<ListaClientes />} />
          <Route path="/clientes/novo" element={<CriarCliente />} />
          {/* você pode adicionar mais rotas protegidas aqui */}
        </Routes>
      </main>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<PasswordForgot />} />
      <Route path="/reset-password" element={<PasswordReset />} />

      {/* Protegidas com layout */}
      <Route
        path="/*"
        element={
          <PrivateRoutes>
            <ProtectedLayout />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
