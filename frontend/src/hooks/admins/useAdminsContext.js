
import { useContext } from 'react';

import { AdminsContext } from '../../context/admin/AdminsContext.js';

export const useAdminsContext = () => {
    const context = useContext(AdminsContext);

    if (!context) {
        throw Error('useAdminsContext must be used inside a AdminsContextProvider');
    }

    return context;
};
