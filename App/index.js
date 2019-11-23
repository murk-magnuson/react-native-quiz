import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Quiz from './screens/quiz';
import QuizIndex from './screens/quizIndex';
import Score from './screens/score';
import totalScore from './screens/totalScore';

const mainStack = createStackNavigator({
    QuizIndex: {
        screen: QuizIndex,
        navigationOptions: {
            headerTitle: 'Quizes',

        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.getParam('title'),
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: navigation.getParam('color'),
                borderBottomColor: navigation.getParam('color'),
            }
        })
    },
    Score: {
        screen: Score,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: navigation.getParam('color'),
                borderBottomColor: navigation.getParam('color'),
            }
        })
    },
    totalScore: {
        screen: totalScore,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Total Score',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#58008f',
                borderBottomColor: '#58008f',
                
            }
        })
    }
});

export default createAppContainer(mainStack);