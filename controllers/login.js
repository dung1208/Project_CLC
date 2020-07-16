const userData = require('../model/login')

module.exports = {
    login: function (req, res) {
        var message = '';

        if (req.method === "POST") {
            let post = req.body;
            let name = post.user_name;
            let password = post.password;

            userData.login(name, password, function (err, results) {
                if (err) {
                    message = 'Error';
                    res.render('login/login', {message: message});
                }
                else if (results.length) {
                    if (results[0].Active === 0) {
                        message = "Tài khoản hiện giờ không còn khả dụng";
                        res.render('login/login', {message: message});
                    } else {
                        req.session.userId = results[0].Staff_id;
                        req.session.storeId = results[0].Store_id;
                        req.session.user = results[0];

                        if (req.session.user.role === "Cashier") {
                            res.redirect('/cashier');
                        } else res.redirect('/dashboard');
                    }
                }
                else {
                    message = 'Tài khoản hoặc mật khẩu không đúng';
                    res.render('login/login', {message: message});
                }
            })
        }
        else {
            res.render('login/login',{message: message});
        }
    },

    logout: function (req, res) {
        req.session.userId = null;
        req.session.storeId = null;
        req.session.user = null;
        let message = '';
        res.render('login/login',{message: message});
    }
};
