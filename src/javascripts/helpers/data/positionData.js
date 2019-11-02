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
      // order positions (a1, a2, a3 ...)
      const sortedPositions = positions.sort((a, b) => a.position.localeCompare(b.position, 'en', { numeric: true }));
      resolve(sortedPositions); // hard code to only retun first machine
    })
    .catch((error) => reject(error));
});

export default { getAllPositionsByMachineId };
