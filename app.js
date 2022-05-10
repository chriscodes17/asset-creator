import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

let fileData = {};

fs.readFile("./fileData.db", (err, data) => {
  if (err) {
    return console.log(err);
  }
  try {
    fileData = JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
});

const updateFile = (fileObj) => {
  const { fileName, fileContent } = fileObj;
  if (!fileData.hasOwnProperty(fileName)) {
    fileData[fileName] = {
      fileContent: fileContent,
      age: Date.now(),
    };
  } else {
    const existingObj = fileData[fileName];
    existingObj.fileContent = fileContent;
  }
  return fs.writeFile("./fileData.db", JSON.stringify(fileData), () => {});
};

const deleteFile = () => {
  setTimeout(() => {
    const keys = Object.keys(fileData);
    if (!keys) {
      fileData = {};
      return;
    }
    const now = Date.now();
    keys.forEach((key) => {
      const keyAge = fileData[key].age;
      const timeElapsed = Math.floor((now - keyAge) / 60000);
      if (timeElapsed >= 5) {
        delete fileData[key];
        fs.writeFile("./fileData.db", JSON.stringify(fileData), () => {});
        fs.unlink(`./file_storage/${key}`, (err) => {
          if (err) return console.log(err);
        });
      }
    });
    deleteFile();
  }, 10 * 1000);
};

app.get("/api", (req, res) => {
  res.sendFile("/index.html", { root: "." });
});

app.get("/api/files", (req, res) => {
  res.json(fileData);
});

app.get("/api/:file", (req, res) => {
  const fileName = req.params.file;
  res.json(fileData[fileName]);
});

app.get("/api/uploadFile/:file", (req, res) => {
  const fileName = req.params.file;
  fs.readdir("./file_storage", (err, files) => {
    if (err) return console.log(err);
    files.forEach((file) => {
      if (file === fileName) {
        res.sendFile(file, { root: "./file_storage" });
      }
    });
  });
});

app.post("/files", (req, res) => {
  const { fileName, fileContent } = req.body;
  updateFile(req.body);
  fs.writeFile(`./file_storage/${fileName}`, fileContent, (err) => {
    if (err) return console.log(err);
  });
});

app.listen(process.env.port || 3000, () => {
  deleteFile();
});
