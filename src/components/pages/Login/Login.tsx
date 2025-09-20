import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@components/context/AuthContext";
import "./Login.css";

export default function LoginScreen() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      nav("/");
    } catch (ex: unknown) {
      setErr(ex instanceof Error ? ex.message : "Erro ao logar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      {/* Painel da Esquerda: Formulário */}
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha*</label>
            <div className="password-wrapper">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="toggle">👁️</span>
            </div>
            <Link to="#" className="forgot">
              Esqueci minha senha
            </Link>
          </div>

          {err && <p className="error">{err}</p>}

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>

      {/* Painel da Direita: Marketing */}
      <div className="login-right">
        <h3>LiveWork ERP</h3>
        <h1>Plataforma de negócios, multitarefa.</h1>
        <p>
          Backoffice de ponta a ponta em serviços e sistemas para empresas de
          Crédito e Fomento Comercial: Factorings, Cias Securitizadoras, FIDCs e ESCs.
        </p>
      </div>
    </div>
  );
}
