import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { AppNavigator } from './navigation/AppNavigator';

ReactNativeScript.start(React.createElement(AppNavigator, {}, null));