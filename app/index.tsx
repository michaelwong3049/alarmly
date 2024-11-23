import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useState,useEffect } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import LoginModal from '@/components/LoginModal'
import { useRouter } from 'expo-router'

export default function Open(){
    const [user, setUser] = useState<User | null>(null)
    const [modalVisibility, setModalVisibility] = useState(false)
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                router.push("/(tabs)/")
            }
        }) 
    }, [])

    const handleSignOut = () => {
        console.log("butto is being pressed")
        signOut(auth).then(() => {
            console.log("sign out successful")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <View className="flex-1 justify-center items-center my-5">
            <Text className="text-3xl my-5">
                Welcome To Alarmly 👋
            </Text>

            <TouchableOpacity
                className="border border-black px-5 py-2 rounded-[25px]"
                onPress={() => setModalVisibility(true)}
            >
                <Text>
                    Continue
                </Text>
            </TouchableOpacity>

            {modalVisibility ? (
                <LoginModal/>
            ) : (
                <View/>
            )}

            <Button
                onPress={() => handleSignOut()}
                title="sign out"
            />
        </View>
    )
}