import { View, Text, Button, TextInput, Modal, TouchableOpacity } from 'react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '@/firebaseConfig'
import { db } from '@/firebaseConfig'
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'

export default function Alarms() {
    const [username, setUsername] = useState<string | null>(null)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [alarmName, setAlarmName] = useState<string | null>(null)
    const [startingLocation, setStartingLocation] = useState<string | null>(null)
    const [destination, setDestination] = useState<string | null>(null)
    const [transitType, setTransitType] = useState<string | null>(null)
    
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setUsername(user.email)
        }
    })

    const handleCreateAlarm = async () => {
        if(!username) {
            return
        } 

        try {
            const docRef = doc(db, "users", username)
            console.log(docRef)
            await setDoc(docRef, {})
            const savedAlarmsCollectionRef = collection(db, "users", username, "savedAlarms")

            if(!alarmName) {
                return
            }

            const alarmDocRef = doc(savedAlarmsCollectionRef, alarmName)
            await setDoc(alarmDocRef, {
                startingLocation: startingLocation,
                destination: destination,
                transitType: transitType
            })
        } catch(error) {
            console.error(error)
        }

    }

    return(
        <View>
            <Text>  
                Hi, {username}
            </Text>
            <Button
                onPress={() => setModalVisibility(true)}
                title="Create"
            />

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisibility}
                onRequestClose={() => {
                    setModalVisibility(true)
                }}
            >
            <View className="flex-1 justify-center items-center bg-black/50" >
                <View className="bg-white border border-black rounded-[10px] p-36">
                    <TextInput
                        onChangeText={(text) => setAlarmName(text)}
                        className="w-11/12 border border-black rounded-[25px] px-3 mb-4"
                        placeholder="Alarm Name..."
                    />
                    <TextInput
                    onChangeText={(text) => setStartingLocation(text)}
                        className="w-11/12 border border-black rounded-[25px] px-3 mb-4"
                        placeholder="Set Starting Location..."
                    />
                    <TextInput
                        onChangeText={(text) => setDestination(text)}
                        className="w-11/12 border border-black rounded-[25px] px-3 mb-4"
                        placeholder="Set Destination..."
                    />
                    <TextInput
                        onChangeText={(text) => setTransitType(text)}
                        className="w-11/12 border border-black rounded-[25px] px-3 mb-4"
                        placeholder="Transit Type..."
                    />
                    <TouchableOpacity
                        className="bg-blue-400 px-4 py-1 flex justify-center rounded-[15px]"
                        onPress={handleCreateAlarm}
                    >                            
                        <Text className="text-white">
                            Create Alarm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
            
        </View>
    )
}   