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
    <div style={styles.card}>
      <img src={game.imageUrl} alt={game.name} style={styles.image} />
      <div style={styles.content}>
        <div style={styles.topRow}>
          <h3 style={styles.name}>{game.name}</h3>
          {/* ← icon xóa nhỏ góc trên phải */}
          <button style={styles.deleteBtn} onClick={handleDelete} title="Delete">
            🗑
          </button>
        </div>
        <p style={styles.meta}>{game.genre} • {game.releaseYear}</p>
        <p style={styles.rating}>⭐ {game.rating}/10</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 300,        // ← tăng lên để card dọc hơn
    objectFit: 'cover',
  },
  content: {
    padding: '0.85rem 1rem',
    flex: 1,
  },
  topRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    margin: 0,
    fontSize: '1rem',
    flex: 1,
  },
  meta: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  rating: {
    marginTop: 8,
    fontSize: 13,
    color: '#444',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    padding: '2px 4px',
    borderRadius: 6,
    color: '#aaa',
    flexShrink: 0,
    lineHeight: 1,
    transition: 'color 0.15s',
  }
};