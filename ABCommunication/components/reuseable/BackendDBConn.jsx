import {openDatabase} from 'react-native-sqlite-storage';

export const db = openDatabase({name: 'ABCommunication.db'});