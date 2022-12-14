// sends Excel file to web client requesting the /excel route
const express = require('express');
const { headers } = require('./consts');
const { getDate } = require('./helpers/getDate');
const { getStyles, getCustomStyle } = require('./set-up/excel-styles');
const { getExcel } = require('./set-up/set-up');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoFunctions = require('./DataDB/mongo');
const { getEmployeesInternally } = require('./DataDB/service/getEmployees');
const { deleteFile } = require('./helpers/deleteFile');

const app = express();
app.use(bodyParser.json());
const { wb, ws } = getExcel();
const port = 5000;
const formattedDate = getDate();
const { headerStyle, cellsStyle } = getStyles();

// CORS
app.use(cors({ exposedHeaders: '*' }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.listen(port, function () {
  console.log('App listening on port 5000!');
});

const populateCellsPost = (data, employeesList) => {
  let counter = 1;
  data.forEach(async (employee) => {
    try {
      const employeeNameCellsStyle = await getCustomStyle(employee['Employee'], employeesList);
      counter++;
      let index = 0;
      for (const property in employee) {
        index++;
        //  write headers
        ws.cell(1, index)
          .string(headers[index - 1])
          .style(headerStyle);
        // Write cells
        if (typeof employee[property] === 'string') {
          ws.cell(counter, index).string(employee[property]).style(cellsStyle);
          if (employee['Employee']) {
            ws.cell(counter, index).string(employee['Employee']).style(employeeNameCellsStyle);
          }
        } else {
          ws.cell(counter, index).number(employee[property]).style(cellsStyle);
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
};
// routes
app.get('/', function (req, res) {
  res.redirect('/excel');
});
app.get('/excel', function (req, res) {
  deleteFile(`${formattedDate}-danugarri-schedule.xlsx`);
  wb.write(`${formattedDate}-danugarri-schedule.xlsx`, res);
  // populateCells();
});
app.post('/', async function (req, res) {
  let employeesList = [];
  employeesList = await getEmployeesInternally();
  populateCellsPost(req.body, employeesList);
  wb.write(`generated-file/${formattedDate}-danugarri-schedule.xlsx`);
  res.send({ data: `https://${req.hostname}/excel` });
  // res.send({ data: `${req.protocol}://${req.hostname}:${port}/excel` });
  // const data1={ data: `http://localhost:5000` }
});
app.post('/employee', MongoFunctions.createEmployee);
app.get('/employee', MongoFunctions.getEmployees);
app.delete('/employee', MongoFunctions.deleteEmployees);
