import React, { useEffect } from 'react';
import { Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { Link } from 'expo-router';
import { Button, IconButton } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';

let statusBarHeight = 0;
if (Platform.OS === 'ios') {
    statusBarHeight = StatusBar.currentHeight || 20; // Default height for iOS status bar
} else {
    statusBarHeight = StatusBar.currentHeight || 0;
}

export default function CameraExample() {
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        (async () => {
            requestPermission()
        })();
    }, []);

    if (!permission) {
        return (
            <ThemedView style={styles.screenContainer}>
                <Text>Loading Camera...</Text>
            </ThemedView>
        );
    } else if (!permission.granted) {
        return (
            <ThemedView style={styles.screenContainer}>
                <Text>No access to camera</Text>
            </ThemedView>
        );
    } else {
        return (
            <ThemedView style={styles.screenContainer}>
                <CameraView style={styles.camera}>
                    <ThemedView style={styles.navContainer}>
                        <Link href='/' asChild>
                            <IconButton
                                icon="backburger"
                                iconColor='#FFFFFF'
                                size={45}
                            />
                        </Link>
                    </ThemedView>
                    <ThemedView style={styles.actionContainer}>
                        <IconButton
                            icon="camera-iris"
                            iconColor='#FFFFFF'
                            mode='outlined'
                            size={60}
                            onPress={() => console.log('Pressed')}
                        />
                    </ThemedView>
                </CameraView>
            </ThemedView>
        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        paddingTop: statusBarHeight,
        flex: 1,
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
    },
    actionContainer: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    navContainer: {
        position: 'absolute',
        alignSelf: 'flex-start',
        backgroundColor: 'transparent'
    }
});
