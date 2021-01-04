const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const dir = __dirname + "\\views\\video";
const files = fs.readdirSync(dir);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Requires Range headers");
    }
    const videoPath = null;
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 * 6
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

    const contentLength = end - start + 1
    const header = {
        "Content-Length": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Type": contentLength,
        "content-Type": "video/mp4"
    } 
    res.writeHead(206)
});

app.get("/playVideo", (req, res) => {
  // src = dir + '\\Test_video.mp4';
  // console.log(src);
  res.render("playVideo", { src: src });
});

app.listen(port, () => console.log(`listening at port http:localhost:${port}`));
