import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const styles = {
  page: {
    padding: '2rem',
    maxWidth: 1000,
    margin: '0 auto',
    fontFamily: 'Arial',
  },

  header: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },

  image: {
    width: 320,
    height: 200,
    objectFit: 'cover',
    borderRadius: 12,
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },

  info: {
    flex: 1,
  },

  title: {
    margin: 0,
    fontSize: '2rem',
  },

  meta: {
    color: '#666',
    marginTop: 6,
  },

  price: {
    marginTop: 10,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },

  tags: {
    marginTop: 12,
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },

  tag: {
    background: '#eee',
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: 12,
  },

  section: {
    marginTop: 30,
  },

  desc: {
    lineHeight: 1.6,
    color: '#333',
  },

  reqBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    background: '#f7f7f7',
    padding: 16,
    borderRadius: 10,
  },

  loading: {
    textAlign: 'center',
    marginTop: 50,
  },
};

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`/api/games/${id}`)
      .then(r => r.json())
      .then(setGame);
  }, [id]);

  if (!game) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <img src={game.imageUrl} style={styles.image} />

        <div style={styles.info}>
          <h1 style={styles.title}>{game.name}</h1>

          <p style={styles.meta}>
            {game.genre} • {game.releaseYear} • ⭐ {game.rating}/10
          </p>

          <p style={styles.price}>
            💰 ${game.price}
          </p>

          <div style={styles.tags}>
            {game.tags?.map((t, i) => (
              <span key={i} style={styles.tag}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div style={styles.section}>
        <h2>Description</h2>
        <p style={styles.desc}>{game.description}</p>
      </div>

      {/* SYSTEM REQUIREMENTS */}
      <div style={styles.section}>
        <h2>System Requirements</h2>

        <div style={styles.reqBox}>
          <div>
            <h4>Minimum</h4>
            <p>{game.systemRequirements?.minimum}</p>
          </div>

          <div>
            <h4>Recommended</h4>
            <p>{game.systemRequirements?.recommended}</p>
          </div>
        </div>
      </div>
    </div>
  );
}