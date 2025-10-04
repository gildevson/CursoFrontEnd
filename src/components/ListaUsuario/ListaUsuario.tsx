import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSearch } from "react-icons/fa";
import api from "../services/api";
import "./ListaUsuario.css";
import Loading from "../Loading/Loading";

type Usuario = {
  id: string;
  name: string;
  email: string;
};

export default function ListaUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const nav = useNavigate();

  async function carregarUsuarios(p: number = 1) {
    try {
      setLoading(true);
      const resp = await api.get<Usuario[]>("/users", { params: { q, page: p, limit } });
      console.log("📦 Headers:", resp.headers);

      setUsuarios(resp.data);
      setTotal(parseInt(resp.headers["x-total-count"] || "0", 10));
    } catch (err) {
      console.error("❌ Erro ao carregar usuários:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarUsuarios(page);
  }, [page]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setPage(1);
      carregarUsuarios(1);
    }
  }

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="lista-usuarios">
      {/* 🔹 Topo */}
      <div className="top-bar">
        <h2>Usuários</h2>
        <div className="actions">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Pesquisar por nome ou e-mail..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className="btn-add"
            onClick={() => {
              setLoading(true);
              setTimeout(() => nav("/usuarios/novo"), 400);
            }}
            title="Adicionar usuário"
          >
            +
          </button>
        </div>
      </div>

      {/* 🔹 Conteúdo */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th style={{ textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 ? (
                  usuarios.map((u) => (
                    <tr key={u.id}>
                      <td data-label="Nome">
                        <a
                          href="#"
                          className="user-link"
                          onClick={(e) => {
                            e.preventDefault();
                            setLoading(true);
                            setTimeout(() => nav(`/usuarios/editar/${u.id}`), 400);
                          }}
                        >
                          {u.name}
                        </a>
                      </td>
                      <td data-label="E-mail">{u.email}</td>
                      <td data-label="Ações" style={{ textAlign: "center" }}>
                        <button
                          className="btn-table-action"
                          title="Editar usuário"
                          onClick={() => {
                            setLoading(true);
                            setTimeout(() => nav(`/usuarios/editar/${u.id}`), 400);
                          }}
                        >
                          <FaEdit />
                        </button>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 🔹 Paginação */}
          <div className="pagination-bar">
            <span className="pagination-info">
              Página {page} de {totalPages} — Total: {total}
            </span>
            <div className="pagination-controls">
              <button
                className="btn-page"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                ◀
              </button>
              <button
                className="btn-page"
                disabled={page === totalPages || total === 0}
                onClick={() => setPage((p) => p + 1)}
              >
                ▶
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
