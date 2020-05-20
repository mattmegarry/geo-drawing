import type {Node} from 'react'; //What is this???
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import FusedLocation from 'react-native-fused-location';
import Canvas from 'react-native-canvas';
import useInterval from './useInterval';

export default function Drawer() {
  const [path, setPath] = useState([]);
  const [canvasDimensions, setCanvasDimensions] = useState([150, 300]);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(
    false,
  );
  const canvasRef = React.useRef(null);

  function getCanvasDimensions(event) {
    const {width, height} = event.nativeEvent.layout;
    setCanvasDimensions([width, height]);
  }

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'App needs to access your location',
        message:
          'App needs access to your location ' +
          'so we can let our app be even more awesome.',
      },
    )
      .then(granted => {
        setLocationPermissionGranted(granted);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasDimensions[0];
    canvas.height = canvasDimensions[1];
    const ctx = canvas.getContext('2d');

    let minX, minY, maxX, maxY;
    path.forEach((p, i) => {
      if (i === 0) {
        minX = maxX = p[0];
        minY = maxY = p[1];
      } else {
        minX = Math.min(p[0], minX);
        minY = Math.min(p[1], minY);
        maxX = Math.max(p[0], maxX);
        maxY = Math.max(p[1], maxY);
      }
    });

    const constrainingDimension = Math.min(canvas.width, canvas.height);

    function getScaledX(x) {
      const position = (x - minX) / (maxX - minX);
      return constrainingDimension * position;
    }
    function getScaledY(y) {
      const position = (y - minY) / (maxY - minY);
      return constrainingDimension * position;
    }

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    path.forEach(p => {
      ctx.lineTo(getScaledX(p[0]), getScaledY(p[1]));
    });
    ctx.stroke();
  });

  useInterval(() => {
    if (locationPermissionGranted) {
      FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);

      FusedLocation.getFusedLocation(true)
        .then(location => {
          const latestCoordinates = [[location.longitude, location.latitude]];
          console.log(location);
          setPath(path.concat(latestCoordinates));
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  }, 1000);

  return (
    <View onLayout={getCanvasDimensions}>
      <Canvas style={styles.canvas} ref={canvasRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    height: '100%',
  },
});
