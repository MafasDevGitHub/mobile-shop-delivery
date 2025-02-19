import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if(isAuthenticated){
        return <Navigate/>
    }

    return children
}

export default PublicRoute