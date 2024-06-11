import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuthStore, useExpenseStore } from '@/lib/store';

export default function ProfileScreen() {
  const updateIsAuthenticated = useAuthStore((state) => state.updateIsAuthenticated)
  const clearExpenses = useExpenseStore((state) => state.clearExpenses)  

  const handleLogout = async () => {
    updateIsAuthenticated(false)
    clearExpenses()
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person-circle" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">My Profile</ThemedText>
      </ThemedView>
      <TouchableOpacity onPress={handleLogout}>
        <ThemedText>Logout</ThemedText>
      </TouchableOpacity>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
