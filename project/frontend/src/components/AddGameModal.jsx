import { useState } from 'react';

const PLATFORMS = ['PC', 'PS4', 'PS5', 'Xbox', 'Switch', 'Mobile'];

export default function AddGameModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    name: '', genre: '', description: '', releaseYear: '',
    rating: '', price: '', publisher: '', developer: '',
    imageUrl: '', trailerUrl: '', tags: '',
    platforms: [], minReq: '', recReq: '',
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const togglePlatform = (p) => setForm(prev => ({
    ...prev,
    platforms: prev.platforms.includes(p)
      ? prev.platforms.filter(x => x !== p)
      : [...prev.platforms, p],
  }));

  const handleSubmit = async () => {
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      const body = {
        name: form.name.trim(),
        genre: form.genre.trim(),
        // description là array — split theo dòng
        description: form.description.split('\n').map(s => s.trim()).filter(Boolean),
        releaseYear: Number(form.releaseYear) || undefined,
        rating: parseFloat(form.rating) || 0,
        price: parseFloat(form.price) || 0,
        publisher: form.publisher.trim(),
        developer: form.developer.trim(),
        imageUrl: form.imageUrl.trim(),
        trailerUrl: form.trailerUrl.trim(),
        platforms: form.platforms,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        systemRequirements: {
          minimum: form.minReq.trim(),
          recommended: form.recReq.trim(),
        },
      };
      const res = await fetch(`/api/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const newGame = await res.json();
      onAdded(newGame);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>

        <div style={s.header}>
          <h2 style={s.title}>Add New Game</h2>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* ROW 1 */}
        <div style={s.row}>
          <Field label="Game name *" value={form.name} onChange={set('name')} placeholder="e.g. Elden Ring" />
          <Field label="Genre" value={form.genre} onChange={set('genre')} placeholder="e.g. Action RPG" />
        </div>

        {/* ROW 2 */}
        <div style={s.row}>
          <Field label="Developer" value={form.developer} onChange={set('developer')} placeholder="e.g. FromSoftware" />
          <Field label="Publisher" value={form.publisher} onChange={set('publisher')} placeholder="e.g. Bandai Namco" />
        </div>

        {/* DESCRIPTION — mỗi dòng = 1 phần tử array */}
        <Field
          label="Description (mỗi dòng = 1 đoạn)"
          value={form.description}
          onChange={set('description')}
          textarea
          placeholder={"Elden Ring is an open world RPG...\nDeveloped by FromSoftware..."}
        />

        {/* ROW 3 */}
        <div style={s.row}>
          <Field label="Release year" value={form.releaseYear} onChange={set('releaseYear')} type="number" placeholder="2024" />
          <Field label="Rating (0–10)" value={form.rating} onChange={set('rating')} type="number" placeholder="8.5" />
        </div>

        {/* ROW 4 */}
        <div style={s.row}>
          <Field label="Price ($)" value={form.price} onChange={set('price')} type="number" placeholder="59.99" />
          <Field label="Tags (comma separated)" value={form.tags} onChange={set('tags')} placeholder="action, open world" />
        </div>

        {/* ROW 5 */}
        <div style={s.row}>
          <Field label="Image URL" value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://..." />
          <Field label="Trailer URL (YouTube)" value={form.trailerUrl} onChange={set('trailerUrl')} placeholder="https://youtu.be/..." />
        </div>

        {/* PLATFORMS */}
        <div style={{ marginBottom: 14 }}>
          <label style={s.fieldLabel}>Platforms</label>
          <div style={s.platformRow}>
            {PLATFORMS.map(p => (
              <button
                key={p}
                type="button"
                style={{
                  ...s.platformBtn,
                  ...(form.platforms.includes(p) ? s.platformBtnActive : {}),
                }}
                onClick={() => togglePlatform(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* SYSTEM REQUIREMENTS */}
        <div style={s.row}>
          <Field label="Min requirements" value={form.minReq} onChange={set('minReq')} placeholder="Intel i5, 8GB RAM, GTX 1060" />
          <Field label="Recommended" value={form.recReq} onChange={set('recReq')} placeholder="Intel i7, 16GB RAM, RTX 3060" />
        </div>

        <div style={s.footer}>
          <button style={s.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={s.submitBtn} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Adding...' : 'Add Game'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, textarea, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12, flex: 1 }}>
      <label style={s.fieldLabel}>{label}</label>
      {textarea
        ? <textarea style={{ ...s.input, minHeight: 80, resize: 'vertical' }} {...props} />
        : <input style={s.input} {...props} />
      }
    </div>
  );
}

const s = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(3px)',
  },
  modal: {
    background: '#fff',
    borderRadius: 16,
    padding: '1.75rem',
    width: 580,
    maxHeight: '88vh',
    overflowY: 'auto',
    boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
  },
  header: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  title: { margin: 0, fontSize: '1.25rem', fontWeight: 700 },
  closeBtn: {
    background: '#f2f2f2', border: 'none',
    width: 30, height: 30, borderRadius: '50%',
    fontSize: 13, cursor: 'pointer', color: '#555',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  row: { display: 'flex', gap: 14 },
  fieldLabel: { fontSize: 12, color: '#777', fontWeight: 600, letterSpacing: '0.02em' },
  input: {
    border: '1.5px solid #ebebeb',
    borderRadius: 8,
    padding: '8px 11px',
    fontSize: 13,
    width: '100%',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },
  platformRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 },
  platformBtn: {
    padding: '5px 14px',
    borderRadius: 20,
    border: '1.5px solid #e0e0e0',
    background: '#fff',
    color: '#555',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  platformBtnActive: {
    background: '#1a1a1a',
    color: '#fff',
    border: '1.5px solid #1a1a1a',
  },
  footer: {
    display: 'flex', gap: 8, justifyContent: 'flex-end',
    marginTop: '1.5rem', paddingTop: '1rem',
    borderTop: '1px solid #f0f0f0',
  },
  cancelBtn: {
    background: 'none', border: '1.5px solid #e0e0e0',
    borderRadius: 8, padding: '8px 18px',
    fontSize: 13, cursor: 'pointer', color: '#555',
  },
  submitBtn: {
    background: '#1a1a1a', color: '#fff',
    border: 'none', borderRadius: 8,
    padding: '8px 22px', fontSize: 13,
    fontWeight: 700, cursor: 'pointer',
  },
};