const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
// const dir = __dirname + "\\views\\video";
// const files = fs.readdirSync(dir);

// app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/test.html");
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
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

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
    } 
    else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  });
});

app.get("/playVideo", (req, res) => {
  // src = dir + '\\Test_video.mp4';
  // console.log(src);
  res.render("playVideo", { src: src });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`listening at port http:localhost:${port}`)
});
