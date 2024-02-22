import {
  Text, View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

function TokenInput({ route, navigation }) {
  const { token, email, curUser } = route.params;
  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  if (parseInt(value, 10) === token) {
    navigation.navigate('Reset Password', { curUser });
    setValue('');
  }

  return (
    <View style={{ marginTop: '20%' }}>
      <Text>
        {token}
      </Text>
      <Text>
        Reset Password
      </Text>
      <Text>
        Enter the 6-digit code that was sent to your email to reset your password.
      </Text>
      <Text>
        Sent to
        {email}
      </Text>
      <View>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

TokenInput.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default TokenInput;
