
import { useContext } from 'react';

import { VoucherTaskContext } from '../../context/VoucherTaskContext.js';

export const useVoucherTaskContext = () => {
    const context = useContext(VoucherTaskContext);

    if (!context) {
        throw Error('useVoucherTaskContext must be used inside a VoucherTaskContextProvider');
    }

    return context;
};
