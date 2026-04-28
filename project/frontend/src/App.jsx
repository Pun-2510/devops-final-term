import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameList from './pages/GameList';
import GameDetail from './pages/GameDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang danh sách game */}
        <Route path="/" element={<GameList />} />

        {/* Trang chi tiết game */}
        <Route path="/games/:id" element={<GameDetail />} />
      </Routes>
    </BrowserRouter>
  );
}