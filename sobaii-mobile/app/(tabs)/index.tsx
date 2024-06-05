import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';

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
    paddingTop: Constants.statusBarHeight,
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
