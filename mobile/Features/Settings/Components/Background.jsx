import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Svg, {
  Defs, Rect, LinearGradient, Stop,
} from 'react-native-svg';

const FROM_COLOR = 'rgb(255, 255, 255)';
const TO_COLOR = 'rgb(0, 102, 84)';

function Background({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <Svg height="100%" width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={FROM_COLOR} />
            <Stop offset="1" stopColor={TO_COLOR} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      { children }
    </View>
  );
}

Background.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Background;
