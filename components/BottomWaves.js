import { View, Image } from 'react-native';

// Wave Image
import Wave from '../assets/wave_login.png'

const BottomWaves = () => (
    <View style={{justifyContent: "flex-end", flex: 1}}>
        <Image source={Wave} style={{height: 94, width: 420}} resizeMode="cover" />
    </View>
);

export default BottomWaves;