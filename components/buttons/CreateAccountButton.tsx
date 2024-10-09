import { View, Text } from 'react-native'
import { Link } from  'expo-router'

export default function CreateAccountButton(){
    return(
        <View className="border border-black rounded-[25px] items-center p-1">
            <Link href="/create-account">
                Create Account
            </Link>
        </View>
    )
}