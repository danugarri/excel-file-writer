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

module.exports = { getStyles };
