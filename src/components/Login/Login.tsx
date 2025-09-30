// src/components/Login/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api"; // ✅ corrigido caminho
import "./Login.css";
import Loading from "@/components/Loading/Loading"; // ajuste conforme seu alias de paths

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<null | "auth" | "redirect">(null);
  const [showPwd, setShowPwd] = useState(false);
  const nav = useNavigate();

  const isLoading = busy !== null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setBusy("auth");

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // ✅ salva token e roles
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // mostra overlay e redireciona
      setBusy("redirect");
      requestAnimationFrame(() => nav("/menu"));
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Erro ao autenticar.";
      setErr(msg);
      setBusy(null);
    }
  }

  return (
    <div className="login-container">
      {isLoading && <Loading />}

      <div className="login-left">
        <div className="logo">
          <img
            src="https://livework.com.vc/assets/app/media/img/gestor/logo-finanblue-livework.svg"
            alt="Finanblue | LiveWork ERP"
          />
        </div>

        <h2 className="welcome">Seja bem-vindo, insira seus dados.</h2>

        <form onSubmit={onSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail*</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha*</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShowPwd(v => !v)}
                aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                disabled={isLoading}
                title={showPwd ? "Ocultar" : "Mostrar"}
              >
                👁️
              </button>
            </div>
            <Link to="/forgot-password" className="forgot">
              Esqueci minha senha
            </Link>
          </div>

          {err && <p className="error">{err}</p>}

          <button type="submit" disabled={isLoading} className="btn-submit">
            {busy === "auth" ? "Autenticando..." : "Entrar"}
          </button>
        </form>
      </div>

      <div className="login-right">
        <h3>LiveWork ERP</h3>
        <h1>Plataforma de negócios, multitarefa.</h1>
        <p>Backoffice completo para FIDCs, Securitizadoras e Factorings.</p>
      </div>
    </div>
  );
}
