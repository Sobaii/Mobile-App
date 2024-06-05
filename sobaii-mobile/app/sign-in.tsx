import React from 'react';
import { StyleSheet, View } from 'react-native'; // Import View
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { updateIsAuthenticated } from '@/store/reducers/authSlice';
import { router } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';

export default function SignIn() {
    const dispatch = useDispatch<AppDispatch>();

    const handleSignIn = () => {
        dispatch(updateIsAuthenticated(true));
        router.replace('/');
    };

    return (
        <ThemedView style={styles.viewContainer}>
            <ThemedText type="title">Sobaii</ThemedText>
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained-tonal" onPress={handleSignIn} style={styles.button}>
                Sign Up
            </Button>

            <View style={styles.divider} />
            <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                Sign in with Google
            </Button>
            <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                Sign in with Github
            </Button>
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
    input: {
        width: '80%',
        marginVertical: 10,
    },
    button: {
        width: '80%',
        marginVertical: 10,
    },
    divider: {
        height: 1,
        width: '60%',
        backgroundColor: 'gray',
        marginVertical: 30,
    },
});
