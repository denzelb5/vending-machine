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
import snackData from '../../helpers/data/snackData';

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

const addNewSnack = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newSnack = {
    imageUrl: $('#snack-image-url').val(),
    name: $('#snack-name').val(),
    price: $('#snack-price').val() * 1,
    currentStocked: 4,
    lifetimeNum: 6,
    uid,
  };
  snackData.addNewSnack(newSnack)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
    })
    .catch((error) => console.error(error));
};

const quickStock = (e) => {
  e.stopImmediatePropagation();
  const snackId = e.target.id.split('snack-')[1];
  snackData.restock(snackId, 5)
    .then(() => {
      const { uid } = firebase.auth().currentUser;
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
      machine.buildTheMachine();
    })
    .catch((error) => console.error(error));
  console.log(snackId);
};

const buildTheStocker = (uid) => {
  smash.getSnacksWithPositions(uid)
    .then((snacks) => {
      let domString = '<h2>STOCK THE MACHINE</h2>';
      domString += `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add snack
    </button>`;
      domString += '<div class="d-flex flex-wrap">';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDom(domString, 'stock');
      $('#stock').on('click', '.delete-snack-position', deleteFromMachine);
      // eslint-disable-next-line no-use-before-define
      $('#stock').on('click', '.add-snack-position', addToMachine);
      $('#add-new-snack').click(addNewSnack);
      $('#stock').on('click', '.quick-stock', quickStock);
    })
    .catch((error) => console.error(error));
};

const addToMachine = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const inputText = $(e.target).siblings().val();
  smash.getAvailablePositions()
    .then((positions) => {
      const selectedPosition = positions.find((x) => x.position.toLowerCase() === inputText.toLowerCase());
      if (selectedPosition) {
        const newSnackPosition = {
          positionId: selectedPosition.id,
          snackId: e.target.id,
          machineId: selectedPosition.machineId,
          uid,
        };
        snackPositionData.createSnackPosition(newSnackPosition).then(() => {
        // eslint-disable-next-line no-use-before-define
          buildTheStocker(uid);
          machine.buildTheMachine();
        });
      }
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
