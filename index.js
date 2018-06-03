process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

// 컨트롤러
const {
    apiController,
    cacheApiController,
    pageController
} = require('./controllers');

const cors = require('cors');
const app = express();

app.use(cors());
app.set('view engine', 'ejs');
if (!module.parent) app.use(logger('dev'));
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// 페이지 렌더링
app.get('/', pageController.main);
app.get('/main', pageController.main);

// API 렌더링
app.get('/api/money', apiController.ex_money);
app.get('/api/bithumb', apiController.bithumb);
app.get('/api/upbit', apiController.upbit);
app.get('/api/bitfinex', apiController.bitfinex);
app.get('/api/coinmarketcap', apiController.coinmarketcap);
app.get('/api/bitfinex_margin', apiController.bitfinex_margin);


// 스케줄러
cacheApiController.cron_money();
cacheApiController.cron_bithumb();
cacheApiController.cron_upbit();
cacheApiController.cron_bitfinex();
cacheApiController.cron_coinmarketcap();
cacheApiController.cron_bitfinex_margin();

app.use(function (req, res, next) {
    res.status(404).render('404', { url: req.originalUrl });
});

if (!module.parent) {
    http.createServer(app).listen(5000);
    console.log('Express started on port 5000');
};