const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000
const dir = __dirname + '/video';
const files = fs.readdirSync(dir);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    var name_files = [];
    for(const file of files) {
        name_files.push(file)
    }
    res.render('home', {names: name_files})
});

app.get('/playVideo', (req, res) => {
    res.render('playVideo')
})

app.listen(port, () => console.log(`listening at port http:localhost:${port}`))