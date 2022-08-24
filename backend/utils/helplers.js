const fs = require("fs/promises");
const path = require("path");

const getPicture = async (id) => {
  try {
    const file = await fs.readFile(
      path.resolve(__dirname, "../files", `${id}.jpg`)
    );
    const data = `data:image/jpeg;base64,` + file.toString("base64");
    return data;
  } catch (e) {
    console.log(e);
  }
};

const updatePicture = async (msg) => {
  try {
    const data = msg?.image?.src?.replace(`data:image/jpeg;base64,`, "");
    await fs.writeFile(
      path.resolve(__dirname, "../files", `${msg?.id}.jpg`),
      data,
      "base64"
    );
  } catch (e) {
    console.log(e);
  }
};

const deletePicture = async (id) => {
  try {
    await fs.unlink(path.resolve(__dirname, "../files", `${id}.jpg`));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getPicture: getPicture,
  updatePicture: updatePicture,
  deletePicture: deletePicture,
};
