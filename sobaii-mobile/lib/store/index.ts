import { create } from 'zustand';
import { persist, combine, createJSONStorage } from 'zustand/middleware';
import { ExtractResponse } from '../stubs/ocr-service-dev/ocr_service_pb';

type ExpenseState = {
    data: ExtractResponse.AsObject[];
    selectedExpense?: ExtractResponse.AsObject;
}

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