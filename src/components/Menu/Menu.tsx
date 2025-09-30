import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  FaHome, FaUser, FaChartBar, FaSignOutAlt, FaTachometerAlt,
  FaChevronDown, FaChevronRight, FaTools, FaMoneyBillWave,
  FaUsers, FaAddressCard, FaFolder, FaBars
} from "react-icons/fa";
import "./menu.css";

type ItemNode = { type: "item"; label: string; icon: IconType; path: string };
type GroupNode = { type: "group"; label: string; key: string; icon: IconType; children: TreeNode[] };
type SectionNode = { type: "section"; label: string; children: TreeNode[] };
type TreeNode = ItemNode | GroupNode | SectionNode;
const menuTree: TreeNode[] = [
  { type: "item", label: "Home", icon: FaHome, path: "/dashboard" },
  { type: "item", label: "Operação", icon: FaTachometerAlt, path: "/operacao" },
  { type: "item", label: "Manutenção de documentos", icon: FaAddressCard, path: "/manutencao-documentos" },
  { type: "item", label: "Cliente", icon: FaUser, path: "/cliente" },

  // ✅ Adicionando rota de Usuários
 { type: "item", label: "Usuários", icon: FaUsers, path: "/users" },

  {
    type: "group", label: "Cadastros", key: "Cadastros", icon: FaFolder,
    children: [
      { type: "item", label: "Empresa", icon: FaFolder, path: "/cadastros/empresa" },
      { type: "item", label: "Clientes", icon: FaUsers, path: "/cadastros/clientes" },
      { type: "item", label: "Produtos", icon: FaFolder, path: "/cadastros/produtos" },
    ],
  },
  {
    type: "group", label: "Operacional", key: "Operacional", icon: FaTools,
    children: [
      { type: "item", label: "Workflow", icon: FaTools, path: "/operacional/workflow" },
      { type: "item", label: "Títulos", icon: FaAddressCard, path: "/operacional/titulos" },
    ],
  },
  {
    type: "group", label: "Financeiro", key: "Financeiro", icon: FaMoneyBillWave,
    children: [
      { type: "item", label: "Contas a pagar", icon: FaMoneyBillWave, path: "/financeiro/pagar" },
      { type: "item", label: "Contas a receber", icon: FaMoneyBillWave, path: "/financeiro/receber" },
      { type: "item", label: "Conciliação", icon: FaChartBar, path: "/financeiro/conciliacao" },
    ],
  },
  {
    type: "group", label: "Relatório", key: "Relatorio", icon: FaChartBar,
    children: [
      { type: "item", label: "Operações", icon: FaChartBar, path: "/relatorio/operacoes" },
      { type: "item", label: "Financeiro", icon: FaChartBar, path: "/relatorio/financeiro" },
    ],
  },
];

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);     // mobile drawer
  const [isCollapsed, setIsCollapsed] = useState(false);   // desktop: recolhido
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
  );

  const username = localStorage.getItem("username") || "Usuário";
  const navigate = useNavigate();
  const location = useLocation();

  // Observa breakpoints e ajusta estados
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (desktop) {
        // no desktop não usamos overlay/drawer
        setIsMenuOpen(false);
        document.body.classList.remove("lw-lock");
      }
    };
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Aplica classes no body para empurrar conteúdo conforme largura
  useEffect(() => {
    if (isDesktop) {
      document.body.classList.add("lw-has-sidebar");
      document.body.classList.toggle("lw-sidebar-collapsed", isCollapsed);
    } else {
      document.body.classList.add("lw-has-sidebar");
      document.body.classList.remove("lw-sidebar-collapsed");
    }
    return () => {
      document.body.classList.remove("lw-sidebar-collapsed");
      document.body.classList.remove("lw-has-sidebar");
    };
  }, [isCollapsed, isDesktop]);

  // Limpeza: desbloqueia scroll ao desmontar
  useEffect(() => {
    return () => document.body.classList.remove("lw-lock");
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((v) => {
      const next = !v;
      document.body.classList.toggle("lw-lock", next); // trava/destrava scroll no mobile
      return next;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.classList.remove("lw-lock");
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((v) => !v);
  }, []);

  const toggleGroup = useCallback(
    (key: string) => setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] })),
    []
  );

  const isActive = useCallback(
    (path: string) => location.pathname.startsWith(path),
    [location.pathname]
  );

  const handleNavigate = useCallback(
    (path: string) => {
      setIsLoading(true);
      setTimeout(() => {
        navigate(path);
        setIsLoading(false);
        closeMenu(); // fecha o drawer no mobile
      }, 200);
    },
    [navigate, closeMenu]
  );

  const handleLogout = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
      setIsLoading(false);
      closeMenu();
    }, 200);
  }, [navigate, closeMenu]);

  function filterBySearch(node: TreeNode, term: string): TreeNode | null {
    if (!term) return node;
    const q = term.toLowerCase();
    if (node.type === "item") {
      return node.label.toLowerCase().includes(q) ? node : null;
    }
    const children = (node.type === "group" || node.type === "section") ? node.children : [];
    const kids = children.map(n => filterBySearch(n, term)).filter(Boolean) as TreeNode[];
    if (node.label.toLowerCase().includes(q) || kids.length > 0) {
      return { ...node, children: kids } as TreeNode;
    }
    return null;
  }

  const filteredTree = useMemo(
    () => menuTree.map(n => filterBySearch(n, search)).filter(Boolean) as TreeNode[],
    [search]
  );

  const renderNode = (node: TreeNode, keyPrefix = ""): React.ReactNode => {
    if (node.type === "item") {
      const Icon = node.icon;
      const active = isActive(node.path);
      return (
        <li key={`${keyPrefix}item-${node.path}`} className={`menu-item ${active ? "active" : ""}`} title={isCollapsed ? node.label : undefined}>
          <Icon aria-hidden className="menu-icon" />
          {!isCollapsed && (
            <button className="menu-link" onClick={() => handleNavigate(node.path)} aria-current={active ? "page" : undefined}>
              {node.label}
            </button>
          )}
          {isCollapsed && (
            <button className="menu-link-icon" onClick={() => handleNavigate(node.path)} aria-label={node.label} />
          )}
        </li>
      );
    }

    if (node.type === "section") {
      if (isCollapsed) return null;
      return (
        <li key={`${keyPrefix}section-${node.label}`} className="menu-section">
          <span className="menu-section-title">{node.label}</span>
          <ul className="submenu" role="menu">
            {node.children.map((c, i) => renderNode(c, `${keyPrefix}sec-${i}-`))}
          </ul>
        </li>
      );
    }

    const isOpen = !!openGroups[node.key];
    const Icon = node.icon;
    const showChildren = !isCollapsed && isOpen;

    return (
      <li key={`${keyPrefix}group-${node.key}`} className={`menu-group ${isOpen ? "open" : ""}`} title={isCollapsed ? node.label : undefined}>
        <button
          className="menu-group-toggle"
          onClick={() => (isCollapsed ? null : toggleGroup(node.key))}
          aria-expanded={!isCollapsed && isOpen}
          aria-controls={`group-${node.key}`}
        >
          <Icon aria-hidden className="menu-icon" />
          {!isCollapsed && <span className="menu-link">{node.label}</span>}
          {!isCollapsed && (
            <span className="menu-group-caret">
              {isOpen ? <FaChevronDown aria-hidden /> : <FaChevronRight aria-hidden />}
            </span>
          )}
        </button>
        {showChildren && (
          <ul className="submenu" id={`group-${node.key}`} role="menu">
            {node.children.map((c, i) => (
              <React.Fragment key={`${keyPrefix}group-${node.key}-${i}`}>
                {renderNode(c, `${keyPrefix}group-${node.key}-${i}-`)}
              </React.Fragment>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      {isLoading && (
        <div className="loading-screen" role="alert" aria-live="assertive">
          <div className="spinner" />
        </div>
      )}

      {/* Mobile: botão hamburguer */}
      {!isDesktop && (
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="sidebar-menu"
        >
          <FaBars aria-hidden />
        </button>
      )}

      {/* Sidebar fixa (desktop) / drawer (mobile) */}
      <aside
        id="sidebar-menu"
        className={`menu-container ${isMenuOpen ? "is-open" : ""} ${isCollapsed ? "collapsed" : ""}`}
        role="navigation"
        aria-label="Menu principal"
      >
        {/* Busca (esconde quando recolhido) */}
        {!isCollapsed && (
          <div className="menu-search">
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Pesquisar no menu"
            />
          </div>
        )}

        {/* Usuário (mostra só avatar quando recolhido) */}
        <div className="user-info">
          <FaUser className="user-icon" aria-hidden />
          {!isCollapsed && <span>{username}</span>}
        </div>

        {/* Itens */}
        <ul className="menu" role="menubar">
          {filteredTree.map((n, i) => (
            <React.Fragment key={`root-${i}`}>{renderNode(n, `root-${i}-`)}</React.Fragment>
          ))}
        </ul>

        {/* Rodapé */}
        <ul className="menu-bottom">
          <li className="menu-item" title={isCollapsed ? "Sair" : undefined}>
            <FaSignOutAlt className="menu-icon" aria-hidden />
            {!isCollapsed ? (
              <button className="logout-button" onClick={handleLogout} disabled={isLoading}>
                {isLoading ? "Saindo..." : "Sair"}
              </button>
            ) : (
              <button className="menu-link-icon" onClick={handleLogout} aria-label="Sair" />
            )}
          </li>
        </ul>
      </aside>

      {/* Mobile overlay (sempre renderizada; CSS controla visibilidade) */}
      <div
        className={`overlay ${isMenuOpen ? "is-active" : ""}`}
        onClick={closeMenu}
        aria-hidden
      />
    </>
  );
}
