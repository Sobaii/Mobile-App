import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import { extractFileData } from '@/lib/ocr-service/callWrapper';
import { useExpenseStore } from '@/lib/store';

export default function DashboardScreen() {
  const updateExpense = useExpenseStore((state) => state.updateExpense)

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
          updateExpense(data)
          
        } catch (error) {
          console.error('Error extracting file data:', error);
        }
      };

      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  return (
    <ThemedView style={styles.viewContainer}>
      <View style={styles.uploadContainer}>
        <Link href="/camera-screen" asChild>
          <Button mode="contained" icon="camera">Upload with camera</Button>
        </Link>
        <Button onPress={handleFileUpload} mode='contained' icon='file'>Upload from device</Button>
      </View>

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
  uploadContainer: {
    width: '60%',
    gap: 10
  }
});
