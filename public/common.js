function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function unixTime(unixtime) {
    var u = new Date(unixtime);
    var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return u.getFullYear() +
        '-' + ('0' + months[u.getMonth()]).slice(-2) +
        '-' + ('0' + u.getDate()).slice(-2) +
        ' ' + ('0' + u.getHours()).slice(-2) +
        ':' + ('0' + u.getMinutes()).slice(-2) +
        ':' + ('0' + u.getSeconds()).slice(-2);
};

function getAPI(apiUrl) {
    return new Promise((resolve, reject) => {
        let params = new Object();

        $.ajax({
            url: apiUrl,
            type: 'get',
            contentType: "application/json",
            data: params,
            dataType: 'json',
            async: true,
            error: function (error) {
                resolve("error");
            },
            success: function (response) {
                let result = response.result;
                if (result.status == "success") {
                    ret = result.data;
                    resolve(ret);
                } else {
                    resolve("error");
                }
            }
        });
    });
}