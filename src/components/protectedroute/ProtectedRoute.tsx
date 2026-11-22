import { Navigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../helper/routes';

interface ProtectedRouteProps {
    element: React.ReactElement;
    requiredAuth?: boolean;
}

export const ProtectedRoute = ({ element, requiredAuth = true }: ProtectedRouteProps) => {
    const token = localStorage.getItem('accessToken');
    const isAuthenticated = !!token;

    if (requiredAuth && !isAuthenticated) {
        return <Navigate to={LOGIN_ROUTE} replace />;
    }
    return element;
};
