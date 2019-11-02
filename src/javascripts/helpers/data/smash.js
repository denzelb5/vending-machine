import machineData from './machineData';
import positionData from './positionData';


const getCompleteMachine = () => new Promise((resolve, reject) => {
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => resolve(positions))
    .catch((error) => reject(error));
  // first get machines -- returns first machine (hard-code)
  // 2) use machineId to get all positions for that machine
  // 3) use machineId to get all snack positions
  // 4. use uid of snackPositions to get avail snacks for that machine
  // 5. smash them -- return array of positions in order (a1, a2, b1 ...)
  // so positions should have position.snack if a snack exists at that
  // position.
});

export default { getCompleteMachine };
