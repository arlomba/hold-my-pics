const figlet = require("figlet");
const chalk = require("chalk");

const printTitle = () => {
  figlet("HoldMyImages", { font: "Doom" }, function (err, data) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(chalk.blueBright(chalk.bgBlack(data)));
  });
};

module.exports = printTitle;
