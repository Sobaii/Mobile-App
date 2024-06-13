import { create } from 'zustand';
import { persist, combine, createJSONStorage } from 'zustand/middleware';
import { secureStorage } from './persist';
import { ExtractResponse } from '../stubs/ocr-service-dev/ocr_service_pb';

type AuthState = {
    isAuthenticated: boolean;
};

type ExpenseState = {
    data: ExtractResponse.AsObject[];
    selectedExpense?: ExtractResponse.AsObject;
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
    combine(
        { data: [] } as ExpenseState,
        (set) => ({
            updateExpenses: (newData: ExtractResponse.AsObject) => set((state) => ({data: [...state.data, newData]})),
            clearExpenses: () => set (() => ({data: []})),
            updateSelectedExpense: (target: ExtractResponse.AsObject) => set (() => ({selectedExpense: target}))
        })
    )
);