import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, User, Search, Share2, Copy, Check, Mail, ChevronDown, List } from 'lucide-react';
import { Link } from '../../App';
import { SEOHead, getBlogListSchemas, getArticleSchema } from '../seo';
import { BLOG_POSTS } from '../../data/blogPosts';

// --- Utilidades ---
const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const extractH2s = (content) => {
  const headings = [];
  content.split('\n').forEach((line) => {
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      const text = line.replace('## ', '').trim();
      headings.push({ text, id: slugify(text) });
    }
  });
  return headings;
};

// --- Componente de Tabla de Contenidos ---
const TableOfContents = ({ headings }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length <= 5) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 font-display font-bold text-noir-900 dark:text-cream-50"
        >
          <span className="flex items-center gap-2">
            <List className="w-5 h-5 text-lime-500" />
            Tabla de contenidos
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <nav className="border-3 border-t-0 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 p-4">
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-noir-600 dark:text-noir-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 p-5">
          <h4 className="font-display font-bold text-noir-900 dark:text-cream-50 mb-4 flex items-center gap-2">
            <List className="w-4 h-4 text-lime-500" />
            Contenidos
          </h4>
          <nav>
            <ul className="space-y-2">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="text-sm text-noir-600 dark:text-noir-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors block py-0.5"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

// --- Botones de compartir ---
const ShareButtons = ({ title, postId }) => {
  const [copied, setCopied] = useState(false);
  const url = `https://mgmautomations.es/blog/${postId}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-noir-500 text-xs mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Compartir:
      </span>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 border-2 border-noir-300 dark:border-noir-600 text-noir-500 hover:border-green-500 hover:text-green-500 transition-colors"
        aria-label="Compartir en WhatsApp"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 border-2 border-noir-300 dark:border-noir-600 text-noir-500 hover:border-sky-500 hover:text-sky-500 transition-colors"
        aria-label="Compartir en X"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 border-2 border-noir-300 dark:border-noir-600 text-noir-500 hover:border-blue-600 hover:text-blue-600 transition-colors"
        aria-label="Compartir en LinkedIn"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <button
        onClick={handleCopy}
        className={`p-1.5 border-2 transition-colors ${copied ? 'border-lime-500 text-lime-500' : 'border-noir-300 dark:border-noir-600 text-noir-500 hover:border-lime-500 hover:text-lime-500'}`}
        aria-label="Copiar enlace"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

// --- Posts Relacionados ---
const RelatedPosts = ({ currentPost }) => {
  const related = useMemo(() => {
    const sameCategory = BLOG_POSTS.filter(
      (p) => p.category === currentPost.category && p.id !== currentPost.id
    );
    const others = BLOG_POSTS.filter(
      (p) => p.category !== currentPost.category && p.id !== currentPost.id
    );
    const result = [...sameCategory];
    if (result.length < 3) {
      result.push(...others.slice(0, 3 - result.length));
    }
    return result.slice(0, 3);
  }, [currentPost]);

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-6">
        Artículos Relacionados
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="group border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 p-5 hover:border-lime-400 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-3.5 h-3.5 text-lime-500" />
              <span className="text-xs font-bold uppercase text-noir-500">
                {post.category}
              </span>
            </div>
            <h4 className="text-base font-display font-bold text-noir-900 dark:text-cream-50 mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors line-clamp-2">
              {post.title}
            </h4>
            <p className="text-noir-600 dark:text-noir-400 text-sm line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-noir-500 mt-3">
              <span>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// --- Newsletter CTA ---
const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setError('');
    try {
      const { subscribeNewsletter } = await import('../../utils/api');
      await subscribeNewsletter(email);
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Error al suscribirse. Inténtalo de nuevo.');
    }
  };

  return (
    <section className="mb-12 border-3 border-lime-400 bg-white dark:bg-noir-900 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50 mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5 text-lime-500" />
            Recibe nuestros artículos en tu email
          </h3>
          <p className="text-noir-600 dark:text-noir-400 text-sm">
            Un email a la semana con guías prácticas para digitalizar tu negocio. Sin spam, cancela cuando quieras.
          </p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto">
          {submitted ? (
            <p className="text-lime-600 dark:text-lime-400 font-bold flex items-center gap-2">
              <Check className="w-5 h-5" />
              ¡Suscrito correctamente!
            </p>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 md:w-56 px-4 py-3 border-3 border-noir-200 dark:border-noir-700 bg-cream-50 dark:bg-noir-800 text-noir-900 dark:text-cream-50 focus:border-lime-400 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(163,230,53,0.3)] transition-all text-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-noir-900 dark:bg-lime-400 text-lime-400 dark:text-noir-900 font-bold border-3 border-noir-900 dark:border-lime-400 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all text-sm whitespace-nowrap"
                >
                  Suscribirse
                </button>
              </form>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Componente para la lista de posts
const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(
    () => ['Todos', ...new Set(BLOG_POSTS.map((p) => p.category))],
    []
  );

  const filteredPosts = useMemo(() => {
    let posts = BLOG_POSTS;
    if (activeCategory !== 'Todos') {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const featuredPost = BLOG_POSTS.find((post) => post.featured);

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-noir-950">
      <SEOHead
        title="Blog - Desarrollo Web, Automatización e IA | M.G.M Automations"
        description="Recursos, guías y casos de estudio sobre desarrollo web, automatización de negocios e inteligencia artificial para PYMEs. Por M.G.M Automations."
        canonical="/blog"
        ogTitle="Blog - M.G.M Automations"
        ogDescription="Artículos sobre desarrollo web, automatización e IA para negocios. Guías prácticas con ejemplos reales."
        ogImage="https://mgmautomations.es/og-image.jpg"
        schemas={getBlogListSchemas()}
      />
      {/* Header */}
      <header className="bg-noir-900 dark:bg-noir-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cream-50 mb-4">
            Blog
          </h1>
          <p className="text-xl text-noir-400 max-w-2xl mb-8">
            Recursos, guías y casos de estudio sobre desarrollo web y automatización de negocios.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-noir-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artículos..."
              className="w-full pl-11 pr-4 py-3 border-3 border-noir-700 bg-noir-800 text-cream-50 placeholder-noir-500 focus:border-lime-400 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(163,230,53,0.3)] transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="mb-10 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-bold border-3 transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-lime-400 text-noir-900 border-noir-900 dark:border-lime-400'
                    : 'bg-white dark:bg-noir-900 text-noir-600 dark:text-noir-400 border-noir-200 dark:border-noir-700 hover:border-noir-400 dark:hover:border-noir-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (only if no filter/search active) */}
        {featuredPost && activeCategory === 'Todos' && !searchQuery.trim() && (
          <section className="mb-12">
            <Link
              to={`/blog/${featuredPost.id}`}
              className="group block border-3 border-noir-900 dark:border-noir-700 bg-white dark:bg-noir-900 overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal dark:hover:shadow-brutal-lime transition-all"
            >
              <div className="grid md:grid-cols-2">
                {featuredPost.image && (
                  <div className="aspect-video md:aspect-auto bg-noir-200 dark:bg-noir-800">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-lime-400 text-noir-900 text-xs font-bold uppercase">
                      Destacado
                    </span>
                    <span className="px-3 py-1 bg-noir-100 dark:bg-noir-800 text-noir-600 dark:text-noir-400 text-xs font-bold uppercase">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-noir-600 dark:text-noir-400 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-noir-500">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Newsletter CTA (only on unfiltered view) */}
        {activeCategory === 'Todos' && !searchQuery.trim() && <NewsletterCTA />}

        {/* Posts grid */}
        <section>
          <h2 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-8">
            {activeCategory === 'Todos' && !searchQuery.trim()
              ? 'Todos los artículos'
              : searchQuery.trim()
              ? `Resultados para "${searchQuery}"`
              : activeCategory}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900">
              <Search className="w-12 h-12 text-noir-300 dark:text-noir-600 mx-auto mb-4" />
              <p className="text-noir-600 dark:text-noir-400 text-lg font-display font-bold mb-2">
                No se encontraron artículos
              </p>
              <p className="text-noir-500 text-sm">
                Prueba con otros términos de búsqueda o selecciona otra categoría.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group border-3 border-noir-200 dark:border-noir-700 bg-white dark:bg-noir-900 p-6 hover:border-lime-400 transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-lime-500" />
                    <span className="text-xs font-bold uppercase text-noir-500">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-noir-900 dark:text-cream-50 mb-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-noir-600 dark:text-noir-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-noir-500">
                    <span>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-noir-900 py-8 px-4 text-center">
        <p className="text-noir-500 text-sm">
          © {new Date().getFullYear()} M.G.M Automations. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

// Componente para un post individual
const BlogPost = ({ postId }) => {
  const post = BLOG_POSTS.find((p) => p.id === postId);

  const headings = useMemo(() => (post ? extractH2s(post.content) : []), [post]);
  const showTOC = headings.length > 5;

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-noir-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
            Artículo no encontrado
          </h1>
          <Link to="/blog" className="text-lime-600 dark:text-lime-400 hover:underline">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-noir-950">
      <SEOHead
        title={`${post.title} | Blog M.G.M Automations`}
        description={post.excerpt}
        canonical={`/blog/${post.id}`}
        ogTitle={post.title}
        ogDescription={post.excerpt}
        ogImage={post.image ? `https://mgmautomations.es${post.image}` : 'https://mgmautomations.es/og-image.jpg'}
        ogType="article"
        schemas={getArticleSchema(post)}
      />
      {/* Header */}
      <header className="bg-noir-900 dark:bg-noir-900 py-12 px-4">
        <div className={`mx-auto ${showTOC ? 'max-w-5xl' : 'max-w-4xl'}`}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-lime-400 text-noir-900 text-xs font-bold uppercase">
              {post.category}
            </span>
            <span className="flex items-center gap-2 text-sm text-noir-400">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-cream-50 mb-4">
            {post.title}
          </h1>
          {/* Author byline */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center border-2 border-lime-400">
              <User className="w-5 h-5 text-noir-900" />
            </div>
            <div>
              <p className="text-cream-50 font-semibold text-sm">{post.author?.name || 'Manuel Gregorio'}</p>
              <p className="text-noir-400 text-xs">{post.author?.role || 'Founder de M.G.M Automations'} · {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          {/* Share buttons */}
          <ShareButtons title={post.title} postId={post.id} />
        </div>
      </header>

      {/* Content */}
      <main className={`mx-auto px-4 py-12 ${showTOC ? 'max-w-5xl' : 'max-w-4xl'}`}>
        {/* Mobile TOC */}
        {showTOC && <TableOfContents headings={headings} />}

        <div className={showTOC ? 'grid lg:grid-cols-[1fr_250px] gap-8' : ''}>
          <div>
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:text-noir-900 dark:prose-headings:text-cream-50 prose-p:text-noir-600 dark:prose-p:text-noir-400 prose-li:text-noir-600 dark:prose-li:text-noir-400 prose-strong:text-noir-900 dark:prose-strong:text-cream-50 prose-a:text-lime-600 dark:prose-a:text-lime-400">
              {post.content.split('\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  const text = paragraph.replace('## ', '');
                  return <h2 key={idx} id={slugify(text)} className="text-2xl font-display font-bold mt-12 mb-4">{text}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-display font-bold mt-8 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- **')) {
                  const [label, ...rest] = paragraph.replace('- **', '').split(':**');
                  return (
                    <div key={idx} className="flex gap-2 my-2">
                      <span className="text-lime-500">•</span>
                      <span><strong className="text-noir-900 dark:text-cream-50">{label}:</strong> {rest.join(':**')}</span>
                    </div>
                  );
                }
                if (paragraph.startsWith('**')) {
                  const [label, ...rest] = paragraph.replace('**', '').split(':**');
                  return (
                    <p key={idx} className="my-4">
                      <strong className="text-noir-900 dark:text-cream-50">{label}:</strong> {rest.join(':**').replace('**', '')}
                    </p>
                  );
                }
                if (paragraph.trim() === '') return null;
                return <p key={idx} className="my-4">{paragraph}</p>;
              })}
            </article>

            {/* Related Posts */}
            <RelatedPosts currentPost={post} />

            {/* CTA */}
            <div className="mt-16 p-8 border-3 border-lime-400 bg-lime-50 dark:bg-lime-900/20">
              <h3 className="text-2xl font-display font-bold text-noir-900 dark:text-cream-50 mb-4">
                ¿Te ha resultado útil?
              </h3>
              <p className="text-noir-600 dark:text-noir-400 mb-6">
                Si estás pensando en un proyecto similar, estaremos encantados de ayudarte.
              </p>
              <Link
                to="/#contacto"
                className="inline-flex items-center gap-2 bg-noir-900 text-lime-400 px-6 py-4 font-bold border-3 border-noir-900 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal transition-all"
              >
                Contactar
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Desktop TOC sidebar */}
          {showTOC && <TableOfContents headings={headings} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-noir-900 py-8 px-4 text-center">
        <p className="text-noir-500 text-sm">
          © {new Date().getFullYear()} M.G.M Automations. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

// Componente principal del Blog
const Blog = ({ postId }) => {
  if (postId) {
    return <BlogPost postId={postId} />;
  }
  return <BlogList />;
};

export { BLOG_POSTS };
export default Blog;
