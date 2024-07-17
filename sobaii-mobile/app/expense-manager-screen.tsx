import { View, Text, ScrollView, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { useExpenseStore } from "@/lib/store";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ExpenseField } from "@/lib/stubs/ocr-service-dev/ocr_service_pb";

export default function ExpenseManagerScreen() {
    const selectedExpense = useExpenseStore((state) => state.selectedExpense);

    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme === 'dark');

    if (!selectedExpense?.data) {
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
                {Object.entries(selectedExpense.data)
                    .map(([key, value]) => {
                        const expenseValue = value as ExpenseField.AsObject
                        return (
                            expenseValue?.text && (
                                <View key={key} style={{ ...styles.cardContainer, marginBottom: 6 }}>
                                    <TouchableOpacity style={styles.info}>
                                        <ThemedText style={{ fontSize: 12 }}>{key}</ThemedText>
                                        <Ionicons name="create-outline" size={24} style={styles.actionText} />
                                    </TouchableOpacity>
                                    <ThemedText>{expenseValue.text}</ThemedText>
                                    <View style={{ ...styles.badge, alignSelf: 'flex-start' }}>
                                        <ThemedText style={{ fontSize: 12 }}>
                                            Confidence: {Math.round((expenseValue.confidence + Number.EPSILON) * 100) / 100}%
                                        </ThemedText>
                                    </View>
                                </View>
                            )
                        )
                    })}

            </ScrollView>
        </>
    );
}

const getStyles = (isDark: boolean) => {
    const c = isDark ? Colors.dark : Colors.light;

    const styles = StyleSheet.create({
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            flex: 1,
            gap: 12,
            padding: 6
        },
        cardContainer: {
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: c.border,
            gap: 12
        },
        info: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        badge: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: c.secondary,
            paddingHorizontal: 12,
            borderRadius: 50,
        },
        actionText: {
            color: c.text,
            fontWeight: '500'
        }
    });

    return styles;
};
