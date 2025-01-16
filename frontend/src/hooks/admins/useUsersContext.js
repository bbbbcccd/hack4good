
import { useContext } from 'react';

import { UsersContext } from '../../context/admin/UsersContext.js';

export const useUsersContext = () => {
    const context = useContext(UsersContext);

    if (!context) {
        throw Error('useUsersContext must be used inside a UsersContextProvider');
    }

    return context;
};
