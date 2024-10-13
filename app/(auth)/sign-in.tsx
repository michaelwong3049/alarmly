import { User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { View, Text, TextInput, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'

import CreateAccountButton from '@/components/buttons/CreateAccountButton'

export default function SignIn() {
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [signedIn, setSignedIn] = useState<User | null>(null)

    const handleSignIn = () => {
        console.log("Handling Sign In....")
        try{
            signInWithEmailAndPassword(auth, email, password)
        } catch(error) {
            console.log("error")
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setSignedIn(currentUser)
        })
    }, [])

    if(signedIn != null){
        return <Redirect href="/"/>
    }

    return(
        <View className="flex-1 justify-center items-center"> 
            <Text className="my-2 text-2xl">
                Please Login To Continue
            </Text>

            <TextInput 
                className="border bforder-black rounded-[25px] px-20 py-1"
                onChangeText={setEmail}
                placeholder="Enter email"
            />
            <TextInput
                className="border border-black rounded-[25px] px-20 py-1"
                onChangeText={setPassword}
                placeholder="Enter password"
            />
            <Button
                onPress={handleSignIn}
                title="Sign in"
            >
            </Button>

            <View>
                <Text>
                    Don't have an account?
                </Text>
                <CreateAccountButton/>
            </View>
        </View>
    )
}``