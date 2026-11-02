
import { useState } from "react";
import {
  Menu, X, Home, School, BookOpen, Newspaper,
  Images, MapPin, Phone, Mail, ChevronRight,
  CalendarDays, GraduationCap, ArrowUpRight
} from "lucide-react";
import "./App.css";

const noticias = [
  {
    fecha: "01 NOV 2026",
    categoria: "Institucional",
    titulo: "Bienvenidos a nuestra comunidad educativa",
    descripcion:
      "Conoce nuestra institución, sus actividades y el compromiso con la formación de nuestros estudiantes.",
    imagen:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900"
  },
  {
    fecha: "01 NOV 2026",
    categoria: "Educación",
    titulo: "Aprendizaje y formación integral",
    descripcion:
      "Promovemos experiencias educativas que fortalecen los conocimientos, habilidades y valores.",
    imagen:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900"
  },
  {
    fecha: "01 NOV 2026",
    categoria: "Comunidad",
    titulo: "Una comunidad que crece unida",
    descripcion:
      "La participación de estudiantes, docentes y familias fortalece nuestra identidad institucional.",
    imagen:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900"
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarMenu = () => setMenuOpen(false);

  const enlaces = [
    ["Inicio", "#inicio"],
    ["Nosotros", "#nosotros"],
    ["Académico", "#academico"],
    ["Noticias", "#noticias"],
    ["Galería", "#galeria"],
    ["Contacto", "#contacto"]
  ];

  return (
    <>
      <header className="header">
        <div className="container nav-container">
          <a href="#inicio" className="brand" onClick={cerrarMenu}>
            <img
              src="/insignia.png"
              alt="Insignia Manuel de Mendiburu"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div>
              <strong>MANUEL DE MENDIBURU</strong>
              <span>INSTITUCIÓN EDUCATIVA N.º 42223</span>
            </div>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={menuOpen ? "nav active" : "nav"}>
            {enlaces.map(([nombre, url]) => (
              <a key={url} href={url} onClick={cerrarMenu}>
                {nombre}
              </a>
            ))}
            <a href="#contacto" className="nav-button" onClick={cerrarMenu}>
              Contáctanos <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <div className="hero-label">
              <span></span> EDUCACIÓN • VALORES • FUTURO
            </div>

            <h1>
              Formamos el presente,
              <br />
              <span>construimos el futuro.</span>
            </h1>

            <p>
              Bienvenidos a la Institución Educativa N.º 42223
              Manuel de Mendiburu, un espacio dedicado al
              aprendizaje, la formación y el desarrollo integral.
            </p>

            <div className="hero-actions">
              <a href="#nosotros" className="btn-primary">
                Conoce nuestra institución <ChevronRight size={19} />
              </a>
              <a href="#noticias" className="btn-outline">
                Explorar noticias
              </a>
            </div>

            <div className="hero-quote">
              “Un mendiburiano jamás huye a un desafío inteligente”
            </div>
          </div>

          <div className="hero-bottom">
            <span>INSTITUCIÓN EDUCATIVA MANUEL DE MENDIBURU</span>
            <span>TACNA · PERÚ</span>
          </div>
        </section>

        <section className="quick-section">
          <div className="container quick-grid">
            <a href="#nosotros" className="quick-card">
              <div className="quick-icon"><School /></div>
              <div>
                <strong>Nuestra institución</strong>
                <span>Conoce quiénes somos</span>
              </div>
              <ChevronRight />
            </a>

            <a href="#academico" className="quick-card">
              <div className="quick-icon"><BookOpen /></div>
              <div>
                <strong>Área académica</strong>
                <span>Información educativa</span>
              </div>
              <ChevronRight />
            </a>

            <a href="#noticias" className="quick-card">
              <div className="quick-icon"><Newspaper /></div>
              <div>
                <strong>Comunicados</strong>
                <span>Noticias y novedades</span>
              </div>
              <ChevronRight />
            </a>
          </div>
        </section>

        <section className="about section" id="nosotros">
          <div className="container about-grid">
            <div className="about-image">
              <img
                src="/colegio.jpg"
                alt="Instalaciones de la institución educativa"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000";
                }}
              />
              <div className="image-caption">
                <GraduationCap size={25} />
                <span>Educación para el futuro</span>
              </div>
            </div>

            <div className="about-content">
              <span className="section-tag">CONÓCENOS</span>
              <h2>Una institución comprometida con la educación</h2>
              <p>
                La Institución Educativa Manuel de Mendiburu
                promueve una educación orientada al aprendizaje,
                la convivencia, el respeto y la formación de
                ciudadanos responsables.
              </p>

              <div className="about-points">
                <div>
                  <span className="point-icon">01</span>
                  <div>
                    <strong>Misión</strong>
                    <p>
                      Brindar una formación integral basada en
                      conocimientos, valores y responsabilidad.
                    </p>
                  </div>
                </div>

                <div>
                  <span className="point-icon">02</span>
                  <div>
                    <strong>Visión</strong>
                    <p>
                      Ser una comunidad educativa que promueva
                      el desarrollo y las oportunidades de sus estudiantes.
                    </p>
                  </div>
                </div>
              </div>

              <a href="#contacto" className="text-link">
                Más información <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="academic section" id="academico">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">NUESTRA COMUNIDAD</span>
              <h2>Espacios para aprender y crecer</h2>
              <p>
                Una educación que integra conocimientos,
                participación y desarrollo personal.
              </p>
            </div>

            <div className="academic-grid">
              <article className="academic-card">
                <BookOpen />
                <h3>Aprendizaje</h3>
                <p>
                  Promovemos el desarrollo de competencias y
                  conocimientos para la vida.
                </p>
              </article>

              <article className="academic-card">
                <GraduationCap />
                <h3>Formación integral</h3>
                <p>
                  Impulsamos valores, creatividad y pensamiento crítico.
                </p>
              </article>

              <article className="academic-card">
                <School />
                <h3>Comunidad educativa</h3>
                <p>
                  Fortalecemos el trabajo conjunto entre estudiantes,
                  docentes y familias.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="news section" id="noticias">
          <div className="container">
            <div className="news-heading">
              <div>
                <span className="section-tag">ACTUALIDAD</span>
                <h2>Noticias y novedades</h2>
                <p>Conoce las actividades de nuestra institución.</p>
              </div>
              <a href="#contacto" className="text-link">
                Información institucional <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="news-grid">
              {noticias.map((noticia, index) => (
                <article className="news-card" key={index}>
                  <div className="news-image">
                    <img src={noticia.imagen} alt={noticia.titulo} />
                  </div>
                  <div className="news-body">
                    <div className="news-meta">
                      <span>{noticia.categoria}</span>
                      <small>{noticia.fecha}</small>
                    </div>
                    <h3>{noticia.titulo}</h3>
                    <p>{noticia.descripcion}</p>
                    <a href="#contacto">
                      Más información <ChevronRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery section" id="galeria">
          <div className="container">
            <div className="section-heading">
              <span className="section-tag">NUESTROS RECUERDOS</span>
              <h2>Galería institucional</h2>
              <p>
                Momentos y experiencias de nuestra comunidad educativa.
              </p>
            </div>
            <div className="gallery-grid">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900" alt="Actividad escolar" />
              <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900" alt="Estudiantes aprendiendo" />
              <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900" alt="Comunidad educativa" />
            </div>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="container contact-content">
            <div>
              <span className="section-tag">ESTAMOS PARA INFORMARTE</span>
              <h2>Conectemos con nuestra comunidad</h2>
              <p>
                Para consultas e información institucional,
                puedes comunicarte con nuestra institución.
              </p>
            </div>
            <div className="contact-items">
              <div><MapPin /> <span>Tacna, Perú</span></div>
              <div><Mail /> <span>Correo institucional por confirmar</span></div>
              <div><Phone /> <span>Teléfono institucional por confirmar</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <strong>MANUEL DE MENDIBURU</strong>
            <span>Institución Educativa N.º 42223</span>
          </div>
          <p>© {new Date().getFullYear()} Manuel de Mendiburu. Todos los derechos reservados.</p>
          <a href="#inicio"><Home size={17} /> Volver arriba</a>
        </div>
      </footer>
    </>
  );
}

export default App;
