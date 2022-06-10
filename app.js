const express = require('express');
const hbs = require('hbs');
const path = require('path');
const upload = require('./middleware/multer');
require('./database/database');
const Upload = require('./models/uploads');
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/templates/views'));
hbs.registerPartials(path.join(__dirname, '/templates/partials'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/upload', (req, res) => {

    upload(req, res, (err) => {

        if (err) {
            res.render('index', {
                msg: 'Images Allowed Only'
            });
        } else {
            if (req.files.length == 0) {
                res.render('index', {
                    msg: 'No File Selected'
                })
            } else {

                req.files.forEach(file => {
                    const upload = new Upload({
                        imagename: file.filename,
                        destination: file.destination,
                        path: file.path
                    });

                    upload.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('index', {
                                msg: 'Images Uploaded Successfully',
                            })
                        }
                    })
                });

            }
        }

    });
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
})