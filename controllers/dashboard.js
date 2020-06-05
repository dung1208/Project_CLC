module.exports = {
    dashboard: function (req, res, next) {
        var user =  req.session.user;
        var userId = req.session.userId;

        if(userId == null){
            res.redirect("/login");
        }
        else {
            res.render('index', { title: 'Express' });
        }
    }
};