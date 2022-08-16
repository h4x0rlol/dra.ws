const fs = require("fs");
const path = require("path");

const getPicture = (id) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, "../files", `${id}.jpg`)
  );
  const data = `data:image/png;base64,` + file.toString("base64");
  return data;
};

const updatePicture = (msg) => {
  const data = msg?.image?.replace(`data:image/png;base64,`, "");
  fs.writeFileSync(
    path.resolve(__dirname, "../files", `${msg?.id}.jpg`),
    data,
    "base64"
  );
};

const deletePicture = (id) => {
  fs.unlinkSync(path.resolve(__dirname, "../files", `${id}.jpg`));
};

module.exports = {
  getPicture: getPicture,
  updatePicture: updatePicture,
  deletePicture: deletePicture,
};
