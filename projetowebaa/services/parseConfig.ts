import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configura o Parse para usar o AsyncStorage do React Native
Parse.setAsyncStorage(AsyncStorage);

// Substitua pelas suas chaves do Back4App
const BACK4APP_APP_ID = "AcCTzoSYZOrdMwqDjJ0jaV2LVYxGustWNvUc9I05";
const BACK4APP_JS_KEY = "TOC7o4iWpdtYaC8vvGNEt99dGxfqi8sBsjGeg8jB";

Parse.initialize(BACK4APP_APP_ID, BACK4APP_JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;