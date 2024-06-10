import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Constants from 'expo-constants';
import { useExpenseStore } from '@/lib/store';

export default function ExpensesScreen() {
    const expenseData = useExpenseStore((state) => state.data)
    
    // TODO expense ui
    return (
        <ThemedView style={styles.viewContainer}>
            <ThemedText type="title">Expenses</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
