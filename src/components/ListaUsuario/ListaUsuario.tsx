import { useEffect, useState } from "react";
import api from "../services/api";
import "./ListaUsuario.css";

type Usuario = {
  id: string;
  name: string;
  email: string;
};

export default function ListaUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form state
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function carregarUsuarios(q?: string) {
    try {
      setLoading(true);
      const resp = await api.get<Usuario[]>("/users", {
        params: q ? { q } : {},
      });
      setUsuarios(resp.data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setError("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }

  async function criarUsuario(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resp = await api.post<Usuario>("/users", {
        name: nome,
        email,
        password: senha,
      });
      setUsuarios((prev) => [...prev, resp.data]); // adiciona na lista
      setNome("");
      setEmail("");
      setSenha("");
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      alert("Não foi possível criar o usuário.");
    }
  }

  async function deletarUsuario(id: string) {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Não foi possível excluir o usuário.");
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lista-usuarios">
      <h2>Lista de Usuários</h2>

      {/* Formulário de cadastro */}
      <form onSubmit={criarUsuario} className="form-usuario">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Criar Usuário</button>
      </form>

      {/* Tabela de usuários */}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => deletarUsuario(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
