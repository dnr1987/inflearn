let cron = require('node-cron');

let async = require("async");
let request = require('request-promise');

const NodeCache = require("node-cache");
global.cache = new NodeCache();

// 외화정보를 가져온다
exports.cron_money = function (req, res, body) {
    // 10초마다 실행
    cron.schedule('*/10 * * * * *', function () {
        try {
            let options = {
                method: 'GET',
                uri: 'https://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json',
                json: true
            };

            let result = request(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    let resources = body.list.resources;
                    let obj = new Object();
                    for (let i = 0; i < resources.length; i++) {
                        let fields = resources[i].resource.fields;
                        if (fields.symbol == "KRW=X") {
                            obj.usdkrw = fields.price;
                        } else if (fields.symbol == "JPY=X") {
                            obj.usdjpy = fields.price;
                        } else if (fields.symbol == "EUR=X") {
                            obj.usdeur = fields.price;
                        } else if (fields.symbol == "CNY=X") {
                            obj.usdcny = fields.price;
                        }
                    }
                    let json = { result: { status: "success", data: obj } };
                    let success = global.cache.set("ex_money", json);
                }
            });
        } catch (exception) {
            console.log("exception -> " + exception);
        }
    });
};

// 빗썸 가져온다
exports.cron_bithumb = function (req, res, body) {
    // 5초마다 실행
    cron.schedule('*/5 * * * * *', function () {
        try {
            let options = {
                method: 'GET',
                uri: 'https://api.bithumb.com/public/ticker/all',
                json: true
            };

            let result = request(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    let json = { result: { status: "success", data: res.body } };
                    let success = global.cache.set("bithumb", json);
                }
            });

        } catch (exception) {
            console.log("exception -> " + exception);
        }
    });
};

// 업비트 가져온다
exports.cron_upbit = function (req, res, body) {
    // 5초마다 실행
    cron.schedule('*/5 * * * * *', function () {
        try {
            let options = {
                method: 'GET',
                uri: 'https://crix-api-cdn.upbit.com/v1/crix/candles/days?code=CRIX.UPBIT.KRW-BTC&count=1',
                json: true
            };

            let result = request(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    let json = { result: { status: "success", data: res.body } };
                    let success = global.cache.set("upbit", json);
                }
            });

        } catch (exception) {
            console.log("exception -> " + exception);
        }
    });
};

// 비트파이넥스 가져온다
exports.cron_bitfinex = function (req, res, body) {
    // 5초마다 실행
    cron.schedule('*/5 * * * * *', function () {
        try {
            let options = {
                method: 'GET',
                uri: 'https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tLTCUSD,tBCHUSD,tETHUSD,tETCUSD,tXRPUSD',
                json: true
            };

            let result = request(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    let json = { result: { status: "success", data: res.body } };
                    let success = global.cache.set("bitfinex", json);
                }
            });

        } catch (exception) {
            console.log("exception -> " + exception);
        }
    });
};

// 코인마켓캡 가져온다
exports.cron_coinmarketcap = function (req, res, body) {
    // 5초마다 실행
    cron.schedule('*/5 * * * * *', function () {
        try {
            let options = {
                method: 'GET',
                uri: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
                json: true
            };

            let result = request(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    let json = { result: { status: "success", data: res.body } };
                    let success = global.cache.set("coinmarketcap", json);
                }
            });

        } catch (exception) {
            console.log("exception -> " + exception);
        }
    });
};

exports.cron_bitfinex_margin = function (req, res, body) {
    cron.schedule('*/30 * * * * *', function () {
        async function getMargin() {
            try {
                let options = {
                    method: 'GET',
                    uri: 'https://api.bitfinex.com/v2/stats1/pos.size:1m:tBTCUSD:long/hist',
                    json: true
                };
                let long = null;
                let short = null;
                let requestLong = await request(options, function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        long = res.body;
                    }
                });                

                options = {
                    method: 'GET',
                    uri: 'https://api.bitfinex.com/v2/stats1/pos.size:1m:tBTCUSD:short/hist',
                    json: true
                };
                let requestShort = await request(options, function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        short = res.body;                      
                    }
                });

                let result = {
                    "bids": long,
                    "asks": short
                };
                let success = global.cache.set("bitfinex_margin", result);

            } catch (exception) {
                console.log("exception -> " + exception);
            }
        };
        getMargin();
        
    });
};