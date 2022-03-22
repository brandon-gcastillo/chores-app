import { View, ActivityIndicator } from 'react-native';

const Loading = () => (
    <View style={{flex: 1, backgroundColor: "#ebebeb", justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);

export default Loading;