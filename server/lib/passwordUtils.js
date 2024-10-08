const crypto = require('crypto');

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt, 
        hash: genHash
    }
}

function validatePassword(password, hashpassword, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hashpassword === hashVerify;
}

module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;