import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

export { AuditorRoute };

function AuditorRoute() {
    const auth = useSelector(x => x.auth.value);
    if (auth?.role !== "AUDITOR") {
        // not auditor to redirect to home page
        return <Navigate to="/" state={{ from: history.location }} />
    }

    // authorized so return outlet for child routes
    return <Outlet />;
}