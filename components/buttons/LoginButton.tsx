import { View, Text } from 'react-native'
import { Link } from 'expo-router'

export default function LoginButton() {
    return(
        <View className="border border-black rounded-[25px] py-1 px-5 mt-5">
            <Link href="/sign-in">
                Login
            </Link>
        </View>
    )
}