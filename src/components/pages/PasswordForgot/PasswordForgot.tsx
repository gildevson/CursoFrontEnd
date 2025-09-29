import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // seu axios
import "./PasswordForgot.css"; // import do CSS

type Resp = { ok: boolean; message?: string; error?: string };

export default function PasswordForgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const emailClean = useMemo(() => email.trim(), [email]);
  const emailValid = /\S+@\S+\.\S+/.test(emailClean);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid || loading) return;
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const { data } = await api.post<Resp>("/auth/forgot-password", { email: emailClean });
      setMsg(data.message || "Se existir uma conta para este e-mail, enviaremos instruções.");
      setEmail("");
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Erro ao solicitar redefinição.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      {/* Esquerda - Formulário */}
      <div className="auth-left">
        <div className="auth-box">
          <h1>Esqueci minha senha</h1>
          <p className="subtitle">Informe seu e-mail para redefinir a senha.</p>

          <form onSubmit={onSubmit} noValidate>
            <label className="field">
              <span>E-mail*</span>
              <input
                type="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                disabled={loading || Boolean(msg)}
              />
            </label>

            {err && <p className="error">{err}</p>}

            {msg ? (
              <div className="ok">
                <p>{msg}</p>
                <div className="btn-group">
                  <Link to="/login" className="btn-secondary">Voltar ao login</Link>
                  <button type="button" className="btn-secondary" onClick={() => setMsg(null)}>
                    Enviar outro
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="btn-group">
                  <Link to="/login" className="btn-secondary">Cancelar</Link>
                  <button type="submit" className="btn-submit" disabled={!emailValid || loading}>
                    {loading ? "Enviando…" : "Enviar link"}
                  </button>
                </div>
                <p className="hint">Você receberá um link válido por 1 hora.</p>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Direita - Banner */}
      <div className="auth-right">
        <h2>LiveWork ERP</h2>
        <h3>Plataforma de negócios, multitarefa.</h3>
        <p>Backoffice completo para FIDCs, Securitizadoras e Factorings.</p>
      </div>
    </div>
  );
}
