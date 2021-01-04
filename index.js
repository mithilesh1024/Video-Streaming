const express = require('express');
const app = express();
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/playVideo', (req, res) => {
    res.render('playVideo')
})

app.listen(port, () => console.log(`listening at port http:localhost:${port}`))