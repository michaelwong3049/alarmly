import { View, Text, Pressable } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { Link } from 'expo-router'
import { useState,useEffect } from 'react'
import LoginButton from '@/components/buttons/LoginButton'

type currentUser = {
    user: string
}

export default function Open(){
    const [user, setUser] = useState<currentUser | null>(null)
    
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(user)
        })
    }, [])

    return (
        <View className="flex-1 justify-center items-center my-5">
            <Text className="text-3xl my-5">
                Welcome To Alarmly 👋
            </Text>

            <View className="border border-black rounded-[25px]px-5 py-1 ">
                <Link href="/(tabs)/">
                    Next
                </Link>
            </View>
        </View>
    )
}