import { Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import TransitMode from "@/components/buttons/TransitMode";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { fetchLocationAlways } from '@/utils/utils'

export type transportationMode = "DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [destination, setDestination] = useState<GooglePlaceDetail | null>(null);
  const [findDistance, setFindDistance] = useState(false);
  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [mode, setMode] = useState<transportationMode>("DRIVING")

  const onModeSet = (mode: transportationMode) => {
    setMode(mode)
  }

  useEffect(() => {
    (async () => {
        setLocation(await fetchLocationAlways())
    })();
  }, []);

  return (
    <View className="flex items-center justify-center">
      <View className="w-full flex absolute top-0 z-50" >
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            setDestination(details)
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              height: 80,
              backgroundColor: "transparent",
              margin: 5
            },
            textInput: {
              height: 40,
              backgroundColor: "#c8c8c8",
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 25,
            }
          }}
        />
      </View>
      
      <View>
        <Text className="text-center font-bold underline mt-14">Current Destination: </Text>
        <Text className="text-center"> { destination?.formatted_address } </Text>
        <Text className="text-center mb-2">
          <Text className="underline font-bold">Arrival ETA:</Text>
          {''} { Math.floor(travelTime!) } minutes
         </Text>
        <TransitMode onModeSet={onModeSet} mode={mode}/>
        <TouchableOpacity
          className="flex items-center bg-purple-400 my-2 py-2 rounded-[25px]"
          onPress={() => {
            if(location) {
              setFindDistance(true)
            }
          }}
        >
          <Text>
            Find Distance
          </Text>
        </TouchableOpacity>
      </View>

      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          initialRegion={{
            latitude: location.coords.latitude, 
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          
          className=" w-[90%] h-[70%]"
        > 
          { findDistance && destination ? (
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude 
              }}
              destination={{
                latitude: destination?.geometry.location.lat,
                longitude: destination?.geometry.location.lng
              }}
              mode={mode}
              onReady={(result) => {
                setTravelTime(result.duration)
              }}
              apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!}
            /> 
          ) : ( 
              <View/> 
          )}
        </MapView>
      ) : ( <Text>Loading map... </Text> )}
    </View>
  );
}
