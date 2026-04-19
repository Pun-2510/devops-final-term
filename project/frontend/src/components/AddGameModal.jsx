import { useState } from 'react';

export default function AddGameModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    name: '', genre: '', description: '', releaseYear: '',
    rating: '', price: '', publisher: '', imageUrl: '',
    tags: '', minReq: '', recReq: ''
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim()) return;
    setLoading(true);
    try {
      const body = {
        name: form.name.trim(),
        genre: form.genre.trim(),
        description: form.description.trim(),
        releaseYear: Number(form.releaseYear) || undefined,
        rating: parseFloat(form.rating) || 0,
        price: parseFloat(form.price) || 0,
        publisher: form.publisher.trim(),
        imageUrl: form.imageUrl.trim(),
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        systemRequirements: {
          minimum: form.minReq.trim(),
          recommended: form.recReq.trim()
        }
      };
      const res = await fetch(`http://localhost:5000/api/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
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

        <div style={s.row}>
          <Field label="Game name *" value={form.name} onChange={set('name')} placeholder="e.g. Elden Ring" />
          <Field label="Genre" value={form.genre} onChange={set('genre')} placeholder="e.g. RPG" />
        </div>
        <Field label="Description" value={form.description} onChange={set('description')} textarea />
        <div style={s.row}>
          <Field label="Release year" value={form.releaseYear} onChange={set('releaseYear')} type="number" placeholder="2024" />
          <Field label="Rating (0–10)" value={form.rating} onChange={set('rating')} type="number" placeholder="8.5" />
        </div>
        <div style={s.row}>
          <Field label="Price ($)" value={form.price} onChange={set('price')} type="number" placeholder="59.99" />
          <Field label="Publisher" value={form.publisher} onChange={set('publisher')} placeholder="e.g. FromSoftware" />
        </div>
        <div style={s.row}>
          <Field label="Image URL" value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://..." />
          <Field label="Tags (comma separated)" value={form.tags} onChange={set('tags')} placeholder="action, open world" />
        </div>
        <div style={s.row}>
          <Field label="Min requirements" value={form.minReq} onChange={set('minReq')} placeholder="CPU: i5, RAM: 8GB" />
          <Field label="Recommended" value={form.recReq} onChange={set('recReq')} placeholder="CPU: i7, RAM: 16GB" />
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
      <label style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{label}</label>
      {textarea
        ? <textarea style={{ ...s.input, minHeight: 70, resize: 'vertical' }} {...props} />
        : <input style={s.input} {...props} />
      }
    </div>
  );
}

const s = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', borderRadius: 14, padding: '1.5rem', width: 540, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' },
  title: { margin: 0, fontSize: '1.2rem', fontWeight: 600 },
  closeBtn: { background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#888', padding: '2px 6px' },
  row: { display: 'flex', gap: 12 },
  input: { border: '1px solid #e0e0e0', borderRadius: 8, padding: '7px 10px', fontSize: 13, width: '100%', fontFamily: 'inherit' },
  footer: { display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' },
  cancelBtn: { background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer' },
  submitBtn: { background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }
};