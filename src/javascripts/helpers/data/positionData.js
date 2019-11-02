import axios from 'axios';
import apiKeys from '../apiKeys.json';


const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllPositionsByMachineId = (machineId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/positions.json?orderBy="machineId"&equalTo="${machineId}"`)
    .then((response) => {
      const demPositions = response.data;
      const positions = [];
      Object.keys(demPositions).forEach((fbid) => {
        demPositions[fbid].id = fbid; // firebase id
        positions.push(demPositions[fbid]);
      });
      resolve(positions); // hard code to only retun first machine
    })
    .catch((error) => reject(error));
});

export default { getAllPositionsByMachineId };
