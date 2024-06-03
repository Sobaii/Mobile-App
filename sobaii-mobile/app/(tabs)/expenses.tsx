import { StyleSheet, StatusBar, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

let statusBarHeight = 0;
if (Platform.OS === 'ios') {
    statusBarHeight = StatusBar.currentHeight || 20; // Default height for iOS status bar
} else {
    statusBarHeight = StatusBar.currentHeight || 0;
}

export default function ExpensesScreen() {
    return (
        <ThemedView style={styles.viewContainer}>
            <ThemedText type="title">Expenses</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        paddingTop: statusBarHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
