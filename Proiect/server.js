const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));//nu accepta obiecte nested

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/home.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/concepts.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'concepts.html'));
});

app.get('/', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/gallery.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'gallery.css'));
});

app.get('/gamestyle.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'gamestyle.css'));
});

app.get('/history.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'history.css'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/homeconcepts.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'homeconcepts.css'));
});

app.get('/gamescript.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'gamescript.js'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/gallery.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'gallery.html'));
});

app.get('/game.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

app.get('/history.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'history.html'));
});

app.use('/Images', express.static(path.join(__dirname, 'Images')));

app.post('/submit', requireLogin, (req, res) => {
    const messageRegex = /^.{3,100}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { message, email } = req.body;

    if (!messageRegex.test(message)) {
        if (!emailRegex.test(email)) {
            res.send('The message and the e-mail adress are not valid.');
        } else {
            res.send('The message is not valid.');
        }
    } else if (!emailRegex.test(email)) {
        res.send('The e-mail adress is not valid.');
    } else {
        res.send('The data has been sent successfully.');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.css'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const correctUsername = 'user';
    const correctPassword = 'tehniciweb123';

    if (username == correctUsername && password == correctPassword) {
        req.session.user = username;
        res.redirect('/');
    } else {
        res.send('Name or password is incorrect.');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
