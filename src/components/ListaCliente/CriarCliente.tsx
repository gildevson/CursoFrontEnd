import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importa o hook
import { toast } from "react-toastify";
import api from "../services/api";
import "./CriarCliente.css";

export default function CriarCliente() {
  const nav = useNavigate(); // 👈 Inicializa o hook de navegação

  const [form, setForm] = useState({
    nome: "",
    cnpjCpf: "",
    emailContato: "",
    telefone: "",
    ruaEndereco: "",
    numeroEndereco: "",
    complementoEndereco: "",
    bairroEndereco: "",
    cidadeEndereco: "",
    estadoEndereco: "",
    cepEndereco: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await api.post("/clientes/criar", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Cliente criado com sucesso!");

      // Limpa o formulário
      setForm({
        nome: "",
        cnpjCpf: "",
        emailContato: "",
        telefone: "",
        ruaEndereco: "",
        numeroEndereco: "",
        complementoEndereco: "",
        bairroEndereco: "",
        cidadeEndereco: "",
        estadoEndereco: "",
        cepEndereco: "",
      });

      // ✅ Redireciona para lista de clientes
      setTimeout(() => {
        nav("/clientes");
      }, 1000); // pequena pausa para mostrar o toast
    } catch (err: any) {
      console.error("Erro ao criar cliente:", err);
      toast.error(err.response?.data?.error || "Erro ao criar cliente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-cliente">
      <div className="form-cliente-header">
        <h2>Novo | Cliente</h2>
        <button
          className="btn-salvar"
          type="submit"
          form="formCriarCliente"
          disabled={loading}
        >
          💾 {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <form id="formCriarCliente" onSubmit={handleSubmit}>
        {/* Seção Cadastro */}
        <div className="secao">
          <h3>Cadastro</h3>
          <div className="form-grid">
            <div>
              <label htmlFor="nome">Nome / Razão Social*</label>
              <input
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="cnpjCpf">CPF / CNPJ</label>
              <input
                id="cnpjCpf"
                name="cnpjCpf"
                value={form.cnpjCpf}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Seção Endereço */}
        <div className="secao">
          <h3>Endereço</h3>
          <div className="form-grid">
            <input
              name="cepEndereco"
              placeholder="CEP"
              value={form.cepEndereco}
              onChange={handleChange}
            />
            <input
              name="ruaEndereco"
              placeholder="Logradouro"
              value={form.ruaEndereco}
              onChange={handleChange}
            />
            <input
              name="numeroEndereco"
              placeholder="Número"
              value={form.numeroEndereco}
              onChange={handleChange}
            />
            <input
              name="complementoEndereco"
              placeholder="Complemento"
              value={form.complementoEndereco}
              onChange={handleChange}
            />
            <input
              name="bairroEndereco"
              placeholder="Bairro"
              value={form.bairroEndereco}
              onChange={handleChange}
            />
            <input
              name="cidadeEndereco"
              placeholder="Cidade"
              value={form.cidadeEndereco}
              onChange={handleChange}
            />
            <input
              name="estadoEndereco"
              placeholder="Estado"
              value={form.estadoEndereco}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Seção Contato */}
        <div className="secao">
          <h3>Contato</h3>
          <div className="form-grid">
            <input
              name="emailContato"
              placeholder="E-mail"
              type="email"
              value={form.emailContato}
              onChange={handleChange}
            />
            <input
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Botão extra inferior */}
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Cliente"}
        </button>
      </form>
    </div>
  );
}
