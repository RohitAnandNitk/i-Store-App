import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const InputBox = ({ value, setValue, autoComplete, placeholder, autoCorrect, secureTextEntry }) => {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        onChangeText={setValue}  // ✅ Correct way to update state in React Native
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    width: '80%',
    backgroundColor: '#ffffff',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10, // Added padding for better UX
  },
});

export default InputBox;
