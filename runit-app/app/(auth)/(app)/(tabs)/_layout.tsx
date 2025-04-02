import { Colors, Typography } from '@/styles'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useAuth } from '@/contexts/auth-context'
import { useClub } from '@/contexts/club-context'

export default () => {
    const { authState } = useAuth();
    const { clubState } = useClub();

    return (
        <Tabs
            //initialRouteName='my-child'
            backBehavior='history' 
            screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 90,
                borderTopColor: Colors.PRIMARY_800,
                backgroundColor: Colors.PRIMARY_100
            }, tabBarLabelStyle: {
                fontSize: Typography.FONT_SIZE_12,
            }, tabBarActiveTintColor: Colors.PRIMARY_800
        }}>
            <Tabs.Screen
                name="discovery/index"
                options={{
                    title: "Discovery",
                    tabBarIcon: ({ color }) => <Ionicons name="compass-outline" style={{ fontSize: 32, color:color }} />

                }} />

            <Tabs.Screen
                name="feed"
                options={{
                    title: "Runs",
                    tabBarIcon: ({ color }) => <Ionicons name="footsteps-outline" style={{ fontSize: 32, color:color }} />
                }} />

            <Tabs.Screen
                name="club"
                options={{
                    title: "Club",
                    href: `/club/${clubState?.club}`,
                    tabBarIcon: ({ color }) => <Ionicons name="aperture-outline" style={{ fontSize: 32, color:color }} />
                }} />

            <Tabs.Screen
                name="user"
                options={{
                    href: `/user/${authState?.user}`,
                    title: "User",
                    tabBarIcon: ({ color }) => <Ionicons name="person-outline" style={{ fontSize: 32, color:color }} />,
                }} />
        </Tabs>
    )
}