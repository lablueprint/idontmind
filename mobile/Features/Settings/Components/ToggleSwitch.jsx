import React from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../Screens/PushNotificationsStyle';

function ToggleSwitch({ label, value, onValueChange }) {
  const handleValueChange = () => {
    onValueChange(label);
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={styles.timeOfDayContainer}>
        <Text style={styles.timeOfDayText}>
          {label}
        </Text>
        <Switch
          backgroundActive="#404040"
          backgroundInactive="lightgray"
          activeText=""
          inActiveText=""
          value={value}
          onValueChange={handleValueChange}
          barHeight={24}
          circleSize={22}
          switchWidthMultiplier={2.3}
          circleBorderWidth={0}
        />
      </View>
    </View>
  );
}

export default ToggleSwitch;
ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};
