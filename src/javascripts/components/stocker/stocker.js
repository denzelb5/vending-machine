// import smash from '../../helpers/data/smash';
import './stocker.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import smash from '../../helpers/data/smash';
import stockCard from '../stockCard/stockCard';
import utilities from '../../helpers/utilities';
import snackPositionData from '../../helpers/data/snackPositionData';
import machine from '../machine/machine';

const deleteFromMachine = ((e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  snackPositionData.deleteSnackPosition(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
      machine.buildTheMachine();
    })
    .catch((error) => console.error(error));
});

const buildTheStocker = (uid) => {
  smash.getSnacksWithPositions(uid)
    .then((snacks) => {
      let domString = '<h2>STOCK THE MACHINE</h2>';
      domString += '<div class="d-flex flex-wrap">';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDom(domString, 'stock');
      $('#stock').on('click', '.delete-snack-position', deleteFromMachine);
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
