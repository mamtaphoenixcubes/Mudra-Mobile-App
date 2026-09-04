import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider as MudraThemeProvider } from '@/constants/ThemeContext';
import '@/constants/i18n';
import { LanguageProvider } from '@/constants/LanguageContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useInitAnonymousAuth } from '@/hooks/useInitAnonymousAuth';
import { useChatAssignmentNotifier } from '@/hooks/useChatAssignmentNotifier';
import { useReminderNotificationActions } from '@/hooks/useReminderNotificationActions';
import { useNotificationLogger } from '@/hooks/useNotificationLogger';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  useInitAnonymousAuth();
  useChatAssignmentNotifier();
  useReminderNotificationActions();
  useNotificationLogger();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <MudraThemeProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {/* <Stack> */}
            <Stack screenOptions={{ headerBackTitle: '' }}>
              <Stack.Screen name="index" options={{ headerShown: false }} />

              {/* Tabs entry point */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="sleepmode" options={{ headerShown: false }} />
              <Stack.Screen name="mudradetail" options={{ headerShown: false }} />
              <Stack.Screen name="mudraoftheday" options={{ headerShown: false }} />
              <Stack.Screen name="browse" options={{ headerShown: false }} />
              <Stack.Screen name="mudrameditation" options={{ headerShown: false }} />
              <Stack.Screen name="sessionplayer" options={{ headerShown: false }} />
              <Stack.Screen name="mudrasessionplayer" options={{ headerShown: false }} />
              <Stack.Screen name="moodresults" options={{ headerShown: false }} />
              <Stack.Screen name="practicemode" options={{ headerShown: false }} />

              <Stack.Screen name="needdetail" options={{ headerShown: false }} />
              <Stack.Screen name="elementtracker" options={{ headerShown: false }} />
              <Stack.Screen name="elementdetail" options={{ headerShown: false }} />
              <Stack.Screen name="recentactivity" options={{ headerShown: false }} />
              <Stack.Screen name="progressinsights" options={{ headerShown: false }} />
              <Stack.Screen name="practiceanalysis" options={{ headerShown: false }} />
              <Stack.Screen name="reminders" options={{ headerShown: false }} />
              <Stack.Screen name="saved" options={{ headerShown: false }} />
              <Stack.Screen name="savedempty" options={{ headerShown: false }} />
              <Stack.Screen name="subscription" options={{ headerShown: false }} />
              <Stack.Screen name="plandetail" options={{ headerShown: false }} />
              <Stack.Screen name="myplaylists" options={{ headerShown: false }} />
              <Stack.Screen name="playlistdetail" options={{ headerShown: false }} />
              <Stack.Screen name="playlistcategoryselect" options={{ headerShown: false }} />

              <Stack.Screen name="search" options={{ headerShown: false }} />
              <Stack.Screen name="dailystreak" options={{ headerShown: false }} />
              <Stack.Screen name="sessioncomplete" options={{ headerShown: false }} />
              <Stack.Screen name="nidradetail" options={{ headerShown: false }} />
              <Stack.Screen name="categorydetail" options={{ headerShown: false }} />

              <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
              <Stack.Screen name="auth/login" options={{ headerShown: false }} />
              <Stack.Screen name="auth/forgotpassword" options={{ headerShown: false }} />
              <Stack.Screen name="auth/verifyemail" options={{ headerShown: false }} />
              <Stack.Screen name="auth/resetpassword" options={{ headerShown: false }} />
              <Stack.Screen name="auth/success" options={{ headerShown: false }} />
              <Stack.Screen name="auth/personalise" options={{ headerShown: false }} />

              <Stack.Screen name="onboarding/splash" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding/welcome" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding/carousel" options={{ headerShown: false }} />

              <Stack.Screen name="notifications" options={{ headerShown: false }} />
              <Stack.Screen name="helpsupport" options={{ headerShown: false }} />
              <Stack.Screen name="terms" options={{ headerShown: false }} />
              <Stack.Screen name="privacy" options={{ headerShown: false }} />
              <Stack.Screen name="about" options={{ headerShown: false }} />
              <Stack.Screen name="calendar" options={{ headerShown: false }} />

              <Stack.Screen name="chat" options={{ headerShown: false }} />
              <Stack.Screen name="helparticle" options={{ headerShown: false }} />
              <Stack.Screen name="helpcenter" options={{ headerShown: false }} />
              <Stack.Screen name="videotutorials" options={{ headerShown: false }} />
              <Stack.Screen name="updates" options={{ headerShown: false }} />

              <Stack.Screen name="editprofile" options={{ headerShown: false }} />

              {/* <Stack.Screen name="asana" options={{ headerShown: false }} /> */}
              <Stack.Screen name="asanadetail" options={{ headerShown: false }} />
              <Stack.Screen name="asanaplayer" options={{ headerShown: false }} />
              <Stack.Screen name="asanalist" options={{ headerShown: false }} />

              {/* <Stack.Screen name="pranayama" options={{ headerShown: false }} /> */}
              <Stack.Screen name="pranayamalist" options={{ headerShown: false }} />
              <Stack.Screen name="pranayamadetail" options={{ headerShown: false }} />
              <Stack.Screen name="pranayamaplayer" options={{ headerShown: false }} />
              <Stack.Screen name="pranayamameditation" options={{ headerShown: false }} />
              <Stack.Screen name="pranayamapracticemode" options={{ headerShown: false }} />

              {/* <Stack.Screen name="meditation" options={{ headerShown: false }} /> */}
              <Stack.Screen name="meditationdetail" options={{ headerShown: false }} />
              <Stack.Screen name="meditationplayer" options={{ headerShown: false }} />
              <Stack.Screen name="meditationlist" options={{ headerShown: false }} />
              <Stack.Screen name="meditationpage" options={{ headerShown: false }} />
              <Stack.Screen name="meditationpracticemode" options={{ headerShown: false }} />

              <Stack.Screen name="contactus" options={{ headerShown: false }} />
              <Stack.Screen name="ticketdetail" options={{ headerShown: false }} />


            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </MudraThemeProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}