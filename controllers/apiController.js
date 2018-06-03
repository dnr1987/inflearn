exports.ex_money = function (req, res, body) {
    let json = global.cache.get("ex_money");
    if (json == null || json === undefined || json == '') {
        res.json({ result: { status: "success", data: [] } });
    } else {
        res.json(json);
    }
};

exports.bithumb = function (req, res, body) {
    let json = global.cache.get("bithumb");
    if (json == null || json === undefined || json == '') {
        res.json({ result: { status: "success", data: [] } });
    } else {
        res.json(json);
    }
};

exports.upbit = function (req, res, body) {
    let json = global.cache.get("upbit");
    if (json == null || json === undefined || json == '') {
        res.json({ result: { status: "success", data: [] } });
    } else {
        res.json(json);
    }
};

exports.bitfinex = function (req, res, body) {
    let json = global.cache.get("bitfinex");
    if (json == null || json === undefined || json == '') {
        res.json({ result: { status: "success", data: [] } });
    } else {
        res.json(json);
    }
};

exports.coinmarketcap = function (req, res, body) {
    let json = global.cache.get("coinmarketcap");
    if (json == null || json === undefined || json == '') {
        res.json({ result: { status: "success", data: [] } });
    } else {
        res.json(json);
    }
};

exports.bitfinex_margin = function (req, res, body) {
    let json = global.cache.get("bitfinex_margin");
    if (json == null || json === undefined || json == '') {
        res.json({ result: { status: "success", data: [] } });
    } else {
        res.json(json);
    }
};