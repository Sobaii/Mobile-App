import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { DataTable } from 'react-native-paper';
import Constants from 'expo-constants';
import { useExpenseStore } from '@/lib/store';
import { computeAvgExpenseConfidence } from '@/lib/utils';
import { Link } from 'expo-router';

export default function ExpensesScreen() {
    const expenseData = useExpenseStore((state) => state.data)
    const updateSelectedExpense = useExpenseStore((state) => state.updateSelectedExpense)

    return (
        <ThemedView style={styles.viewContainer}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>File Name</DataTable.Title>
                    <DataTable.Title>Invoice Receipt Date</DataTable.Title>
                    <DataTable.Title>Average Data Confidence</DataTable.Title>
                </DataTable.Header>
                {expenseData.map((expense, key) => (
                    <Link href="/expense-manager-screen" asChild key={key}>
                        <TouchableOpacity onPress={() => updateSelectedExpense(expense)}>
                            <DataTable.Row>
                                <DataTable.Cell>{expense.fileName?.text}</DataTable.Cell>
                                <DataTable.Cell>{expense.invoiceReceiptDate?.text}</DataTable.Cell>
                                <DataTable.Cell>{`${computeAvgExpenseConfidence(expense)}%`}</DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    </Link>
                ))}
            </DataTable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    },
});