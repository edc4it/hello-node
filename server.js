'use strict';

const express = require('express');
const serveIndex = require('serve-index');
const app = express();

app.set('port', '3030');
app.set('address', '0.0.0.0');

app.get('/', (req, res) => {
  res.send('hello friend\n');
});

let broken = false;

app.get('/version', (req, res) => {
    if (!broken){
        res.send('3.0');
    }  else{
        res.sendStatus(500)
    }
});

app.get('/crash', () => {
    process.exit()
});

app.get('/break', (req,res) => {
    broken = true;
    res.send(`you broke the server! , try http://${app.get('address')}:${app.get('port')}/version again`);
});

app.listen(app.get('port'),app.get('address'),()=>{
   console.log('Serving', `http://${app.get('address')}:${app.get('port')}`)
});
