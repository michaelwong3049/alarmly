import { View, Text } from 'react-native'
import { Link } from 'expo-router'

export default function LoginButton() {
    return(
        <View className="border-2 border-black rounded-[20px] px-10 py-3 ">
            <Link href="/sign-in">
                Login
            </Link>
        </View>
    )
}