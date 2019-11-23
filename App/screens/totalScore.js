//////////////////////////////////////////////////////////////////////////////////
// Screen to display the users overall performance ratio. Gets the stored results
//  from all quizes done on a progress circle and displays the percentage in the
//  center of it.
//////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

import { getOverall, A_KEY, Q_KEY } from '../util/scoreStorage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#58008f',
        flexDirection: 'column'
    },
    header: {
        flex: 1,
        paddingTop: 20,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    headerText: {
        color: '#fff',
        fontSize: 30,
        justifyContent: 'center'
    },
    circle: {
        flex: 3,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    circleText: {
        color: '#fff',
        fontSize: 30
    }
})

const Screen = Dimensions.get('window');

class overallScore extends React.Component {
    state = {   // Initialize the values for our graph
        totalQuestions: 1,  // Initialized to 1 so we don't crash dividing by zero is the Asyncstorage fails!
        totalCorrect: 0
    }
    // Why do you have to be equal to something I don't understand you
    q = getOverall({KEY: Q_KEY}).then(value => {
        this.setState({totalQuestions: value});
    });
    // Use the imported keys to call the proper values from our JSON
    a = getOverall({KEY: A_KEY}).then(value => {
        this.setState({totalCorrect: value});
    });
   

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Your Overall Statistics:
                    </Text>
                    
                </View>
                <View style={styles.circle}>
                    <ProgressCircle 
                        percent={this.state.totalCorrect / this.state.totalQuestions * 100} 
                        radius={Screen.width / 3}
                        borderWidth={20}
                        color="#02700b"
                        shadowColor="#bf3d00"
                        bgColor="#58008f"
                    >
                        <Text style={styles.circleText}>{`${Math.floor(this.state.totalCorrect / this.state.totalQuestions * 100)}%`}</Text>
                    </ProgressCircle>
                </View>
            </View>
        );
    }
}

export default overallScore;