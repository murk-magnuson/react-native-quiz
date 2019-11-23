///////////////////////////////////////////////////////////////////////////////
// Simple screen displaying an image of a checkmark if correct and x if wrong.
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    circle: {
        backgroundColor: '#ff4136',
        width: screen.width / 2,
        height: screen.width / 2,
        borderRadius: screen.width / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    correctCircle: {
        backgroundColor: '#00820f'
    },
    icon: {
        width: screen.width / 3
    }
});

export const Alert = ({ correct, visible }) => {
    if (!visible) {return null}
    // Grabs the image based on the value passed in.
    const icon = correct ? require('../assets/check.png') : require('../assets/close.png')
    const circleStyles = correct ? [styles.circle, styles.correctCircle] : styles.circle;

    return (
        <View style={styles.container}>
            <View style={circleStyles}>
                <Image source={icon} style={styles.icon} resizeMode='contain'/>
            </View>
        </View>
    );
}