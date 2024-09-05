const app = require('./server').app;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const {get} = require('http');
app.get('/user-link', (req, res) => {
  //  const token = req.body.token;
  const professionalsFullName = {
    username: 'username',
    password: 'password',
    apptDate: Date(),
  };
  // console.log(token);
  jwt.sign(professionalsFullName, 'secret', (err, token) => {
    if (err) {
      res.status(500).send('Error signing token');
    } else {
      res
        .status(200)
        .json(
          'https://react-video-chat-app-puce.vercel.app/verify-token?token=' +
            token.toString(),
        );
    }
  });
});

app.get('/', async (req, res) => {
  console.log(process.env.GOOGLE_API_KEY);
  const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAi.getGenerativeModel({model: 'gemini-pro'});
  const prompt = 'write music in musical language ';
  const {response} = await model.generateContent(prompt);
  const {
    candidates: [
      {
        content: {
          parts: [{text}],
        },
      },
    ],
  } = response;

  // console.log(text);
  res.json(text);
});
app.post('/validate-link', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      res.status(401).send('Invalid token :' + err);
    } else {
      console.log(decoded);
      res.json(decoded);
    }
  });
});
