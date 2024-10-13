import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
        <MapView 
          provider={ PROVIDER_GOOGLE }
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          zoomEnabled={true}
          showsUserLocation
          style={{height: '100%', width: '100%'}} /> 
    </View>
  );
}
