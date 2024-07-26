import { StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Constants from 'expo-constants';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { retrieveInboxes } from '@/lib/auth-service/callWrapper';
import { InboxItem } from '@/lib/stubs/auth-service/auth_service_pb';

export default function EmailScreen() {
    const { user } = useUser();
    const [inboxItemsList, setInboxItemsList] = useState<InboxItem.AsObject[]>([])

    useEffect(() => {
        async function handleRetrieveInboxes(userId: string) {
            const data = await retrieveInboxes(userId)
            if (!data) { return }
            setInboxItemsList(data.itemsList)
        }
        if (!user?.id) { return }
        handleRetrieveInboxes(user.id)
    }, [user])

    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme === 'dark');
    return (
        <ThemedView style={styles.viewContainer}>
            <View style={styles.headerContainer}>
                <ThemedText type='defaultSemiBold'>My Inboxes</ThemedText>
            </View>
            {inboxItemsList.map((inboxItem, key) => (
                <View key={key}>
                    <ThemedText>{inboxItem.emailAddress}</ThemedText>
                </View>
            ))}
        </ThemedView>
    );
}

const getStyles = (isDark: boolean) => {
    const c = isDark ? Colors.dark : Colors.light;

    const styles = StyleSheet.create({
        viewContainer: {
            paddingTop: Constants.statusBarHeight,
            flex: 1,
        },
        headerContainer: {
            padding: Constants.statusBarHeight / 2,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: c.border
        },
    });

    return styles
}
