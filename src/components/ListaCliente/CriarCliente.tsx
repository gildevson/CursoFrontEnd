import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "./CriarCliente.css";

export default function CriarCliente() {
  const [nome, setNome] = useState("");
  const [cnpjCpf, setCnpjCpf] = useState("");
  const [emailContato, setEmailContato] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ruaEndereco, setRuaEndereco] = useState("");
  const [numeroEndereco, setNumeroEndereco] = useState("");
  const [complementoEndereco, setComplementoEndereco] = useState("");
  const [bairroEndereco, setBairroEndereco] = useState("");
  const [cidadeEndereco, setCidadeEndereco] = useState("");
  const [estadoEndereco, setEstadoEndereco] = useState("");
  const [cepEndereco, setCepEndereco] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await api.post(
        "/clientes/criar",
        {
          nome,
          cnpjCpf,
          emailContato,
          telefone,
          ruaEndereco,
          numeroEndereco,
          complementoEndereco,
          bairroEndereco,
          cidadeEndereco,
          estadoEndereco,
          cepEndereco,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Cliente criado com sucesso!");

      // limpa o formulário
      setNome("");
      setCnpjCpf("");
      setEmailContato("");
      setTelefone("");
      setRuaEndereco("");
      setNumeroEndereco("");
      setComplementoEndereco("");
      setBairroEndereco("");
      setCidadeEndereco("");
      setEstadoEndereco("");
      setCepEndereco("");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Erro ao criar cliente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-cliente">
      <h2>Criar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome / Razão Social</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>CPF / CNPJ</label>
        <input
          value={cnpjCpf}
          onChange={(e) => setCnpjCpf(e.target.value)}
        />

        <label>E-mail de Contato</label>
        <input
          type="email"
          value={emailContato}
          onChange={(e) => setEmailContato(e.target.value)}
        />

        <label>Telefone</label>
        <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />

        <label>Endereço</label>
        <input
          placeholder="Rua"
          value={ruaEndereco}
          onChange={(e) => setRuaEndereco(e.target.value)}
        />
        <div className="linha">
          <input
            placeholder="Número"
            value={numeroEndereco}
            onChange={(e) => setNumeroEndereco(e.target.value)}
          />
          <input
            placeholder="Complemento"
            value={complementoEndereco}
            onChange={(e) => setComplementoEndereco(e.target.value)}
          />
        </div>
        <div className="linha">
          <input
            placeholder="Bairro"
            value={bairroEndereco}
            onChange={(e) => setBairroEndereco(e.target.value)}
          />
          <input
            placeholder="Cidade"
            value={cidadeEndereco}
            onChange={(e) => setCidadeEndereco(e.target.value)}
          />
        </div>
        <div className="linha">
          <input
            placeholder="Estado"
            value={estadoEndereco}
            onChange={(e) => setEstadoEndereco(e.target.value)}
          />
          <input
            placeholder="CEP"
            value={cepEndereco}
            onChange={(e) => setCepEndereco(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Criar Cliente"}
        </button>
      </form>
    </div>
  );
}
