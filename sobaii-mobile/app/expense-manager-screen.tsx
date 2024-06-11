import { View, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Text, Card, Divider } from "react-native-paper";
import { useExpenseStore } from "@/lib/store";

export default function ExpenseManagerScreen() {
    const selectedExpense = useExpenseStore((state) => state.selectedExpense);

    if (!selectedExpense) {
        return (
            <View style={styles.emptyContainer}>
                <Text>No Expense Selected</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Expense Manager' }} />
            <ScrollView style={styles.container}>
                {Object.entries(selectedExpense).map(([key, value]) => (
                    value?.text && (
                        <Card key={key} mode="outlined" style={{marginBottom: 8}}>
                            <Card.Content>
                                <Text style={styles.cardTitle}>{key}</Text>
                                <Text>{value.text}</Text>
                                <Text style={styles.cardSubtitle}>Confidence: {value.confidence}%</Text>
                            </Card.Content>
                        </Card>
                    )
                ))}
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: 'gray',
    },
});
