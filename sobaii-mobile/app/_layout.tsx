import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavLightTheme, NavDarkTheme } from '@/constants/Colors';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo"
import { StripeProvider } from '@stripe/stripe-react-native';
import { tokenCache } from '@/lib/clerk/tokenCache';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const stripePublishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

if (!clerkPublishableKey || !stripePublishableKey) {
  throw new Error('Missing Publishable Keys. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY, EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY in your .env')
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey}>
      <ClerkLoaded>
        <StripeProvider publishableKey={stripePublishableKey}>
          <ThemeProvider value={colorScheme === 'dark' ? NavDarkTheme : NavLightTheme}>
            <RootSiblingParent>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
                <Stack.Screen name="camera-screen" options={{ headerShown: false }} />
                <Stack.Screen name='expense-manager-screen' />
                <Stack.Screen name='identity-configuration-screen' />
                <Stack.Screen name='app-settings-screen' />
                <Stack.Screen name='wallet-screen' />
                <Stack.Screen name="+not-found" />
              </Stack>
            </RootSiblingParent>
          </ThemeProvider>
        </StripeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
