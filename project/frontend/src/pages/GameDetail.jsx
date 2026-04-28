import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`/api/games/${id}`)
      .then(r => r.json())
      .then(setGame);
  }, [id]);

  if (!game) return (
    <div style={styles.loadingWrap}>
      <div style={styles.loadingSpinner} />
      <p style={styles.loadingText}>Loading...</p>
    </div>
  );

  const embedUrl = getYouTubeEmbedUrl(game.trailerUrl);

  return (
    <div style={styles.page}>

      {/* BACK BUTTON */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <img src={game.imageUrl} alt={game.name} style={styles.heroImage} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.genreBadge}>{game.genre}</div>
          <h1 style={styles.heroTitle}>{game.name}</h1>
          <p style={styles.heroMeta}>
            {game.developer} &nbsp;·&nbsp; {game.releaseYear} &nbsp;·&nbsp;
            <span style={styles.rating}>⭐ {game.rating}/10</span>
          </p>
        </div>
      </div>

      {/* BODY */}
      <div style={styles.body}>

        {/* LEFT COLUMN */}
        <div style={styles.left}>

          {/* DESCRIPTION */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>About</h2>
            {game.description?.map((line, i) => (
              <p key={i} style={styles.descLine}>{line}</p>
            ))}
          </section>

          {/* TRAILER */}
          {embedUrl && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Trailer</h2>
              <div style={styles.videoWrap}>
                <iframe
                  src={embedUrl}
                  style={styles.iframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Game Trailer"
                />
              </div>
            </section>
          )}

          {/* SYSTEM REQUIREMENTS */}
          {(game.systemRequirements?.minimum || game.systemRequirements?.recommended) && (
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>System Requirements</h2>
              <div style={styles.reqGrid}>
                <div style={styles.reqBox}>
                  <p style={styles.reqLabel}>Minimum</p>
                  <p style={styles.reqText}>{game.systemRequirements.minimum || '—'}</p>
                </div>
                <div style={styles.reqBox}>
                  <p style={styles.reqLabel}>Recommended</p>
                  <p style={styles.reqText}>{game.systemRequirements.recommended || '—'}</p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside style={styles.sidebar}>

          {/* PRICE CARD */}
          <div style={styles.priceCard}>
            <p style={styles.priceLabel}>Price</p>
            <p style={styles.priceValue}>
              {game.price === 0 ? 'Free to Play' : `$${game.price}`}
            </p>
          </div>

          {/* INFO CARD */}
          <div style={styles.infoCard}>
            {[
              { label: 'Developer', value: game.developer },
              { label: 'Publisher', value: game.publisher },
              { label: 'Release Year', value: game.releaseYear },
              { label: 'Rating', value: game.rating ? `${game.rating} / 10` : null },
            ].filter(r => r.value).map(({ label, value }) => (
              <div key={label} style={styles.infoRow}>
                <span style={styles.infoLabel}>{label}</span>
                <span style={styles.infoValue}>{value}</span>
              </div>
            ))}
          </div>

          {/* PLATFORMS */}
          {game.platforms?.length > 0 && (
            <div style={styles.infoCard}>
              <p style={styles.cardHeading}>Platforms</p>
              <div style={styles.badgeWrap}>
                {game.platforms.map((p, i) => (
                  <span key={i} style={styles.platformBadge}>{p}</span>
                ))}
              </div>
            </div>
          )}

          {/* TAGS */}
          {game.tags?.length > 0 && (
            <div style={styles.infoCard}>
              <p style={styles.cardHeading}>Tags</p>
              <div style={styles.badgeWrap}>
                {game.tags.map((t, i) => (
                  <span key={i} style={styles.tagBadge}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    background: '#f5f5f7',
    minHeight: '100vh',
    paddingBottom: '3rem',
  },
  loadingWrap: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    height: '100vh', gap: 12,
  },
  loadingSpinner: {
    width: 32, height: 32, borderRadius: '50%',
    border: '3px solid #e0e0e0',
    borderTopColor: '#1a1a1a',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: { color: '#888', fontSize: 14 },
  backBtn: {
    position: 'absolute',
    top: 20, left: 24,
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 8,
    padding: '6px 14px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    zIndex: 10,
  },
  hero: {
    position: 'relative',
    height: 360,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%', height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
  },
  heroContent: {
    position: 'absolute', bottom: 28, left: 32, right: 32,
  },
  genreBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.18)',
    backdropFilter: 'blur(6px)',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: 20,
    marginBottom: 8,
  },
  heroTitle: {
    margin: 0, color: '#fff',
    fontSize: '2.2rem', fontWeight: 700,
    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
  },
  heroMeta: {
    margin: '6px 0 0',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  rating: {
    color: '#ffd700',
  },
  body: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '2rem 1.5rem 0',
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '2rem',
    alignItems: 'start',
  },
  left: {},
  section: {
    background: '#fff',
    borderRadius: 14,
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  sectionTitle: {
    margin: '0 0 1rem',
    fontSize: '1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#888',
  },
  descLine: {
    margin: '0 0 10px',
    lineHeight: 1.75,
    color: '#333',
    fontSize: 15,
  },
  videoWrap: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    borderRadius: 10,
    overflow: 'hidden',
    background: '#000',
  },
  iframe: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    border: 'none',
  },
  reqGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14,
  },
  reqBox: {
    background: '#f7f7f7',
    borderRadius: 10,
    padding: '14px 16px',
  },
  reqLabel: {
    margin: '0 0 6px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#888',
  },
  reqText: {
    margin: 0,
    fontSize: 13,
    color: '#444',
    lineHeight: 1.6,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    position: 'sticky',
    top: 20,
  },
  priceCard: {
    background: '#1a1a1a',
    borderRadius: 14,
    padding: '1.25rem 1.5rem',
    textAlign: 'center',
  },
  priceLabel: {
    margin: '0 0 4px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.5)',
  },
  priceValue: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#fff',
  },
  infoCard: {
    background: '#fff',
    borderRadius: 14,
    padding: '1rem 1.25rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f2f2f2',
    fontSize: 13,
  },
  infoLabel: {
    color: '#999',
    fontWeight: 500,
  },
  infoValue: {
    color: '#222',
    fontWeight: 600,
    textAlign: 'right',
    maxWidth: '55%',
  },
  cardHeading: {
    margin: '0 0 10px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#888',
  },
  badgeWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  platformBadge: {
    background: '#1a1a1a',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 20,
  },
  tagBadge: {
    background: '#f0f0f0',
    color: '#444',
    fontSize: 12,
    padding: '4px 10px',
    borderRadius: 20,
  },
};