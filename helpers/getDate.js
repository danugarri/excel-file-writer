module.exports = {
  getDate: function getDate() {
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    return formattedDate;
  },
};
