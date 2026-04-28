export default function GameCard({ game, onDelete }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`Delete "${game.name}"?`)) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/games/${game._id}`, {
        method: 'DELETE'
      });
      onDelete(game._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={s.card}>
      {/* IMAGE */}
      <div style={s.imageWrap}>
        <img src={game.imageUrl} alt={game.name} style={s.image} />
        <div style={s.imageOverlay} />
        {game.tags?.[0] && (
          <span style={s.tagPill}>{game.tags[0]}</span>
        )}
        <button style={s.deleteBtn} onClick={handleDelete} title="Delete">✕</button>
      </div>

      {/* CONTENT */}
      <div style={s.content}>
        <h3 style={s.name}>{game.name}</h3>
        <p style={s.meta}>{game.genre} · {game.releaseYear}</p>

        <div style={s.footer}>
          <span style={s.rating}>⭐ {game.rating}</span>
          <span style={s.price}>
            {game.price === 0 ? 'Free' : `$${game.price}`}
          </span>
        </div>
      </div>
    </div>
  );
}

const s = {
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    cursor: 'pointer',
  },
  imageWrap: {
    position: 'relative',
    height: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  imageOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
  },
  tagPill: {
    position: 'absolute',
    bottom: 10, left: 10,
    background: 'rgba(255,255,255,0.18)',
    backdropFilter: 'blur(6px)',
    color: '#fff',
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 9px',
    borderRadius: 20,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  deleteBtn: {
    position: 'absolute',
    top: 8, right: 8,
    background: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(4px)',
    border: 'none',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    width: 24, height: 24,
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    padding: 0,
  },
  content: {
    padding: '0.9rem 1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  name: {
    margin: 0,
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#111',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  meta: {
    margin: 0,
    fontSize: 12,
    color: '#999',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1px solid #f2f2f2',
  },
  rating: {
    fontSize: 13,
    fontWeight: 600,
    color: '#444',
  },
  price: {
    fontSize: 13,
    fontWeight: 700,
    color: '#1a1a1a',
  },
};