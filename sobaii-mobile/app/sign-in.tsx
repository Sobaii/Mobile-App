import { StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { updateIsAuthenticated } from '@/store/reducers/authSlice';
import { router } from 'expo-router';

export default function SignIn() {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <ThemedView style={styles.viewContainer}>
            <TouchableOpacity onPress={() => {
                dispatch(updateIsAuthenticated(true))
                router.replace('/');
            }}>
                <ThemedText type="title">Sign In</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
