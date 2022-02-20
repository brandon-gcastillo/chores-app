import { Image } from 'react-native';

// Logo
import LogoImage from '../assets/app_logo.png';

const Logo = ({resizeMode, styleClass}) => (
    <Image 
        source={LogoImage}
        resizeMode={resizeMode}
        style={styleClass}
    />
);

export default Logo;