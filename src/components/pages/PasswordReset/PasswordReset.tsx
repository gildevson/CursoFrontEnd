import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./PasswordReset.css";

type OkResp = { ok: boolean; message?: string; error?: string };

export default function PasswordReset() {
  const location = useLocation();
  const nav = useNavigate();

  const qs = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const uid = qs.get("uid") || "";
  const token = qs.get("token") || "";
  const linkInvalido = !uid || !token;

  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (pwd !== pwd2) return setErr("As senhas não conferem.");
    setLoading(true);
    try {
      const { data } = await api.post<OkResp>("/auth/reset-password", {
        uid,
        token,
        newPassword: pwd,
      });
      setMsg(data.message || "Senha alterada com sucesso.");
    } catch (e: any) {
      const m = e?.response?.data?.error || e.message || "Falha ao redefinir senha.";
      setErr(m);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h1>Redefinir senha</h1>

        {linkInvalido ? (
          <>
            <p className="error">Link inválido ou incompleto.</p>
            <Link to="/login" className="btn-secondary">Voltar ao login</Link>
          </>
        ) : msg ? (
          <>
            <p className="ok">{msg}</p>
            <button className="btn-submit" onClick={() => nav("/login")}>
              Ir para o login
            </button>
          </>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <label className="field">
              <span>Nova senha</span>
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                minLength={8}
                required
                disabled={loading}
              />
            </label>

            <label className="field">
              <span>Confirmar senha</span>
              <input
                type="password"
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                minLength={8}
                required
                disabled={loading}
              />
            </label>

            {err && <p className="error">{err}</p>}

            <div className="btn-group">
              <Link to="/login" className="btn-secondary">Cancelar</Link>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Salvando…" : "Salvar nova senha"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
