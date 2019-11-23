////////////////////////////////////////////////////////////////////////////
// Async storage to store and keep track of the users overall score amongst
//  all the quiz plays.
////////////////////////////////////////////////////////////////////////////

import { AsyncStorage } from "react-native";

export const Q_KEY = "@Quiz/QuestionsAnswered";
export const A_KEY = "@Quiz/QuestionsCorrect";

export const getOverall = ({KEY}) =>     
    AsyncStorage.getItem(KEY).then(value => {
        if (value) {
            value = parseFloat(value);
            return value;
        }
        return 0;
    });

export const updateScore = ({Avalue, Qvalue}) => {
    getOverall({KEY: A_KEY}).then(oldValue => {
        newValue = oldValue + Avalue;
        return AsyncStorage.setItem(A_KEY, newValue.toString());
    });
    getOverall({KEY: Q_KEY}).then(oldValue => {
        newValue = oldValue + Qvalue;
        return AsyncStorage.setItem(Q_KEY, newValue.toString());
    });
}