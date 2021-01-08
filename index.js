const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const dir = "C:\\Users\\Admin\\Videos\\Tomb Raider (2013)";
const files = fs.readdirSync(dir);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets/js')));

app.get("/", function (req, res) {
  // console.log(req.body);
  // var addr = []
  // for (file of files) {
  //   t = dir + "/" + file
  //   addr.push(t)
  // }
  res.render("index" , {data: files});
});

app.post("/", (req, res) => {
  console.log(req.body)
  
});

app.get("/video", (req, res) => {
  const path = "Test_video.mp4";
  fs.stat(path, (err, stats) => {
    if (err != null && err.code == "ENOENT") {
      res.sendFile(404);
    }
    const fileSize = stats.size;
    const range = req.headers.range;
    if (range) {
      // console.log("********************************");
      // console.log(`Range = ${range}`);
      const parts = range.replace(/bytes=/, "").split("-");
      // console.log(`Parts = ${parts}`);
      const start = parseInt(parts[0], 10);
      // console.log(`start = ${start}`);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      // console.log(`end = ${end}`);
      // console.log("********************************");

      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`listening at port http:localhost:${port}`);
});
