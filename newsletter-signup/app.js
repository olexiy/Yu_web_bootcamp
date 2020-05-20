/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/signup.html`);
});


app.post('/', (req, res) => {
  const { firstName, lastName, email } = req.body;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const options = {
    url: 'https://us20.api.mailchimp.com/3.0/lists/9c1dadc269',
    method: 'POST',
    headers: {
      Authorization: 'olexiy1 xxx',
    },
    body: jsonData,
  };

  request(options, (error) => {
    if (error) {
      res.sendFile(`${__dirname}/failure.html`);
    } else {
      res.sendFile(`${__dirname}/success.html`);
    }
  });
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
