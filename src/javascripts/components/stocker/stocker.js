// import smash from '../../helpers/data/smash';
import './stocker.scss';
import smash from '../../helpers/data/smash';
import stockCard from '../stockCard/stockCard';
import utilities from '../../helpers/utilities';

const buildTheStocker = (uid) => {
  console.log(uid);
  smash.getSnacksWithPositions(uid)
    .then((snacks) => {
      let domString = '<h2>STOCK THE MACHINE</h2>';
      domString += '<div class="d-flex flex-wrap">';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDom(domString, 'stock');
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
