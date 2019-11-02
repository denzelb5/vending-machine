import machineData from './machineData';
import positionData from './positionData';
import snackPositionData from './snackPositionData';
import snackData from './snackData';

// first get machines -- returns first machine (hard-code)
// 2) use machineId to get all positions for that machine
// 3) use machineId to get all snack positions
// 4. use uid of snackPositions to get avail snacks for that machine
// 5. smash them -- return array of positions in order (a1, a2, b1 ...)
// so positions should have position.snack if a snack exists at that
// position.

const getCompleteMachine = () => new Promise((resolve, reject) => {
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId)
        .then((snackPositions) => {
          snackData.getSnacksByUid(positions[0].uid).then((snacks) => {
            // snackData.getSnacksByUid().then((positions[0].uid)).
            console.log(snackPositions);
            resolve(snacks);
          });
        });
    })
    .catch((error) => reject(error));
});

export default { getCompleteMachine };
