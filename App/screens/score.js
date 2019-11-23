//////////////////////////////////////////////////////////////////////////////////////
// Screen that displays the performance of the user in the last quiz. Uses a progress
//  circle to give a better visual reference of their score.
//////////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';


const styles = StyleSheet.create({
    defaultView: {
        backgroundColor: '#36b1f0',
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        paddingTop: 20,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '500',
        justifyContent: 'center',
        textAlign: 'center',
    },
    resultsText: {
        color: '#fff',
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center'
    }
}) 

class Score extends React.Component {
    state= {
        playerScore: this.props.navigation.getParam('correct'),
        questionCount: this.props.navigation.getParam('questions'),
    };

    render() {
        return (
            <View style={[styles.defaultView, {backgroundColor: this.props.navigation.getParam('color')}]}>
                <SafeAreaView>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{`${this.props.navigation.getParam('title')}`} Quiz Scores!</Text>
                        {this.state.playerScore === this.state.questionCount ? (
                            // if the player scored perfectly display a special message.
                            <Text style={styles.resultsText}>Congratulations you got everything correct!!!</Text>
                        ) : (
                            // otherwise just tell them how they did.
                            <Text style={styles.resultsText}>{`You got ${this.state.playerScore} questions right out of ${this.state.questionCount}!`}</Text>
                        )}
                        <View style={{justifyContent: 'center', flexDirection: 'row', paddingTop: 10}}>
                            <ProgressCircle
                                percent={this.state.playerScore / this.state.questionCount * 100}
                                radius={50}
                                borderWidth={8}
                                color="#3399FF"
                                shadowColor="#999"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 18 }}>{`${this.state.playerScore / this.state.questionCount * 100}%`}</Text>
                            </ProgressCircle>
                        </View>
                    </View>
                    <View style={styles.title}/>
                </SafeAreaView>
            </View>
        );
    }


}

export default Score;