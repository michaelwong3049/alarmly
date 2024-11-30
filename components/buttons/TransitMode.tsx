import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'

export default function TransitMode({ setMode }: { setMode: React.Dispatch<React.SetStateAction<"DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING">> }) {
    const [isWalking, setIsWalking] = useState(false)
    const [isBiking, setIsBiking] = useState(false)
    const [isTransit, setIsTransit] = useState(false)
    const [isDriving, setIsDriving] = useState(false)

    useEffect(() => {
        if(isWalking) {
            setMode("WALKING")
        } else if(isBiking) {
            setMode("BICYCLING")
        } else if(isTransit) {
            setMode("TRANSIT")
        } else if(isDriving) {
            setMode("DRIVING")
        }
    })
    
    return ( 
        <View className="flex flex-row space-x-4">
            <TouchableOpacity
                className={`border-2 border-yellow-500 bg-yellow-200 transform ${isWalking === true ? "scale-125" : "scale-100"} px-3 py-1 rounded-[25px]`}
                onPress={() => {
                    setIsWalking(true)
                    setIsBiking(false)
                    setIsTransit(false)
                    setIsDriving(false)
                }}
            >
                <Text>
                    Walking
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={`border-2 border-blue-500 bg-blue-200 transform ${isBiking === true ? "scale-125" : "scale-100"} px-3 py-1 rounded-[25px]`}
                onPress={() => {
                    setIsWalking(false)
                    setIsBiking(true)
                    setIsDriving(false)
                    setIsTransit(false)
                }}
            >
                <Text>
                    Biking
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={`border-2 border-green-500 bg-green-200 transform ${isTransit === true ? "scale-125" : "scale-100"} px-3 py-1 rounded-[25px]`}
                onPress={() => {
                    setIsWalking(false)
                    setIsBiking(false)
                    setIsTransit(true)
                    setIsDriving(false)
                }}
            >
                <Text>
                    Transit
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={`border-2 border-red-500 bg-red-200 transform ${isDriving === true ? "scale-125" : "scale-100"} px-3 py-1 rounded-[25px]`}
                onPress={() => {
                    setIsWalking(false)
                    setIsBiking(false)
                    setIsTransit(false)
                    setIsDriving(true)
                }}
            >
                <Text>
                    Driving
                </Text>
            </TouchableOpacity>
        </View>
    )
}