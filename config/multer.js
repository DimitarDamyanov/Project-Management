/**
 * Created by D on 17.4.2016 ã..
 */


var multerConfig = function (multer, crypto, mime) {
    var profileAavatar = function () {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/images/avatars')
            },
            filename: function (req, file, cb) {
                crypto.pseudoRandomBytes(16, function (err, raw) {
                    cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
                });
            }
        });
        var upload = multer({
            storage: storage,
            fileFilter: function (req, file, cb) {
                console.log(file);
                if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        });
        return upload;
    };

    return {
        profileAvatar: profileAavatar
    }
};

module.exports = multerConfig;