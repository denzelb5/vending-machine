import axios from 'axios';
import apiKeys from '../apiKeys.json';


const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getMachine = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/machines.json`)
    .then((response) => {
      const demMachines = response.data;
      const machines = [];
      Object.keys(demMachines).forEach((fbid) => {
        demMachines[fbid].id = fbid; // firebase id
        machines.push(demMachines[fbid]);
      });
      resolve(machines[0]); // hard code to only retun first machine
    })
    .catch((error) => reject(error));
});

export default { getMachine };
