import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, View, useColorScheme, Text, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useExpenseStore } from '@/lib/store';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const clearExpenses = useExpenseStore((state) => state.clearExpenses)
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await signOut()
      clearExpenses()
    }
    catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      return
    }
  }

  const colorScheme = useColorScheme()
  const styles = getStyles(colorScheme === 'dark')

  const renderItem = (iconName: any, title: string) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={iconName} size={24} style={{ ...styles.itemDescription, marginRight: 10 }} />
        <Text style={styles.itemDescription}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} style={styles.itemDescription} />
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#e5e7eb', dark: '#030712' }}
      headerImage={<Ionicons size={310} name="person-circle" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">My Profile</ThemedText>
      </ThemedView>
      <View style={styles.userContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="person-circle" size={48} style={{ ...styles.itemDescription, marginRight: 10 }} />
          <View style={{ flexDirection: 'column' }}>
            <ThemedText style={{ fontWeight: '500' }}>{user?.firstName} {user?.lastName}</ThemedText>
            {user?.emailAddresses && (
              <ThemedText style={{ fontSize: 12 }}>{user.emailAddresses[0].emailAddress}</ThemedText>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="exit-outline" size={24} style={styles.itemDescription} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        {renderItem('list-circle-outline', 'Account Details')}
        {renderItem('cog-outline', 'Settings')}
        {renderItem('wallet-outline', 'Sobaii Wallet')}
        {renderItem('shield-checkmark-outline', 'Authorized Services')}
      </View>
    </ParallaxScrollView>
  );
}

export const getStyles = (isDark: boolean) => {
  const c = isDark ? Colors.dark : Colors.light

  const styles = StyleSheet.create({
    headerImage: {
      color: c.primary,
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    userContainer: {
      marginBottom: 12,
      backgroundColor: c.secondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 50
    },
    section: {
      marginTop: 12,
    },
    itemContainer: {
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: c.border
    },
    itemDescription: {
      color: c.text,
      fontWeight: '500'
    }
  });

  return styles
}