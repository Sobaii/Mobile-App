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
            setExpenses: (newData: ExtractResponse.AsObject[]) => set(() => ({data: newData})),
            
            updateExpenses: (newData: ExtractResponse.AsObject) => set((state) => ({data: [...state.data, newData]})),
        
            updateSelectedExpense: (target: ExtractResponse.AsObject) => set (() => ({selectedExpense: target}))
        })
    )
);