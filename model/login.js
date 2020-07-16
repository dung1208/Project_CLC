const dbCon = require('../lib/db')

module.exports = {
    login: function (userName, password, callback) {
        dbCon.query('SELECT Staff_id, Store_id, Staff_id_user, Active, staff_role.`Name` AS role' +
            ' FROM staff, staff_role WHERE staff.Role_id = staff_role.Role_id AND Staff_id_user = "'
            + userName + '" AND Staff_id_password = "'+ password + '"', callback);
    }
}