import { create } from 'zustand';
import { persist, combine, createJSONStorage } from 'zustand/middleware';
import { secureStorage } from './persist';
import { ExtractResponse } from '../stubs/ocr-service-dev/ocr_service_pb';

type AuthState = {
    isAuthenticated: boolean;
};

type ExpenseState = {
    data: ExtractResponse.AsObject | null;
}

export const useAuthStore = create(
    persist(
        combine(
            { isAuthenticated: false } as AuthState,
            (set) => ({
                updateIsAuthenticated: (b: boolean) => set({ isAuthenticated: b }),
            })
        ),
        {
            name: 'auth-storage',
            storage: secureStorage,
        }
    )
);

export const useExpenseStore = create(
    persist(
        combine(
            { data: {} } as ExpenseState,
            (set) => ({
                updateExpense: (data: ExtractResponse.AsObject | null) => set(() => ({data: data})),
            })
        ),
        {
            name: 'expense-storage',
            storage: secureStorage,
        }
    )
);