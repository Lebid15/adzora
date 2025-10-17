import { useCallback, useEffect, useState } from 'react'
import { fetchHomepage } from './api/client'
import './App.css'

// Fixed navigation links - edit directly in code
const FIXED_NAV_LINKS = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '#about' },
  { label: 'Services', url: '#services' },
  { label: 'Contact', url: '#contact' },
]

// Fixed footer text - edit directly in code
const FIXED_FOOTER_TEXT = '© 2025 Adzora. All rights reserved.'

function App() {
  const [state, setState] = useState({ data: null, loading: true, error: null })

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

  const { site, social, featured_video: featuredVideo, gallery } = state.data
  const galleryItems = Array.isArray(gallery) ? gallery : []
  const socialLinks = Array.isArray(social)
    ? [...social].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="brand">
          {site.logo_url && <img src={site.logo_url} alt={`${site.site_name} logo`} />}
          <div className="brand-copy">
            <span className="name">{site.site_name}</span>
            {site.tagline && <span className="tagline">{site.tagline}</span>}
          </div>
        </div>
        <nav className="site-nav" aria-label="Primary">
          {FIXED_NAV_LINKS.map((link) => (
            <a key={`${link.label}-${link.url}`} href={link.url}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <section className="hero">
          <div className="hero__content">
            <h1>Featured Showcase</h1>
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
        <p>{FIXED_FOOTER_TEXT}</p>
      </footer>
    </div>
  )
}

export default App
