import { Tabs } from 'expo-router';
import Header from '@/components/home/Header';
import CustomTabBar from '@/components/home/CustomTabBar';
import SearchSvg from '@/assets/icons/search.svg';
import { router } from 'expo-router';
import SearchWhite from '@/assets/icons/searchWhite.svg'
import { useTheme } from '@/constants/ThemeContext'

function SearchHeader() {
  const { isDark } = useTheme()
  return (
    <Header
      rightIcon={isDark ? <SearchWhite width={22} height={22} /> : <SearchSvg width={22} height={22} />}
      onRightPress={() => router.push('/search')}
    />
  )
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', headerTitle: 'Mudras' }} />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          header: () => <SearchHeader />
        }}
      />
      <Tabs.Screen name="practice" options={{ title: 'Practice' }} />
      <Tabs.Screen
        name="nidra"
        options={{
          title: 'Nidra',
          header: () => <SearchHeader />
        }}
      />
      <Tabs.Screen
        name="asana"
        options={{
          title: 'Asana',
          header: () => <SearchHeader />
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          title: 'Meditation',
          header: () => <SearchHeader />
        }}
      /><Tabs.Screen
        name="pranayama"
        options={{
          title: 'Pranayama',
          header: () => <SearchHeader />
        }}
      />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>

  );
}