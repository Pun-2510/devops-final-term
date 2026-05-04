import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import AddGameModal from '../components/AddGameModal';

export default function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  useEffect(() => {
    fetch(`/api/games`)
      .then(r => r.json())
      .then(data => { setGames(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const genres = ['All', ...new Set(games.map(g => g.genre).filter(Boolean))];

  const filtered = games.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchGenre = activeGenre === 'All' || g.genre === activeGenre;
    return matchSearch && matchGenre;
  });

  const handleGameAdded = (newGame) => {
    setGames(prev => [...prev, newGame]);
    setShowModal(false);
  };

  const handleDelete = (deletedId) => {
    setGames(prev => prev.filter(g => g._id !== deletedId));
  };

  return (
    <div style={s.page}>

      {/* TOPBAR */}
      <div style={s.topbar}>
        <div>
          <h1 style={s.title}>Game Reviews Hub</h1>
          <p style={s.subtitle}>{games.length} games in your collection</p>
        </div>
        <button style={s.btnAdd} onClick={() => setShowModal(true)}>
          + Add Game
        </button>
      </div>

      {/* SEARCH + FILTER */}
      {!loading && games.length > 0 && (
        <div style={s.toolbar}>
          <div style={s.searchWrap}>
            <span style={s.searchIcon}>🔍</span>
            <input
              style={s.searchInput}
              placeholder="Search games.."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button style={s.clearBtn} onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <div style={s.genres}>
            {genres.map(g => (
              <button
                key={g}
                style={{ ...s.genreBtn, ...(activeGenre === g ? s.genreBtnActive : {}) }}
                onClick={() => setActiveGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={s.centerMsg}>
          <div style={s.spinner} />
          <p style={{ color: '#888', marginTop: 12 }}>Loading games...</p>
        </div>
      )}

      {/* EMPTY COLLECTION */}
      {!loading && games.length === 0 && (
        <div style={s.emptyState}>
          <div style={s.emptyIcon}>🎮</div>
          <p style={s.emptyTitle}>No games yet</p>
          <p style={s.emptySub}>Click <strong>+ Add Game</strong> to add your first game</p>
          <button style={s.emptyBtn} onClick={() => setShowModal(true)}>+ Add Game</button>
        </div>
      )}

      {/* NO SEARCH RESULTS */}
      {!loading && games.length > 0 && filtered.length === 0 && (
        <div style={s.emptyState}>
          <div style={s.emptyIcon}>🔍</div>
          <p style={s.emptyTitle}>No results found</p>
          <p style={s.emptySub}>Try a different name or genre</p>
          <button style={{ ...s.emptyBtn, background: '#f0f0f0', color: '#333' }}
            onClick={() => { setSearch(''); setActiveGenre('All'); }}>
            Clear filters
          </button>
        </div>
      )}

      {/* GRID */}
      {!loading && filtered.length > 0 && (
        <div style={s.grid}>
          {filtered.map(g => (
            <Link key={g._id} to={`/games/${g._id}`} style={s.link}>
              <GameCard game={g} onDelete={handleDelete} />
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

const s = {
  page: {
    padding: '2rem 2.5rem',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    background: '#f5f5f7',
    minHeight: '100vh',
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  title: {
    margin: 0,
    fontSize: '1.9rem',
    fontWeight: 700,
    color: '#111',
  },
  subtitle: {
    margin: '4px 0 0',
    color: '#999',
    fontSize: 13,
  },
  btnAdd: {
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '10px 22px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    flexShrink: 0,
    letterSpacing: '0.02em',
  },

  // TOOLBAR
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: '1.75rem',
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: 10,
    border: '1.5px solid #e8e8e8',
    padding: '0 12px',
    maxWidth: 360,
    gap: 8,
  },
  searchIcon: {
    fontSize: 14,
    lineHeight: 1,
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: 14,
    padding: '9px 0',
    flex: 1,
    background: 'transparent',
    color: '#111',
    fontFamily: 'inherit',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#aaa',
    fontSize: 12,
    padding: '2px 4px',
    lineHeight: 1,
  },
  genres: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  genreBtn: {
    background: '#fff',
    border: '1.5px solid #e0e0e0',
    borderRadius: 20,
    padding: '5px 16px',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    color: '#555',
    transition: 'all 0.15s',
  },
  genreBtnActive: {
    background: '#1a1a1a',
    color: '#fff',
    border: '1.5px solid #1a1a1a',
  },

  // GRID
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },

  // STATES
  centerMsg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
  },
  spinner: {
    width: 32, height: 32,
    borderRadius: '50%',
    border: '3px solid #e0e0e0',
    borderTopColor: '#1a1a1a',
    animation: 'spin 0.8s linear infinite',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: 80,
    padding: '3rem 2rem',
    background: '#fff',
    borderRadius: 16,
    border: '1.5px dashed #ddd',
    maxWidth: 420,
    margin: '80px auto 0',
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: '#222',
    margin: '0 0 6px',
  },
  emptySub: {
    color: '#999',
    fontSize: 13,
    margin: '0 0 20px',
  },
  emptyBtn: {
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '9px 20px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  },
};