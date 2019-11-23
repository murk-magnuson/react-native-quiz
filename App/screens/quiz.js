////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main quiz screen where the user is shown a question and four possible answers for them to pick from.
////////////////////////////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, StatusBar, load } from 'react-native';
import { Audio } from 'expo-av';

import { Button, ButtonContainer } from '../components/button';
import { Alert } from '../components/alert';
import { updateScore } from '../util/scoreStorage';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#36b1f0',
        flex: 1,
        paddingHorizontal: 20,
    },
    text: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        letterSpacing: -.02,
        fontWeight: '600',
    },
    safearea: {
        flex: 1,
        marginTop: 100,
        justifyContent: 'space-between'
    }
});

async function playSound(soundToPlay) {         // Asynchronous functions operate as individual threads
    try {

        const Sound = new Audio.Sound();        // Initialize our sound object. Since this is its own thread we can
        await Sound.loadAsync(soundToPlay);     // call this function multiple times at once with little to no issue
        await Sound.playFromPositionAsync(0);   // We could call playAsync() however strange issues can arise under the hood

    } catch (err) {
        console.log(err);
    }
}

class Quiz extends React.Component {
    state = {
        correctCount: 0,
        totalCount: this.props.navigation.getParam('questions', []).length,
        currentQuestion: 0,
        answerCorrect: null,
        answered: false,
    };

    // Storing our sounds in this manner makes managing them easier, as well as improve loading time
    sounds = {                                      
        cheer: require('../assets/cheer.wav'),
        boo: require('../assets/boo.wav')
    }

    // Function to handle whether or not the user input was correct in answering the question.
    //  Plays a sound corresponding to whether or not they were correct.
    ///////////////////////////////////////////////////////////////////////////////////////////
    answer = (correct) => {
        this.setState(state => {
            const nextState = { answered: true };

            if (correct) {
                nextState.correctCount = state.correctCount + 1;
                nextState.answerCorrect = true;
                playSound(this.sounds.cheer);
            } else {
                nextState.answerCorrect = false;
                playSound(this.sounds.boo);
            }

            return nextState;
        }, () => {
            setTimeout(() => this.nextQuestion(), 750);
        });
    }

    // Increments the question and checks if the user has completed the quiz.
    //////////////////////////////////////////////////////////////////////////
    nextQuestion = () => {
        this.setState(state => {
            let nextQ = state.currentQuestion + 1;

            if (nextQ >= state.totalCount) {
                updateScore({ Qvalue: state.totalCount, Avalue: state.correctCount});
                this.props.navigation.pop(); // Pop prevents navigation back to the quiz screen
                this.props.navigation.navigate('Score', {
                    questions: state.totalCount,
                    correct: state.correctCount,
                    color: this.props.navigation.getParam('color'),
                    title: `${this.props.navigation.getParam('title')}`
                })
                nextQ = 0; // If they still somehow manage to get back to this screen loop quiz to first question to prevent errors.
            }

            return {
                currentQuestion: nextQ,
                answered: false
            };
        });
    }
    
    render() {
        const questions = this.props.navigation.getParam('questions', []);
        const question = questions[this.state.currentQuestion];

        return (
            <View style={[styles.container, { backgroundColor: this.props.navigation.getParam('color') }]}>
                <StatusBar barStyle='light-content'/>
                <SafeAreaView style={styles.safearea}>
                    <View>
                        <Text style={styles.text}>{question.question}</Text>
                        <ButtonContainer>
                            {question.answers.map(answer => (
                                <Button key={answer.id} text={answer.text} onPress={() => this.answer(answer.correct)} />
                            ))}
                        </ButtonContainer>
                     </View>
                    <Text style={styles.text}>{`${this.state.correctCount}/${this.state.totalCount}`}</Text>
                </SafeAreaView>
                <Alert correct={this.state.answerCorrect} visible={this.state.answered}/>
            </View>
        );
    }
}

export default Quiz;