
import { useContext } from 'react';

import { VoucherTaskCompletionContext } from '../../context/VoucherTaskCompletionContext.js';

export const useVoucherTaskCompletionContext = () => {
    const context = useContext(VoucherTaskCompletionContext);

    if (!context) {
        throw Error('useVoucherTaskCompletionContext must be used inside a VoucherTaskCompletionContextProvider');
    }

    return context;
};
