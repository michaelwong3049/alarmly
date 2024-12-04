import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { transportationMode } from '@/app/(tabs)'

export default function TransitMode({ onModeSet, mode }: { onModeSet: ( mode: transportationMode ) => void, mode: transportationMode }) {

    return ( 
        <View className="flex flex-row space-x-4">
            <TouchableOpacity
                className={`border-2 border-yellow-500 bg-yellow-200 transform ${mode === "WALKING" ? "scale-125" : "scale-100"} px-3 py-1 rounded-[25px]`}
                onPress={() => onModeSet("WALKING")}
            >
                <Text>
                    Walking
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={`border-2 border-blue-500 bg-blue-200 transform ${mode === "BICYCLING" ? "scale-125" : "scale-100"} px-3 py-1 rounded-[25px]`}
                onPress={() => onModeSet("BICYCLING")}
            >
                <Text>
                    Biking
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={`border-2 border-green-500 bg-green-200 transform ${mode === "TRANSIT" ? "scale-125" : "scale-100"} px-3 py-1 rounded-[25px]`}
                onPress={() => onModeSet("TRANSIT")}
            >
                <Text>
                    Transit
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={`border-2 border-red-500 bg-red-200 transform ${mode === "DRIVING" ? "scale-125" : "scale-100"} px-3 py-1 rounded-[25px]`}
                onPress={() => onModeSet("DRIVING")}
            >
                <Text>
                    Driving
                </Text>
            </TouchableOpacity>
        </View>
    )
}