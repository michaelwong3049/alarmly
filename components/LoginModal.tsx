import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { auth } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'expo-router'

export default function LoginModal() {
    const [modalVisibility, setModalVisibility] = useState(true)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const router = useRouter();

    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth, email, password).then(() => console.log("signed in with email and password"))
    }

    return(
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisibility}
            onRequestClose={() => {
                setModalVisibility(false)
            }}
        > 
            <View className="flex-1 justify-end bg-black/50">
                <View className="w-full h-4/5 bg-white border border-black rounded-[10px]">
                    <View className="flex-1 items-center">
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="gray"
                            className="w-[80%] border border-black px-4 py-4 rounded-[10px] mt-10 text-center"
                            onChangeText={(e) => setEmail(e)}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="gray"
                            className="w-[80%] border border-black px-4 py-4 rounded-[10px] mt-10 mb-10 text-center"
                            onChangeText={(e) => setPassword(e)}
                        />
                        <TouchableOpacity 
                            className="bg-black px-16 py-2 rounded-[15px]"
                            onPress={() => {
                                handleLogin()
                            }}
                        >
                            <Text className="text-white text-2xl">
                                Login
                            </Text>
                        </TouchableOpacity>
                        <Text className="text-gray-500 mt-4">Don't have an account?</Text>
                        <TouchableOpacity
                            className="bg-gray-300 px-4 py-1 rounded-[15px] mt-1"
                            onPress={() => router.push("/(auth)/CreateAccount") }
                        >
                            <Text>
                                Create Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> 
        </Modal>
    )
}