import './stockCard.scss';

const makeASnack = (snack) => {
  const domString = `
  <div class="card col-3 snack-card">
    <div class="card-body">
      <h5 class="card-title">${snack.name}</h5>
      <p class="card-text">${snack.price / 100}</p>
      
    </div>
    <div class="card-footer"><button id="${snack.snackPositionId}" class="delete-snack-position btn btn-danger">Remove from ${snack.position.position}</button></div>
  </div>`;
  return domString;
};

export default { makeASnack };
