import axios from 'axios';
import apiKeys from '../apiKeys.json';


const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSnacksByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demSnacks = response.data;
      const snacks = [];
      Object.keys(demSnacks).forEach((fbid) => {
        demSnacks[fbid].id = fbid; // firebase id
        snacks.push(demSnacks[fbid]);
      });
      resolve(snacks); // hard code to only retun first machine
    })
    .catch((error) => reject(error));
});

export default { getSnacksByUid };
