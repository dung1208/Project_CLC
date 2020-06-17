const userData = require('../model/login')

module.exports = {
    login: function (req, res) {
        var message = '';
        var sess = req.session;

        if (req.method === "POST") {
            let post = req.body;
            let name = post.user_name;
            let password = post.password;

            userData.login(name, password, function (err, results) {
                if (err) {
                    message = 'Error';
                    res.render('login/index', {message: message});
                }
                else if (results.length) {
                    req.session.userId = results[0].Staff_id;
                    req.session.user = results[0];
                    console.log(results[0]);

                    res.redirect('/cashier');
                }
                else {
                    message = 'Tài khoản hoặc mật khẩu không đúng';
                    res.render('login/index', {message: message});
                }
            })
        }
        else {
            res.render('login/index',{message: message});
        }
    }
};

