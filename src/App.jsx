
import { useEffect, useState } from "react";
import IMAGES from "./images";

const initialNews = [
  {
    id: "sample-1",
    title: "Bienvenidos a nuestra institución educativa",
    summary: "Un espacio para aprender, crecer y construir un mejor futuro.",
    body: "Próximamente compartiremos por este medio las noticias y comunicados oficiales de nuestra comunidad educativa.",
    created_at: new Date().toISOString(),
    image_url: ""
  }
];

// ENCABEZADO
function Header() {
  return (
    <header className="header">
      <a className="brand" href="#inicio">
        <img
          src={IMAGES.logo}
          alt="Insignia de la Institución Educativa Manuel de Endiburu"
          className="brand-logo"
        />

        <div>
          <strong>MANUEL DE MENDIBURU</strong>
          <span>INSTITUCIÓN EDUCATIVA</span>
        </div>
      </a>

      <nav>
        <a href="#inicio">Inicio</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#propuesta">Propuesta educativa</a>
        <a href="#galeria">Galería</a>
        <a href="#noticias">Noticias</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}

// PANEL DE ADMINISTRACIÓN
function Admin() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    body: "",
    image_url: ""
  });
  const [message, setMessage] = useState("Cargando publicaciones…");

  async function load() {
    try {
      const res = await fetch("/api/admin/news");

      if (!res.ok) {
        throw new Error(
          "No se pudo acceder. Verifica tu sesión de Cloudflare Access."
        );
      }

      const data = await res.json();
      setNews(data.news || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function publish(e) {
    e.preventDefault();

    try {
      setMessage("Publicando…");

      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "No se pudo publicar.");
        return;
      }

      setForm({
        title: "",
        summary: "",
        body: "",
        image_url: ""
      });

      setMessage("Publicación creada correctamente.");
      await load();
    } catch {
      setMessage("Error de conexión al publicar.");
    }
  }

  async function remove(id) {
    if (!confirm("¿Eliminar esta publicación?")) return;

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setMessage("Publicación eliminada.");
        await load();
      } else {
        setMessage("No se pudo eliminar la publicación.");
      }
    } catch {
      setMessage("Error de conexión al eliminar.");
    }
  }

  return (
    <main className="admin-page">
      <div className="admin-top">
        <a href="/">← Volver al sitio</a>
        <span>Panel de administración</span>
      </div>

      <h1>Administrar noticias</h1>

      <p className="muted">
        Publica comunicados y novedades para la comunidad educativa.
      </p>

      <form className="admin-form" onSubmit={publish}>
        <label>
          Título
          <input
            required
            maxLength="160"
            value={form.title}
            onChange={e =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </label>

        <label>
          Resumen
          <input
            required
            maxLength="300"
            value={form.summary}
            onChange={e =>
              setForm({ ...form, summary: e.target.value })
            }
          />
        </label>

        <label>
          Contenido
          <textarea
            required
            rows="6"
            value={form.body}
            onChange={e =>
              setForm({ ...form, body: e.target.value })
            }
          />
        </label>

        <label>
          URL de imagen (opcional)
          <input
            type="url"
            value={form.image_url}
            onChange={e =>
              setForm({ ...form, image_url: e.target.value })
            }
            placeholder="https://..."
          />
        </label>

        <button className="button" type="submit">
          Publicar noticia
        </button>
      </form>

      {message && <p className="notice">{message}</p>}

      <h2>Publicaciones existentes</h2>

      <div className="admin-list">
        {news.map(item => (
          <article key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <small>
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString("es-PE")
                  : ""}
              </small>
            </div>

            <button
              className="delete"
              onClick={() => remove(item.id)}
            >
              Eliminar
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}

// PRESENTACIÓN PRINCIPAL
function Home() {
  const [news, setNews] = useState(initialNews);

  useEffect(() => {
    fetch("/api/news")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.news?.length) {
          setNews(data.news);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* PORTADA */}
        <section className="hero" id="inicio">
          <img
            src={IMAGES.portada}
            alt=""
            className="hero-image"
            fetchPriority="high"
          />

          <div className="hero-overlay"></div>

          <div className="hero-content">
            <span className="eyebrow">
              EDUCACIÓN · VALORES · FUTURO
            </span>

            <h1>
              Formamos hoy,
              <br />
              <em>transformamos el mañana.</em>
            </h1>

            <p>
              Bienvenidos a la Institución Educativa Manuel de Endiburu,
              una comunidad comprometida con el aprendizaje y
              el desarrollo integral.
            </p>

            <a className="button" href="#nosotros">
              Conoce nuestra institución
            </a>
          </div>

          <div className="hero-note">
            <span>01</span>
            <div>
              Una comunidad educativa
              <br />
              que inspira y acompaña
            </div>
          </div>
        </section>

        {/* NOSOTROS */}
        <section className="welcome section" id="nosotros">
          <div className="section-kicker">
            NUESTRA INSTITUCIÓN
          </div>

          <div className="welcome-grid">
            <div>
              <h2>
                Un lugar para
                <br />
                <em>aprender y crecer.</em>
              </h2>

              <img
                src={IMAGES.colegio}
                alt="Instalaciones de la institución educativa"
                className="section-image"
                loading="lazy"
              />
            </div>

            <div>
              <p className="lead">
                Creemos en una educación que brinda oportunidades,
                fortalece valores y prepara a nuestros estudiantes
                para afrontar los desafíos del futuro.
              </p>

              <p>
                Trabajamos junto a las familias y la comunidad
                para construir experiencias de aprendizaje
                significativas en un ambiente de respeto,
                participación y mejora continua.
              </p>
            </div>
          </div>
        </section>

        {/* PROPUESTA EDUCATIVA */}
        <section className="values section" id="propuesta">
          <div className="section-kicker light">
            NUESTRO COMPROMISO
          </div>

          <h2>Educación con propósito</h2>

          <div className="value-grid">
            <article>
              <span>01</span>
              <h3>Aprendizaje</h3>
              <p>
                Promovemos la curiosidad, el pensamiento crítico
                y el desarrollo de capacidades.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Valores</h3>
              <p>
                Fomentamos el respeto, la responsabilidad,
                la solidaridad y la convivencia.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Comunidad</h3>
              <p>
                Impulsamos la participación de estudiantes,
                familias y docentes.
              </p>
            </article>
          </div>
        </section>

        {/* GALERÍA */}
        <section className="gallery section" id="galeria">
          <div className="section-kicker">
            NUESTRA COMUNIDAD
          </div>

          <h2>Momentos de nuestra institución</h2>

          <p className="gallery-description">
            Conoce algunas de las actividades y experiencias
            que forman parte de nuestra comunidad educativa.
          </p>

          <div className="gallery-grid">
            <article className="gallery-item">
              <img
                src={IMAGES.estudiantes}
                alt="Estudiantes de la institución"
                loading="lazy"
              />
              <div className="gallery-caption">
                <h3>Nuestros estudiantes</h3>
              </div>
            </article>

            <article className="gallery-item">
              <img
                src={IMAGES.docentes}
                alt="Equipo docente"
                loading="lazy"
              />
              <div className="gallery-caption">
                <h3>Nuestros docentes</h3>
              </div>
            </article>

            <article className="gallery-item">
              <img
                src={IMAGES.actividades}
                alt="Actividades escolares"
                loading="lazy"
              />
              <div className="gallery-caption">
                <h3>Actividades escolares</h3>
              </div>
            </article>
          </div>
        </section>

        {/* NOTICIAS */}
        <section className="news section" id="noticias">
          <div className="news-heading">
            <div>
              <div className="section-kicker">
                ACTUALIDAD
              </div>
              <h2>Noticias y comunicados</h2>
            </div>

            <span className="news-count">
              {String(news.length).padStart(2, "0")} PUBLICACIONES
            </span>
          </div>

          <div className="news-grid">
            {news.map(item => (
              <article className="news-card" key={item.id}>
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="news-placeholder">
                    <img
                      src={IMAGES.logo}
                      alt="Insignia institucional"
                    />
                  </div>
                )}

                <div className="news-card-content">
                  <small>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("es-PE")
                      : "Institución educativa"}
                  </small>

                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <section className="contact section" id="contacto">
          <div>
            <div className="section-kicker light">
              ESTAMOS PARA ATENDERTE
            </div>

            <h2>
              Conectemos con
              <br />
              <em>nuestra comunidad.</em>
            </h2>
          </div>

          <div className="contact-info">
            <p>
              Pronto encontrarás aquí nuestros canales
              oficiales de atención.
            </p>

            <p>
              <strong>
                Institución Educativa Manuel de Endiburu
              </strong>
              <br />
              Dirección · Teléfono · Correo institucional
            </p>
          </div>
        </section>
      </main>

      {/* PIE DE PÁGINA */}
      <footer>
        <a className="brand footer-brand" href="#inicio">
          <img
            src={IMAGES.logo}
            alt="Insignia institucional"
            className="brand-logo"
          />

          <div>
            <strong>MANUEL DE ENDIBURU</strong>
            <span>INSTITUCIÓN EDUCATIVA</span>
          </div>
        </a>

        <span>
          © {new Date().getFullYear()} · Todos los derechos reservados.
        </span>

        <a href="/admin">Administración</a>
      </footer>
    </>
  );
}

// APLICACIÓN
export default function App() {
  return window.location.pathname.startsWith("/admin")
    ? <Admin />
    : <Home />;
}
