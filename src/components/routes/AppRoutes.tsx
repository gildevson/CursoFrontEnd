import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Landing from "@components/pages/Landing/Landing";
import Login from "@components/Login/Login";
import Menu from "@components/Menu/Menu";
import PasswordForgot from "@pages/PasswordForgot/PasswordForgot";
import PasswordReset from "@pages/PasswordReset/PasswordReset";
import ListaUsuario from "@components/ListaUsuario/ListaUsuario";

// Wrapper para rotas privadas com Menu
function PrivateRoutesWrapper() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Menu />
      <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Outlet /> {/* aqui o conteúdo da rota aparece */}
      </main>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<PasswordForgot />} />
      <Route path="/reset-password" element={<PasswordReset />} />

      {/* privadas com menu */}
      <Route element={<PrivateRoutesWrapper />}>
        <Route path="/users" element={<ListaUsuario />} />
        {/* Exemplo de outras rotas */}
        {/* <Route path="/clientes" element={<Clientes />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Route>
    </Routes>
  );
}
