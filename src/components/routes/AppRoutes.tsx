import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '@/components/pages/Landing/Landing';
import Login from '@components/pages/Login/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
