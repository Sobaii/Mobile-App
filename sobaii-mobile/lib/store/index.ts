import { create } from 'zustand';
import { persist, combine, createJSONStorage } from 'zustand/middleware';
import { ExtractFileResponse, FolderSearchResponse, ExpenseItem } from '../stubs/ocr-service-dev/ocr_service_pb';

type FileSelectionState = {
    isSelectingFolder: boolean
    fileOrigin: 'camera' | 'files'
    folderSelected?: string
} | null

type ExpenseState = {
    fileSelection: FileSelectionState
    folders: string[];
    expenses: ExpenseItem.AsObject[];
    selectedExpense?: ExpenseItem.AsObject;
}

export const useExpenseStore = create(
    combine(
        { fileSelection: null, expenses: [], folders: [] } as ExpenseState,
        (set) => ({
            setFileSelection: (newData: FileSelectionState) => set(() => ({fileSelection: newData})),

            setFolders: (newData: FolderSearchResponse.AsObject) => set(() => ({folders: newData.foldersList})),
            updateFolders: (newData: string) => set((state) => ({folders: [...state.folders, newData]})),

            setExpenses: (newData: ExpenseItem.AsObject[]) => set(() => ({expenses: newData})),
            updateExpenses: (newData: ExpenseItem.AsObject) => set((state) => ({expenses: [...state.expenses, newData]})),
            updateSelectedExpense: (target: ExpenseItem.AsObject) => set (() => ({selectedExpense: target}))
        })
    )
);