const express = require('express');
const app = express();
const { check, validationResult } = require('express-validator/check'); // validate gögn
app.set('view engine', 'ejs');
const router = express.Router();

/* todo útfæra */
const path = require('path');


const { insert } = require('./db');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Forsíða' });
});

  app.post(
    '/post',
    check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
    check('email').isLength({ min: 1 }).withMessage('Netfang má ekki vera tómt'),
    check('email').isEmail().withMessage('Netfang verður að vera netfang'),
    check('phone').isLength({ min: 7 }).withMessage('Símanúmer verður að vera að minnsta 7 tölustafir'),
    check('phone')
      .matches(/^[0-9]{3}-?[0-9]{4}$/)
      .withMessage('Símanúmer verður að vera á formi 000-0000'),
    check('text').isLength({ min: 100 }).withMessage('Kynning verður að vera amk 100 stafir'),
    check('job').isLength({ min: 1 }).withMessage('Veldu starfssvið'),
  
    (req, res) => {
      const {
        name = '',
        email = '',
        phone = '',
        text = '',
        job = '',
      } = req.body;

      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(i => i.msg);
        return res.send(`
      <p>Villur:</p>
      <ul>
        <li>${errorMessages.join('</li><li>')}</li>
      </ul>`);
    }

  //ekki notað
      const data = {
        name,
        email,
        phone,
        text,
        job,
      };
      console.log('data = ', data);
     //await insert(data);
      res.redirect('/thanks');
    },
  );
  
  app.get('/thanks', (req, res) => {
    res.send('Skráning móttekin');
  });

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});





module.exports = router;
