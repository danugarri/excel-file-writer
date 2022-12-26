const { exec } = require('child_process');

const deleteFile = (file) => {
  exec(`cd generated-file && rm ${file}`, (error) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    } else {
      console.log(`DELETED: ${file}`);
    }
  });
};

module.exports = { deleteFile };
