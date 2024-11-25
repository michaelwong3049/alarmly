import {
    check,
    PERMISSIONS,
    RESULTS,
} from 'react-native-permissions';
import * as Location from "expo-location";

export async function checkForPermissions() {
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

export async function fetchLocationAlways() {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
        return null;
    }
    
    let loc = await Location.getCurrentPositionAsync({});
      return loc
}
