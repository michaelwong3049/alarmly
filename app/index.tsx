import { View, Text } from 'react-native'
import { Link } from 'expo-router'

import CreateAccountButton from '@/components/buttons/CreateAccountButton'

export default function Open(){
    return (
        <View className="flex-1 justify-center items-center my-5">
            <Text className="text-3xl my-5">
                Welcome To Alarmly 👋
            </Text>

            <CreateAccountButton/>
        </View>
    )
}