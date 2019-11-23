////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Not my code, code by Spencer Carli ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import spaceQuestions from '../data/space';
import westernQuestions from '../data/westerns';
import computerQuestions from '../data/computers';
import { RowItem } from '../components/rowItem';

export default ({ navigation }) => (
    <View style={{justifyContent: 'flex-end', flex: 1}}>
        <ScrollView>
            <RowItem name= 'Space' color='#36b1f0' onPress= {() => navigation.navigate('Quiz', { title: 'Space', questions: spaceQuestions, color: '#36b1f0' })}/>
            <RowItem name= 'Western' color='#799496' onPress= {() => navigation.navigate('Quiz', { title: 'Western', questions: westernQuestions, color: '#799496' })}/>
            <RowItem name= 'Computer' color='#49475b' onPress= {() => navigation.navigate('Quiz', { title: 'Computer', questions: computerQuestions, color: '#49475b' })}/>
        </ScrollView>
        <View>
            <RowItem
                name= 'Overall Results'
                color='#58008f'
                onPress= {() => navigation.navigate('totalScore')}
            />
        </View>
    </View>
)