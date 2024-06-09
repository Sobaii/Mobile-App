import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import { testConnection } from '@/lib/ocr-service/callWrapper';

export default function DashboardScreen() {

  const handleFileUpload = async () => {
    const res = await DocumentPicker.getDocumentAsync({
    })
    console.log(res)
    const test = await testConnection('hello tony')
    console.log(test)
    if (res.canceled) {
      return
    }
  }

  return (
    <ThemedView style={styles.viewContainer}>
      <Link href="/camera-screen" asChild>
        <Button mode="contained" icon="camera">Upload with camera</Button>
      </Link>
      <Button onPress={handleFileUpload} mode='contained' icon='file'>Upload file</Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
});
