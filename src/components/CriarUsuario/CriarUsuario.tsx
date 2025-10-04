import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./CriarUsuario.css";

type Props = {
  onSave?: (data: any) => void;
};

export default function CriaUsuario({ onSave }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [permissao, setPermissao] = useState("usuario");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const nav = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (senha !== confirmar) {
      setErrorMsg("⚠️ As senhas não conferem!");
      return;
    }

    try {
      if (onSave) {
        onSave({ nome, email, senha, permissao });
      } else {
        const resp = await api.post("/auth/register", {
          name: nome,
          email,
          password: senha,
          role: permissao,
        });

        if (resp.status === 201) {
          setSuccessMsg("✅ Usuário cadastrado com sucesso!");

          // limpa campos
          setNome("");
          setEmail("");
          setSenha("");
          setConfirmar("");
          setPermissao("usuario");

          // redireciona para lista de usuários após 1.5s
          setTimeout(() => nav("/users"), 1500);
        }
      }
    } catch (err: any) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;

      if (status === 409) {
        setErrorMsg("⚠️ Este e-mail já está cadastrado.");
      } else if (status === 400) {
        setErrorMsg("⚠️ Dados inválidos. Verifique os campos.");
      } else {
        setErrorMsg(msg || "⚠️ Erro ao criar usuário.");
      }
    }
  }

  return (
    <div className="form-usuario">
      <div className="form-header">
        <h2>Criar Usuário</h2>
      </div>

      {/* 🔴 Alerta vermelho */}
      {errorMsg && <div className="alert-error">{errorMsg}</div>}

      {/* 🟢 Alerta verde */}
      {successMsg && <div className="alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome completo*</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Login (e-mail)*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nova senha*</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmar senha*</label>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Permissão*</label>
          <select
            value={permissao}
            onChange={(e) => setPermissao(e.target.value)}
            required
          >
            <option value="usuario">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-voltar"
            onClick={() => nav("/users")}
          >
            Voltar
          </button>

          <button type="submit" className="btn-salvar">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
