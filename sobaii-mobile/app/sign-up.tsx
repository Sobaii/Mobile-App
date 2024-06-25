import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { useSignUp } from '@clerk/clerk-expo';

export default function SignIn() {

    const { isLoaded, signUp, setActive } = useSignUp();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState('')

    const handleSignIn = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress: email,
                password: password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingVerification(true)
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleVerifyEmail = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <ThemedView style={styles.viewContainer}>
            {!pendingVerification ? (
                <>
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
                    <TextInput
                        label="Confirm Password"
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                    />
                    <Button mode="contained-tonal" onPress={handleSignIn} style={styles.button}>
                        Sign Up
                    </Button>

                    <View style={styles.divider} />
                    <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                        Sign up with Google
                    </Button>
                    <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                        Sign up with Github
                    </Button>
                    <TouchableOpacity onPress={() => router.replace('/sign-in')} style={styles.button}>
                        <Text style={{ textDecorationLine: 'underline' }}>
                            Existing user? Sign in instead
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TextInput
                        value={code}
                        placeholder="Code..."
                        onChangeText={(code) => setCode(code)}
                    />
                    <Button onPress={handleVerifyEmail}>
                        Verify Email
                    </Button>
                </>
            )}
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
