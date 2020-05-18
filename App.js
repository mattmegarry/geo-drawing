import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import Button from './Button.js';
import Drawer from './Drawer.js';

const App: () => React$Node = () => {
  const [drawing, setDrawing] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('Start');

  const onPress = () => {
    setDrawing(drawing => (drawing ? false : true));
    setButtonMessage(buttonMessage =>
      buttonMessage === 'Start' ? 'Stop' : 'Start',
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>GeoDrawing</Text>
        </View>
        <View style={styles.drawContainer}>{drawing ? <Drawer /> : null}</View>
        <View style={styles.buttonsContainer}>
          <Button onPress={onPress} buttonMessage={buttonMessage} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  drawContainer: {
    backgroundColor: '#cdcdcd',
    justifyContent: 'center',
    flex: 1,
    flexGrow: 1,
    padding: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
  },
});

export default App;
