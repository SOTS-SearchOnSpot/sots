import firebase from 'firebase';
import { Constants } from '@common';

export default firebase.initializeApp(Constants.FireConfig);