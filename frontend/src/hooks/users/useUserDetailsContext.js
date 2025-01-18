
import { useContext } from 'react';

import { UserDetailsContext } from '../../context/users/UserDetailsContext';

export const useUserDetailsContext = () => {
    const context = useContext(UserDetailsContext);

    if (!context) {
        throw Error('useUserDetailsContext must be used inside a UserDetailsContextProvider');
    }

    return context;
};
