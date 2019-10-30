import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import pic from './loginbutton-2.png';
import utilities from '../../helpers/utilities';


const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button id="google-auth" class="btn">
    <img src=${pic}>
    </button>`;
  utilities.printToDom(domString, 'auth');
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
