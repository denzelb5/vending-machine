import 'bootstrap';
import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import myNavBar from './components/myNavBar/MyNavBar';
import machine from './components/machine/machine';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  authData.checkLoginStatus();
  myNavBar.logoutEvent();
  machine.buildTheMachine();
};

init();
