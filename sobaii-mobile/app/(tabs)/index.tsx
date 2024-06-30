import { StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, TouchableOpacity, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import { extractFileData } from '@/lib/ocr-service/callWrapper';
import { useExpenseStore } from '@/lib/store';
import Toast from 'react-native-root-toast';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DashboardScreen() {
  const updateExpenses = useExpenseStore((state) => state.updateExpenses)
  const { user } = useUser();

  const handleFileUpload = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (res.canceled) {
      return;
    }

    try {
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

          updateExpenses(data)

        } catch (error) {
          console.error('Error extracting file data:', error);
        }
      };

      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const colorScheme = useColorScheme()
  const styles = getStyles(colorScheme === 'dark')

  return (
    <ThemedView style={styles.viewContainer}>
      <View style={styles.uploadContainer}>
        <View style={styles.welcomeView}>
          <ThemedText type='title'>Sobaii</ThemedText>
        </View>
        <View style={{ ...styles.divider, alignSelf: 'center' }} />
        <Link href="/camera-screen" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="camera-outline" size={24} style={{ ...styles.actionText, marginRight: 10 }} />
              <Text style={styles.actionText}>Upload expenses with camera</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} style={styles.actionText} />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={handleFileUpload} style={styles.actionButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="phone-portrait-outline" size={24} style={{ ...styles.actionText, marginRight: 10 }} />
            <Text style={styles.actionText}>Upload expenses from device</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.actionText} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/expenses')} style={styles.actionButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="file-tray-outline" size={24} style={{ ...styles.actionText, marginRight: 10 }} />
            <Text style={styles.actionText}>View my expenses</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.actionText} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/email')} style={styles.actionButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="mail-outline" size={24} style={{ ...styles.actionText, marginRight: 10 }} />
            <Text style={styles.actionText}>Configure email permissions</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.actionText} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/profile')} style={{ ...styles.badge, alignSelf: 'center', marginTop: 30 }}>
          <Ionicons name="ellipsis-vertical-circle-outline" size={16} style={{ ...styles.actionText, marginRight: 6 }} />
          <ThemedText style={{ fontSize: 12 }}>Signed in as {user?.firstName} {user?.lastName}</ThemedText>
        </TouchableOpacity>
      </View>

    </ThemedView>
  );
}

const getStyles = (isDark: boolean) => {
  const c = isDark ? Colors.dark : Colors.light

  const styles = StyleSheet.create({
    viewContainer: {
      paddingTop: Constants.statusBarHeight,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadContainer: {
      width: '80%',
      gap: 12,
    },
    welcomeView: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      flexDirection: 'row',      
      alignItems: 'center',
      backgroundColor: c.secondary,
      paddingHorizontal: 12,
      borderRadius: 50,
    },
    divider: {
      height: 1,
      width: '60%',
      backgroundColor: c.border,
      marginVertical: 30,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: c.border
    },
    actionText: {
      color: c.text,
      fontWeight: '500'
    }
  });

  return styles
}

