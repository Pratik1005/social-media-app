import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequiresAuth = ({ children }) => {
  const location = useLocation();
  const { userData } = useSelector(state => state.auth);

  return userData ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
