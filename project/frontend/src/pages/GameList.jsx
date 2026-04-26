import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import AddGameModal from '../components/AddGameModal';

export default function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`/api/games`)
      .then(r => r.json())
      .then(data => { setGames(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleGameAdded = (newGame) => {
    setGames(prev => [...prev, newGame]);
    setShowModal(false);
  };

  const handleDelete = (deletedId) => {
    setGames(prev => prev.filter(g => g._id !== deletedId));
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.topbar}>
        <div style={{ textAlign: 'left' }}>      {/* ← fix căn giữa */}
          <h1 style={styles.title}>Game Library</h1>
          <p style={styles.subtitle}>Discover and explore amazing games</p>
        </div>
        <button style={styles.btnAdd} onClick={() => setShowModal(true)}>
          + Add Game
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div style={styles.centerMsg}>Loading games...</div>
      )}

      {/* EMPTY STATE */}
      {!loading && games.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🎮</div>
          <p style={styles.emptyTitle}>No games yet</p>
          <p style={styles.emptySub}>Click <strong>+ Add Game</strong> to add your first game</p>
        </div>
      )}

      {/* GRID — 4 cột cố định */}
      {!loading && games.length > 0 && (
        <div style={styles.grid}>
          {games.map(g => (
            <Link key={g._id} to={`/games/${g._id}`} style={styles.link}>
              <GameCard game={g} onDelete={handleDelete}/>
            </Link>
          ))}
        </div>
      )}

      {showModal && (
        <AddGameModal
          onClose={() => setShowModal(false)}
          onAdded={handleGameAdded}
        />
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: '2rem',
    // maxWidth: 1100,
    // margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    background: '#f7f8fc',
    minHeight: '100vh',
    textAlign: 'left',          // ← reset toàn page về left
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    textAlign: 'left',
  },
  subtitle: {
    marginTop: 6,
    color: '#666',
    textAlign: 'left',
  },
  btnAdd: {
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,              // ← không bị co lại
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',   // ← 4 cột cứng
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  centerMsg: {
    textAlign: 'center',
    marginTop: 80,
    color: '#888',
    fontSize: 16,
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 80,
    padding: '3rem',
    background: '#fff',
    borderRadius: 14,
    border: '1.5px dashed #ddd',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#333',
    margin: '0 0 8px',
  },
  emptySub: {
    color: '#888',
    fontSize: 14,
  },
};