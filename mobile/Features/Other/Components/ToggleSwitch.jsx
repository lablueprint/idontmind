import React from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-switch';
import PropTypes from 'prop-types';
import styles from '../../Options/PushNotificationsStyle';

function ToggleSwitch({ label, value, onValueChange }) {
  const handleValueChange = () => {
    onValueChange(label);
  };

  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleContainerText}>
        {label}
      </Text>
      <Switch
        backgroundActive="#404040"
        backgroundInactive="#53504C33"
        activeText=""
        inActiveText=""
        value={value}
        onValueChange={handleValueChange}
        barHeight={24}
        circleSize={20}
        switchWidthMultiplier={2.6}
        circleBorderWidth={0}
      />
    </View>
  );
}

export default ToggleSwitch;
ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
