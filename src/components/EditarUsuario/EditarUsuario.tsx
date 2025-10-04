import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./EditarUsuario.css";

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Carrega dados do usuário
  useEffect(() => {
    async function carregarUsuario() {
      try {
        const resp = await api.get(`/users/${id}`);
        setName(resp.data.name);
        setEmail(resp.data.email);
      } catch {
        setError("Erro ao carregar os dados do usuário.");
      }
    }
    carregarUsuario();
  }, [id]);

  // 🔹 Atualiza usuário
  async function salvar() {
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim()) {
      setError("Preencha o nome e o e-mail corretamente.");
      return;
    }

    if (password && password !== confirmPassword) {
      setError("As senhas não coincidem. Verifique novamente.");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/users/${id}`, { name, email, password });

      setSuccess("✅ Usuário atualizado com sucesso!");
      setPassword("");
      setConfirmPassword("");

      // remove a mensagem de sucesso após 4 segundos
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao atualizar usuário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="editar-usuario">
      <h2>Editar Usuário</h2>

      {error && <div className="msg msg-erro">{error}</div>}
      {success && <div className="msg msg-sucesso">{success}</div>}

      <label>Nome</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome completo"
        className={error && !name.trim() ? "input-erro" : ""}
      />

      <label>E-mail</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite o e-mail"
        className={error && !email.trim() ? "input-erro" : ""}
      />

      <label>Nova Senha (opcional)</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Deixe em branco para manter a senha atual"
      />

      {password && (
        <>
          <label>Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a nova senha"
            className={
              confirmPassword && password !== confirmPassword
                ? "input-erro"
                : ""
            }
          />
        </>
      )}

      <div className="btn-group">
        <button
          disabled={loading}
          onClick={salvar}
          className="btn-salvar"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button
          className="btn-voltar"
          onClick={() => nav("/users")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
