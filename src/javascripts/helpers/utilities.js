import $ from 'jquery';

const printToDom = (toPrint, divId) => {
  $(`#${divId}`).html(toPrint);
};

export default { printToDom };
