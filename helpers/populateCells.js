const { dataExample } = require('../consts');
const { getStyles } = require('../set-up/excel-styles');
const { getExcel } = require('../set-up/set-up');
const { cellsStyle, headerStyle } = getStyles();
const { ws } = getExcel();

const populateCells = (data) => {
  console.log(dataExample);
  ws.cell(1, 1).string('Encabezado').style(headerStyle);
  let counter = 2;
  data.forEach((employee) => {
    counter++;
    for (const property in employee) {
      const propertyIndex = data.map((employee) => employee[property]).indexOf(employee[property]);

      console.log(employee[property]);
      ws.cell(counter, propertyIndex + 1)
        .string([property])
        .style(cellsStyle);
    }
  });
};

module.exports = { populateCells };
