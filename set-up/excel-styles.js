const { getEmployeesInternally } = require('../DataDB/service/getEmployees');
const { getExcel } = require('./set-up');

const { wb } = getExcel();
const getStyles = () => {
  // Create a reusable style
  const headerStyle = wb.createStyle({
    font: {
      color: '#000000',
      size: 14,
      bold: true,
    },
    // Background color
    fill: {
      type: 'pattern',
      patternType: 'solid',
      fgColor: '#A0A0A0',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
    },
  });
  // Must be hexadecimal colors
  const cellsStyle = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
  });

  return { headerStyle, cellsStyle };
};

const getCustomStyle = async (employeeName) => {
  const employeesList = await getEmployeesInternally();

  const matchedEmployee =
    employeesList && employeesList.find((employee) => employee.employeeName === employeeName);
  console.log('\n\x1b[32m Matches found: \x1b[0m');
  console.log(matchedEmployee);

  const employeeNameCellsStyle = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      fgColor: matchedEmployee.color,
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
    },
  });

  return employeeNameCellsStyle;
};

module.exports = { getStyles, getCustomStyle };
