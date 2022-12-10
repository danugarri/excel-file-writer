const getExcel = () => {
  // Require library
  const xl = require('excel4node');

  // Create a new instance of a Workbook class
  const wb = new xl.Workbook();

  // Add Worksheets to the workbook
  const ws = wb.addWorksheet('Horario');

  return { wb, ws };
};
module.exports = { getExcel };
