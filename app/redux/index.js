import AsyncStorage from '@react-native-community/async-storage';
import { persistCombineReducers } from 'redux-persist';
import { reducer as UserRedux } from './UserRedux';

const config = {
    key:  "root",
    storage: AsyncStorage
};

export default persistCombineReducers(config, {
    user: UserRedux
})