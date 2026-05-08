/**
 * @format
 */
import App from './MainApp'; // Naam change kar diya
import { AppRegistry } from 'react-native';
//import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
