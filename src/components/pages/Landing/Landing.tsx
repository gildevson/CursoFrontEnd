import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing() {
  return (
    <main className={styles.lwLanding}>
      {/* NAV */}
      <nav className={styles.lwNav}>
        <div className={styles.lwNavLeft}>
          <div className={styles.lwLogo}>LiveWork</div>
          <ul className={styles.lwNavLinks}>
            <li><a href="#recursos">Recursos</a></li>
            <li><a href="#como-funciona">Como funciona</a></li>
            <li><a href="#videos">Vídeos</a></li>
            <li><a href="#financeiro">Financeiro</a></li>
            <li><a href="#precos">Preços</a></li>
          </ul>
        </div>
        <div className={styles.lwNavRight}>
          <Link to="/login" className={`${styles.lwBtn} ${styles.lwBtnOutline}`}>Entrar</Link>
          <a href="#" className={styles.lwBtn}>Solicitar Demo</a>
        </div>
      </nav>

      {/* HERO */}
      <header className={styles.lwHero}>
        <p className={styles.lwEyebrow}>Plataforma completa</p>
        <h1 className={styles.lwTitle}>
          Sistema de <span className={styles.lwGradient}>Gerenciamento de Cursos & Financeiro</span>
        </h1>
        <p className={styles.lwSubtitle}>
          Um só sistema para <strong>escolas</strong>, <strong>empresas</strong> e <strong>fundos de investimento</strong>. 
          Gerencie <strong>matrículas</strong>, <strong>aulas</strong>, <strong>avaliações</strong> e também 
          <strong> recebíveis</strong>, <strong>contas a pagar</strong> e <strong>debêntures</strong>.
        </p>
        <div className={styles.lwCta}>
          <Link to="/login" className={styles.lwBtn}>Começar agora</Link>
          <a href="#" className={`${styles.lwBtn} ${styles.lwBtnMuted}`}>Ver documentação</a>
        </div>
      </header>

      {/* FEATURES */}
      <section id="recursos" className={styles.lwFeatures}>
        <Feature icon="🧭" title="Cursos & Trilhas" desc="Cursos, módulos e trilhas com pré-requisitos e carga horária." />
        <Feature icon="📝" title="Matrículas & Turmas" desc="Fluxo de inscrição, aprovação e gestão de vagas." />
        <Feature icon="📚" title="Aulas & Conteúdo" desc="Vídeo, PDF, SCORM/LTI, tarefas e fóruns." />
        <Feature icon="✅" title="Avaliações" desc="Provas, rubricas, notas, presença e certificação." />
        <Feature icon="💳" title="Financeiro" desc="Contas a pagar e receber, relatórios e fluxo de caixa." />
        <Feature icon="🏦" title="Debêntures" desc="Controle de debêntures, investidores e assembleias." />
        <Feature icon="📊" title="Analytics" desc="Engajamento, retenção e KPIs financeiros e educacionais." />
        <Feature icon="⚙️" title="Automação" desc="Integrações, webhooks e workflows." />
      </section>

      {/* VÍDEOS */}
      <section id="videos" className={styles.lwSteps}>
        <h2 className={styles.lwSectionTitle}>Veja na prática</h2>
        <div className={styles.lwStepsGrid}>
          <article className={styles.lwVideo}>
            <h3>Como funciona o LiveWork Acadêmico</h3>
            <iframe 
              width="100%" height="220"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demo Cursos"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </article>
          <article className={styles.lwVideo}>
            <h3>Como funciona o LiveWork Financeiro</h3>
            <iframe 
              width="100%" height="220"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demo Financeiro"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </article>
        </div>
      </section>

      {/* SEÇÃO DE FINANCEIRO */}
      <section id="financeiro" className={styles.lwSteps}>
        <h2 className={styles.lwSectionTitle}>Gestão Financeira e Debêntures</h2>
        <div className={styles.lwStepsGrid}>
          <Step n="1" title="Recebíveis" desc="Controle operações de securitização, factoring, ESC e FIDC." />
          <Step n="2" title="Contas a Pagar & Receber" desc="Organize pagamentos, vencimentos e liquidações." />
          <Step n="3" title="Debêntures" desc="Cadastre debêntures, gerencie investidores e relatórios." />
          <Step n="4" title="Assembleias & Documentos" desc="Registre atas de debenturistas e gere relatórios automatizados." />
        </div>
      </section>

      {/* CHAMADA / PLANOS */}
      <section id="precos" className={styles.lwPricing}>
        <div className={styles.lwCard}>
          <h3>Comece hoje</h3>
          <p className={styles.lwPrice}>Planos a partir de R$ 199/mês</p>
          <p className={styles.lwNote}>Educação + Financeiro em um só sistema</p>
          <div className={styles.lwCta}>
            <Link to="/login" className={styles.lwBtn}>Criar conta</Link>
            <a href="#" className={`${styles.lwBtn} ${styles.lwBtnOutline}`}>Falar com vendas</a>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className={styles.lwFooter}>
        <span>© {new Date().getFullYear()} LiveWork</span>
        <a href="#">Termos</a>
        <a href="#">Privacidade</a>
      </footer>
    </main>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <article className={styles.lwFeature}>
      <div className={styles.lwFeatureIcon} aria-hidden>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <article className={styles.lwStep}>
      <div className={styles.lwStepBadge}>{n}</div>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </article>
  );
}
