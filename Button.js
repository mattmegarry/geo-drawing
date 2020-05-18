import type {Node} from 'react'; //What is this???
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  button: {
    flex: 0.3,
    backgroundColor: 'red',
    color: 'white',
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default function Button(props) {
  const {onPress, buttonMessage} = props;
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPress();
        }}>
        <Text style={styles.buttonText}>{buttonMessage}</Text>
      </TouchableOpacity>
    </>
  );
}
