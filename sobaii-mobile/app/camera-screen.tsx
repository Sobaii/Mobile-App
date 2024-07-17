import React, { useEffect } from 'react';
import { useExpenseStore } from '@/lib/store';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';
import { Link, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CameraExample() {
    const [permission, requestPermission] = useCameraPermissions();
    const {
        fileSelection,
        setFileSelection
    } = useExpenseStore((state) => ({
        fileSelection: state.fileSelection,
        setFileSelection: state.setFileSelection
    }))

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
                        <TouchableOpacity onPress={() => {
                            if (!fileSelection) {
                                console.error('state error')
                                return
                            }
                            setFileSelection({ ...fileSelection, isSelectingFolder: true, folderSelected: undefined })
                            router.back()
                        }}>
                            <Ionicons name="arrow-back-outline" size={64} color={'#fff'} />
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.actionContainer}>
                        <Ionicons name="radio-button-on-outline" size={96} color={'#fff'} />
                    </ThemedView>
                </CameraView>
            </ThemedView>
        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
    },
    actionContainer: {
        position: 'absolute',
        bottom: Constants.statusBarHeight,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    navContainer: {
        position: 'absolute',
        top: Constants.statusBarHeight,
        alignSelf: 'flex-start',
        backgroundColor: 'transparent'
    }
});
