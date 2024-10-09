import { View, Text, TextInput } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react'

import CreateAccountButton from '@/components/buttons/CreateAccountButton'

export default function SignIn() {
    const[username, setUsername] = useState('') 

    return(
        <View className="flex-1 justify-center items-center"> 
            <Text className="my-2 text-2xl">
                Please Login To Continue
            </Text>
            <TextInput 
                className="border border-black rounded-[25px] px-20 py-1"
                onChangeText={setUsername}
            />
            <View>
                <Text>
                    Don't have an account?
                </Text>
                <CreateAccountButton/>
            </View>
        </View>
    )
}