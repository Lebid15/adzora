import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchHomepage } from './api/client'
import './App.css'

const FALLBACK_THEME = {
  light: {
    background: '#ffffff',
    surface: '#f3f4f6',
    text: '#111827',
    accent: '#f97316',
  },
  dark: {
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    accent: '#38bdf8',
  },
  default: 'light',
}

function applyPalette(mode, palette) {
  const root = document.documentElement
  root.dataset.theme = mode
  const selection = palette[mode] || FALLBACK_THEME[mode]
  if (!selection) return
  root.style.setProperty('--color-background', selection.background)
  root.style.setProperty('--color-surface', selection.surface)
  root.style.setProperty('--color-text', selection.text)
  root.style.setProperty('--color-accent', selection.accent)
}

function App() {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('adzora-theme') || 'light')

  const loadHomepage = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      const data = await fetchHomepage()
      setState({ data, loading: false, error: null })
    } catch (error) {
      console.error(error)
      setState({ data: null, loading: false, error: error.message || 'Failed to load content.' })
    }
  }, [])

  useEffect(() => {
    loadHomepage()
  }, [loadHomepage])

  const palette = useMemo(() => state.data?.theme?.palette || FALLBACK_THEME, [state.data])

  useEffect(() => {
    const defaultMode = state.data?.theme?.default_mode || palette.default || 'light'
    const modeToApply = themeMode || defaultMode
    applyPalette(modeToApply, palette)
  }, [palette, state.data, themeMode])

  const toggleTheme = () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(nextMode)
    localStorage.setItem('adzora-theme', nextMode)
    applyPalette(nextMode, palette)
  }

  if (state.loading) {
    return (
      <div className="page-shell loading">
        <p>Loading Adzora experience...</p>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="page-shell error">
        <p>{state.error}</p>
        <button type="button" onClick={loadHomepage}>Try again</button>
      </div>
    )
  }

  const { site, navigation, social, featured_video: featuredVideo, gallery } = state.data
  const navLinks = Array.isArray(navigation)
    ? [...navigation].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []
  const galleryItems = Array.isArray(gallery) ? gallery : []
  const socialLinks = Array.isArray(social)
    ? [...social].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []
  const themeLabel = themeMode === 'light' ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <div className={`page-shell theme-${themeMode}`}>
      <header className="site-header">
        <div className="brand">
          {site.logo_url && <img src={site.logo_url} alt={`${site.site_name} logo`} />}
          <div className="brand-copy">
            <span className="name">{site.site_name}</span>
            {site.tagline && <span className="tagline">{site.tagline}</span>}
          </div>
        </div>
        <nav className="site-nav" aria-label="Primary">
          {navLinks.length ? (
            navLinks.map((link) => (
              <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))
          ) : (
            <span className="placeholder">Add navigation links in the admin panel.</span>
          )}
        </nav>
        <button
          type="button"
          className="theme-toggle"
          aria-label={themeLabel}
          onClick={toggleTheme}
        >
          <span aria-hidden="true">{themeMode === 'light' ? '🌙' : '☀️'}</span>
        </button>
      </header>

      <main className="site-main">
        <section className="hero">
          <div className="hero__content">
            <h1>{site.featured_video_heading}</h1>
            <p>
              {featuredVideo?.description ||
                "Adzora crafts immersive media activations blending film and interactive storytelling."}
            </p>
          </div>
          <div className="hero__media">
            {featuredVideo ? (
              featuredVideo.embed_url ? (
                <div className="video-embed">
                  <iframe
                    src={featuredVideo.embed_url}
                    title={featuredVideo.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : featuredVideo.video_url ? (
                <video controls poster={featuredVideo.thumbnail_url || undefined}>
                  <source src={featuredVideo.video_url} />
                  Your browser does not support HTML5 video.
                </video>
              ) : (
                <div className="video-empty">
                  <p>Upload a video file or provide an embed URL for the featured video.</p>
                </div>
              )
            ) : (
              <div className="video-empty">
                <p>No featured video yet. Flag one as featured from the media library.</p>
              </div>
            )}
          </div>
        </section>

        <section className="gallery" aria-labelledby="gallery-heading">
          <div className="gallery__header">
            <h2 id="gallery-heading">Recent visuals</h2>
            <p>Highlight posters, visuals, and infographics from your creative archive.</p>
          </div>
          <div className="gallery__grid">
            {galleryItems.length ? (
              galleryItems.map((asset) => (
                <article className="gallery-card" key={asset.id}>
                  <div className="gallery-card__media">
                    <img src={asset.file_url} alt={asset.title} loading="lazy" />
                  </div>
                  <div className="gallery-card__body">
                    <h3>{asset.title}</h3>
                    {asset.category && <span className="pill">{asset.category.name}</span>}
                    {asset.tags?.length ? (
                      <div className="tags">
                        {asset.tags.map((tag) => tag.name).join(' / ')}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))
            ) : (
              <div className="gallery-empty">
                <p>Upload images or posters from the media library to populate this gallery.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="social-links" aria-label="Social media">
          {socialLinks.length ? (
            socialLinks.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noreferrer noopener">
                <span aria-hidden="true">{link.platform.slice(0, 1).toUpperCase()}</span>
                <span className="sr-only">{link.platform}</span>
              </a>
            ))
          ) : (
            <span className="placeholder">Add social links from the admin panel.</span>
          )}
        </div>
        <p>{site.footer_text}</p>
      </footer>
    </div>
  )
}

export default App
