const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));
const chalk = require("chalk");

function manipulateLocaleFile(file, map, output) {
  fs.readFile(file, function (err1, fileData) {
    if (err1) throw err1;

    try {
      const locale = JSON.parse(fileData);

      const newLocale = {};
      Object.keys(map).forEach((key) => {
        // reading value for the requested key on the source
        const value = locale[key];

        if (value) {
          // adding in output a new key with the original value
          newLocale[map[key]] = value;
        }
      });

      fs.writeFile(output, JSON.stringify(newLocale), function (err2) {
        if (err2) throw err2;
      });
    } catch (exc) {}
  });
}

function showHelp() {
  console.log(
    chalk.yellow(
      "Eg. node index.js --map ./example/map.json --source ./example/source/ --output ./example/output/"
    ),
    "\n"
  );
  console.log(
    chalk.green("map: "),
    "it's the file who map old keys with new ones"
  );
  console.log(
    chalk.green("source: "),
    "it's where the localization files exported from the original project are. They should be exported as simple json."
  );
  console.log(
    chalk.green("output: "),
    "it's where we want to have the new translation keys files to be uploaded to the new project"
  );
  console.log("\nYou can check the example folder in the project.");
}

if (argv.help) {
  showHelp();
  return;
}

if (!argv.map) {
  console.log(chalk.red("--map should be defined\n"));
  showHelp();
  return;
}
if (!argv.source) {
  console.log(chalk.red("--source should be defined\n"));
  showHelp();
  return;
}
if (!argv.output) {
  console.log(chalk.red("--output should be defined\n"));
  showHelp();
  return;
}

fs.readFile(argv.map, function (err1, mapData) {
  if (err1) throw err1;

  const map = JSON.parse(mapData);

  let source = argv.source;
  if (!source.endsWith("/")) {
    source = source + "/";
  }
  let output = argv.output;
  if (!output.endsWith("/")) {
    output = output + "/";
  }

  var stats = fs.statSync(source);
  if (stats.isFile()) {
    manipulateLocaleFile(source, map, output);
    return;
  }

  fs.readdir(source, function (err2, files) {
    if (err2) throw err2;

    fs.mkdir(output, { recursive: true }, (err3) => {
      if (err3) throw err3;

      // looping all files
      files.forEach(function (file) {
        manipulateLocaleFile(`${source}${file}`, map, `${output}${file}`);
      });
    });
  });
});
