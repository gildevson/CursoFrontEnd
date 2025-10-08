import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../services/api";
import Loading from "../Loading/Loading";
import "./ListaClientes.css"; // 👈 Importa o CSS

type Cliente = {
  id: string;
  nome: string;
  cnpjCpf: string;
  emailContato: string;
  telefone: string;
  cidadeEndereco: string;
  ativo: boolean;
};

export default function ListaClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const nav = useNavigate();

  async function carregarClientes(p = 1) {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const resp = await api.get("/clientes", {
        params: { q, page: p, limit },
        headers: { Authorization: `Bearer ${token}` },
      });

      setClientes(resp.data.rows);
      setTotalPages(resp.data.totalPages);
      setPage(resp.data.page);
    } catch (err) {
      console.error("❌ Erro ao carregar clientes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="lista-clientes">
      <h2>Clientes</h2>

      <div className="filtro">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button onClick={() => carregarClientes(1)}>
          <FaSearch /> Buscar
        </button>
      </div>

      <table className="tabela-clientes">
        <thead>
          <tr>
            <th>Razão social</th>
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan={7} className="sem-clientes">
                Nenhum cliente encontrado.
              </td>
            </tr>
          ) : (
            clientes.map((cli) => (
              <tr key={cli.id}>
                <td>{cli.nome}</td>
                <td>{cli.cnpjCpf}</td>
                <td>{cli.telefone}</td>
                <td>{cli.emailContato}</td>
                <td>
                  <span className="tipo">Cliente</span>
                </td>
                <td>
                  <span className={cli.ativo ? "status ativo" : "status inativo"}>
                    {cli.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <button className="btn-excluir">
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="paginacao">
        <button disabled={page <= 1} onClick={() => carregarClientes(page - 1)}>
          ◀ Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => carregarClientes(page + 1)}
        >
          Próxima ▶
        </button>
      </div>
    </div>
  );
}
