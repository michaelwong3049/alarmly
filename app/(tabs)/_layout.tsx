import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeLayout() {
  return(
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile"
        }}
      />
    </Tabs>
  )
}