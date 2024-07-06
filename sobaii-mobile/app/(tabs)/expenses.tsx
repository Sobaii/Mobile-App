import { Modal, StyleSheet, TouchableOpacity, useColorScheme, Text, View, Animated, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import * as WebBrowser from 'expo-web-browser'
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';
import { useExpenseStore } from '@/lib/store';
import { computeAvgExpenseConfidence } from '@/lib/utils';
import { Link } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { extractFileData, retrieveExpenses } from '@/lib/ocr-service/callWrapper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import Toast from 'react-native-root-toast';

export default function ExpensesScreen() {
    const expenseData = useExpenseStore((state) => state.data);
    const updateSelectedExpense = useExpenseStore((state) => state.updateSelectedExpense);
    const setExpenses = useExpenseStore((state) => state.setExpenses);
    const updateExpenses = useExpenseStore((state) => state.updateExpenses)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileUpload = async () => {
        const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
        if (res.canceled) {
            return;
        }

        try {
            setIsUploading(true)
            // Read the file content as Uint8Array using FileReader
            const response = await fetch(res.assets[0].uri);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onloadend = async () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const uint8Array = new Uint8Array(arrayBuffer);

                // Perform extractFileData
                try {
                    const data = await extractFileData(uint8Array);
                    if (!data) {
                        return
                    }
                    Toast.show('File data successfully extracted.', {
                        duration: Toast.durations.SHORT,
                        position: Constants.statusBarHeight + 20
                    });

                    setIsUploading(false)
                    updateExpenses(data)

                } catch (error) {
                    setIsUploading(false)
                    console.error('Error extracting file data:', error);
                }
            };

            reader.readAsArrayBuffer(blob);
        } catch (error) {
            setIsUploading(false)
            console.error('Error reading file:', error);
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalPhase, setModalPhase] = useState<'search' | 'order'>('search')
    const [fileNameQuery, setFileNameQuery] = useState('')

    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, [])

    useEffect(() => {
        async function handleRetrieveExpenses() {
            const data = await retrieveExpenses();
            if (!data) { return; }
            setExpenses(data.infoList);
        }
        handleRetrieveExpenses();
    }, []);

    const colorScheme = useColorScheme();
    const c = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const styles = getStyles(colorScheme === 'dark');

    return (
        <ThemedView style={styles.viewContainer}>
            <View style={styles.headerContainer}>
                <ThemedText type='defaultSemiBold'>My Expenses</ThemedText>
            </View>
            {expenseData.length !== 0 ? (
                <ScrollView style={styles.scrollContainer}>
                    {expenseData.map((expense, key) => (
                        <View key={key} style={{ ...styles.itemContainer, marginBottom: 6 }}>
                            <View style={styles.imageContainer}>

                                {/**render expense snapshot here */}
                                <Ionicons name="document-text-outline" size={72} style={{...styles.actionText, color: c.background}} />
                                <Link href="/expense-manager-screen" asChild>
                                    <TouchableOpacity
                                        onPress={() => updateSelectedExpense(expense)}
                                        style={{
                                            ...styles.floatingButton,
                                            position: 'absolute',
                                            left: 12,
                                            top: 12,
                                        }}
                                    >
                                        <Ionicons name="open-outline" size={24} style={styles.actionText} />
                                    </TouchableOpacity>
                                </Link>
                                <TouchableOpacity
                                    onPress={async () => {
                                        if (!expense.objectUrl) { return }
                                        await WebBrowser.openBrowserAsync(expense.objectUrl);
                                    }}
                                    style={{
                                        ...styles.floatingButton,
                                        position: 'absolute',
                                        left: 12,
                                        bottom: 12,
                                    }}
                                >
                                    <Ionicons name="cloud-download-outline" size={24} style={styles.actionText} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ padding: 12, paddingLeft: 0, flexDirection: 'column', justifyContent: 'space-between' }}>
                                <View>
                                    <ThemedText style={{ fontSize: 12 }}>{expense.vendorName?.text}</ThemedText>
                                    <ThemedText>{expense.total?.text}</ThemedText>
                                </View>
                                <View style={{ ...styles.badge, alignSelf: 'flex-start' }}>
                                    <ThemedText style={{ fontSize: 12 }}>Confidence: {computeAvgExpenseConfidence(expense)}%</ThemedText>
                                </View>
                            </View>
                            <View style={{
                                position: 'absolute',
                                right: 12,
                                top: 12
                            }}>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <ThemedView style={styles.emptyViewContainer}>
                    <View>
                        <Ionicons name="file-tray-outline" size={72} style={{ ...styles.actionText, alignSelf: 'center' }} />
                        <ThemedText type='defaultSemiBold'>Start by uploading an expense.</ThemedText>
                    </View>
                </ThemedView>
            )}
            <ThemedView style={styles.floatingContainer}>
                {!isUploading ? (
                    <>
                        <Link href="/camera-screen" asChild>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={styles.floatingButton}
                            >
                                <Ionicons name="camera-outline" size={32} style={styles.actionText} />
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity
                            onPress={handleFileUpload}
                            style={styles.floatingButton}
                        >
                            <Ionicons name="phone-portrait-outline" size={32} style={styles.actionText} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.floatingButton}>
                        <ActivityIndicator size="small" color={c.text} style={{ padding: 6 }} />
                    </View>
                )}
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.floatingButton}
                >
                    <Ionicons name="options-outline" size={32} style={styles.actionText} />
                </TouchableOpacity>
            </ThemedView>
            {/* <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Animated.View style={[styles.modalContainer, {
                    transform: [{
                        translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [500, 0],
                        })
                    }]
                }]}>
                    <ThemedView style={styles.modalView}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 12
                        }}>
                            <ThemedText>
                                Filter Expenses
                                <ThemedText style={{ ...styles.actionText, fontSize: 12 }}> / Order</ThemedText>
                            </ThemedText>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Ionicons name='close-circle-outline' size={24} style={styles.actionText} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 12
                        }}>
                            <Text style={{ ...styles.actionText, fontSize: 12, width: '20%' }}>By File Name</Text>
                            <TextInput
                                style={styles.input}
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Text style={{ ...styles.actionText, fontSize: 12, width: '20%' }}>By File Category</Text>
                            <TextInput
                                style={styles.input}
                            />
                        </View>
                    </ThemedView>
                </Animated.View>
            </Modal> */}
        </ThemedView>
    );
}

const getStyles = (isDark: boolean) => {
    const c = isDark ? Colors.dark : Colors.light;

    const styles = StyleSheet.create({
        viewContainer: {
            paddingTop: Constants.statusBarHeight,
            flex: 1
        },
        headerContainer: {
            padding: Constants.statusBarHeight / 2,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: c.border
        },
        scrollContainer: {
            flex: 1,
            gap: 12,
            padding: 6
        },
        itemContainer: {
            borderRadius: 5,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: c.border,
            flexDirection: 'row',
            gap: 12
        },
        imageContainer: {
            backgroundColor: c.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            width: 96,
            height: 144,
            padding: 12,
        },
        badge: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: c.secondary,
            paddingHorizontal: 12,
            borderRadius: 50,
        },
        floatingContainer: {
            backgroundColor: 'transparent',
            position: "absolute",
            right: Constants.statusBarHeight,
            bottom: Constants.statusBarHeight,
            zIndex: 100,
            gap: Constants.statusBarHeight
        },
        floatingButton: {
            backgroundColor: c.secondary,
            borderRadius: 50,
            padding: 12,
            shadowColor: "#000000",
            elevation: 3,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        modalView: {
            width: '100%',
            height: '40%',
            backgroundColor: isDark ? c.secondary : c.background,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            padding: 18,
            shadowColor: "#000000",
            elevation: 6,
        },
        input: {
            width: '80%',
            borderWidth: 1,
            paddingLeft: 15,
            padding: 10,
            borderRadius: 5,
            borderColor: c.border,
            color: c.text
        },
        actionText: {
            color: c.text,
        },
        emptyViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

    return styles;
};
