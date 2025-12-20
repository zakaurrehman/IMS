'use client';

import SettingsProvider from '../contexts/useSettingsContext';
import ContractsProvider from '../contexts/useContractsContext';
import InvoiceProvider from '../contexts/useInvoiceContext';
import ExpensesProvider from '../contexts/useExpensesContext';
import { default as AuthContextProvider } from '../contexts/useAuthContext';

const Providers=({ children }) =>{
    return (
            <SettingsProvider>
                <AuthContextProvider>
                <ContractsProvider >
                    <InvoiceProvider >
                        <ExpensesProvider>
                            {children}
                        </ExpensesProvider>
                    </InvoiceProvider>
                </ContractsProvider>
                </AuthContextProvider>
        </SettingsProvider>
    );
}

export default Providers;
