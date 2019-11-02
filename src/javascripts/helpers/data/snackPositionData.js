import axios from 'axios';
import apiKeys from '../apiKeys.json';


const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSnackPositionsByMachineId = (machineId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snackPositions.json?orderBy="machineId"&equalTo="${machineId}"`)
    .then((response) => {
      const demSnackPositions = response.data;
      const snackPositions = [];
      Object.keys(demSnackPositions).forEach((fbid) => {
        demSnackPositions[fbid].id = fbid; // firebase id
        snackPositions.push(demSnackPositions[fbid]);
      });
      resolve(snackPositions); // hard code to only retun first machine
    })
    .catch((error) => reject(error));
});


export default { getAllSnackPositionsByMachineId };
