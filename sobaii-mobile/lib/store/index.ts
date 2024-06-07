import { create } from 'zustand';
import { persist, combine, createJSONStorage } from 'zustand/middleware';
import { secureStorage } from './persist';

type AuthState = {
    isAuthenticated: boolean;
};

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
