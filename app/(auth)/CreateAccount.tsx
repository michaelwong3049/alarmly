import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebaseConfig'
import { useRouter } from 'expo-router'

export default function CreateAccount() {
    const [username, setUsernmae] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const router = useRouter();

    const handleCreateAccount = async () => {
        if(password == confirmPassword) {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/(tabs)/")
        }
    }

    return (
        <View className="flex items-center mt-10">
            <TextInput
                className="w-[80%] border border-black rounded-[25px] px-8 py-4 mb-10" 
                onChangeText={(e) => setUsernmae(e)}
                placeholder="Username"
            />
            <TextInput
                className="w-[80%] border border-black rounded-[25px] px-8 py-4 mb-10" 
                onChangeText={(e) => setEmail(e)}
                placeholder="Email"
            />
            <TextInput
                className="w-[80%] border border-black rounded-[25px] px-8 py-4 mb-10" 
                onChangeText={(e) => setPassword(e)}
                placeholder="Password"
            />
            <TextInput
                className="w-[80%] border border-black rounded-[25px] px-8 py-4 mb-10" 
                onChangeText={(e) => setConfirmPassword(e)}
                placeholder="Confirm Password"
            />
            <TouchableOpacity
                className="bg-black rounded-[20px] px-12 py-4"
                onPress={() => handleCreateAccount()}
            >
                <Text className="text-white">
                    Create Account
                </Text>
            </TouchableOpacity>
        </View>
    )
}