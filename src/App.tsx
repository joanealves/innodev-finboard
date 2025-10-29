import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './router/ProtectedRoute';


export default function App() {
return (
<Routes>
  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/login" element={<Login />} />
  <Route path="*" element={<NotFound />} />
</Routes>
);
}