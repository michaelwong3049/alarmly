    import { createUserWithEmailAndPassword } from 'firebase/auth'
    import { auth } from "@/firebaseConfig"
    import { View, TextInput, Button } from 'react-native'
    import { useState } from 'react'

    export default function CreateAccount() {
        const [username, setUsername] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [confirmPassword, setConfirmPassword] = useState('')
        const [user, setUser] = useState()

        const handleSignUp = () => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    console.log("created account")
                })
        }

        return(
            <View className="flex-1 justify-center items-center">
                <TextInput 
                    className="border border-black rounded-[25px] w-11/12 py-4 my-4 text-center"
                    onChangeText={setUsername}
                    placeholder="Enter Username"
                />
                <TextInput 
                    className="border border-black rounded-[25px] w-11/12 py-4 my-4 text-center"
                    onChangeText={setEmail}
                    placeholder="Enter Email"
                />
                <TextInput 
                    className="border border-black rounded-[25px] w-11/12 py-4 my-4 text-center"
                    onChangeText={setPassword}
                    placeholder="Enter Password"
                />
                <TextInput 
                    className="border border-black rounded-[25px] w-11/12 py-4 my-4 text-center"
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                />
                <Button
                    onPress={handleSignUp} //was just {handleSignUp}
                    title="Create Account"
                >
                </Button>
                
            </View>
        )
    }