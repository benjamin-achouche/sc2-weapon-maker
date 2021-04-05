const fs = require('fs');

const checkFileExistence = (codeFilePath) => {
  if (!fs.existsSync(codeFilePath)) {
    fs.writeFile(
      codeFilePath,
      '[ActionReplay]\n[ActionReplay_Enabled]\n',
      'utf8',
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );
  }
};

const writeARCodeCreate = (codeFilePath, createdCode) => {
  const fileContentSplit = fs
    .readFileSync(codeFilePath)
    .toString()
    .split('[ActionReplay_Enabled]');

  const createdCodeName = createdCode.split('\r\n')[0];

  const newFileContent =
    fileContentSplit[0] +
    createdCode +
    '\r\n[ActionReplay_Enabled]' +
    fileContentSplit[1] +
    '\r\n' +
    createdCodeName;

  fs.writeFile(codeFilePath, newFileContent, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
};

const writeARCodeUpdate = (codeFilePath, codeToUpdate, updatedCode) => {
  const fileContentSplit = fs
    .readFileSync(codeFilePath)
    .toString()
    .split(codeToUpdate);

  const codeToUpdateName = codeToUpdate.split('\r\n')[0];
  const updatedCodeName = updatedCode.split('\r\n')[0];

  fileContentSplit[1] = fileContentSplit[1].split(codeToUpdateName);

  const newFileContent =
    fileContentSplit[0] +
    updatedCode +
    fileContentSplit[1][0] +
    updatedCodeName +
    fileContentSplit[1][1];

  fs.writeFile(codeFilePath, newFileContent, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
};

const writeARCodeDelete = (codeFilePath, codeToDelete) => {
  const fileContentSplit = fs
    .readFileSync(codeFilePath)
    .toString()
    .split(`${codeToDelete}\r\n`);

  const codeToDeleteName = codeToDelete.split('\r\n')[0];

  fileContentSplit[1] = fileContentSplit[1]
    .split(`\r\n${codeToDeleteName}`)
    .join('');

  const newFileContent = fileContentSplit[0] + fileContentSplit[1];

  fs.writeFile(codeFilePath, newFileContent, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
};

module.exports.checkFileExistence = checkFileExistence;
module.exports.writeARCodeCreate = writeARCodeCreate;
module.exports.writeARCodeUpdate = writeARCodeUpdate;
module.exports.writeARCodeDelete = writeARCodeDelete;
