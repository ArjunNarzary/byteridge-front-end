import { Routes, Route } from 'react-router-dom';

import { Sessions } from './';

export { AuditorsLayout };

function AuditorsLayout() {
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route index element={<Sessions />} />
                </Routes>
            </div>
        </div>
    );
}
