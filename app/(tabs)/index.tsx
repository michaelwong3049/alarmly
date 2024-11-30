import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Text, View, TouchableOpacity } from "react-native";
import TransitMode from "@/components/buttons/TransitMode";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { fetchLocationAlways } from '@/utils/utils'

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [destination, setDestination] = useState<GooglePlaceDetail | null>(null);
  const [findDistance, setFindDistance] = useState(false);
  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [mode, setMode] = useState<"DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING">("DRIVING")

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
        />
      </View>
      
      <View>
        <Text className="mt-14">Current Destination: { destination?.formatted_address }</Text>
        <Text className="mb-2">Arrival ETA: {Math.floor(travelTime!)}</Text>
        <TransitMode setMode={setMode}/>
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
