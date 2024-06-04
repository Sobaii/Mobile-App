import { StyleSheet, StatusBar, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';

let statusBarHeight = 0;
if (Platform.OS === 'ios') {
  statusBarHeight = StatusBar.currentHeight || 20; // Default height for iOS status bar
} else {
  statusBarHeight = StatusBar.currentHeight || 0;
}

export default function DashboardScreen() {
  return (
    <ThemedView style={styles.viewContainer}>
      
      <Link href="/camera-screen" asChild>
        <Button mode="contained" icon="camera">Upload with camera</Button>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    paddingTop: statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    marginVertical: 10,
  },
});
