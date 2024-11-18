import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Text, View, TextInput, Button, ActivityIndicator } from "react-native";
import {
  check,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from "react-native-permissions";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import MapViewDirections from 'react-native-maps-directions'
import LoginButton from "@/components/buttons/LoginButton";
import { GooglePlaceDetail, GooglePlacesAutocomplete, Point } from 'react-native-google-places-autocomplete'

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [destination, setDestination] = useState<GooglePlaceDetail | null>(null);
  const [findDistance, setFindDistance] = useState(false);
  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [mode, setMode] = useState<"DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING">("BICYCLING")

  const checkForPermission = () => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            "This feature is not available (on this device / in this context)"
          );
          break;
        case RESULTS.DENIED:
          console.log(
            "The permission has not been requested / is denied but requestable"
          );
          break;
        case RESULTS.GRANTED:
          console.log("The permission is granted");
          break;
        case RESULTS.BLOCKED:
          console.log("The permission is denied and not requestable anymore");
          break;
      }
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
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
      
      <Text className="mt-14">Current Destination: { destination?.formatted_address }</Text>
      <Text>Arrival ETA: {Math.floor(travelTime!)}</Text>
      <Button
        onPress={() => setFindDistance(true)}
        title="Find Distance"
      />
      
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
          
          className=" w-[90%] h-[80%]"
        > 
          { findDistance ? (
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }}
              destination={{
                latitude: destination!.geometry.location.lat,
                longitude: destination!.geometry.location.lng
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
