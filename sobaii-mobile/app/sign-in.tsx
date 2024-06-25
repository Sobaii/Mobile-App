import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';

export default function SignIn() {

    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = useCallback(async() => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignIn = await signIn.create({
                identifier: email,
                password,
            });

            if (completeSignIn.status === 'complete') {
                await setActive({ session: completeSignIn.createdSessionId });
                router.replace('/');
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling 
                // for more info on error handling
                console.error(JSON.stringify(completeSignIn, null, 2));
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, [isLoaded, email, password])

    return (
        <ThemedView style={styles.viewContainer}>
            <ThemedText type="title">Sobaii</ThemedText>
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={password => setPassword(password)}
            />
            <Button mode="contained-tonal" onPress={handleSignIn} style={styles.button}>
                Sign In
            </Button>

            <View style={styles.divider} />
            <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                Sign in with Google
            </Button>
            <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                Sign in with Github
            </Button>
            <TouchableOpacity onPress={() => router.replace('/sign-up')} style={styles.button}>
                <Text style={{ textDecorationLine: 'underline' }}>
                    New user? Sign up instead
                </Text>
            </TouchableOpacity>
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
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    divider: {
        height: 1,
        width: '60%',
        backgroundColor: 'gray',
        marginVertical: 30,
    },
});
