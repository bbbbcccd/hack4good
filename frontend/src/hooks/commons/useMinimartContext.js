
import { useContext } from 'react';

import { MinimartContext } from '../../context/MinimartContext.js';

export const useMinimartContext = () => {
    const context = useContext(MinimartContext);

    if (!context) {
        throw Error('useMinimartContext must be used inside a MinimartContextProvider');
    }

    return context;
};
