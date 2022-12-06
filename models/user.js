const mongoose = require ('mongoose');
const passportLocalMongoose = require ('passport-local-mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'Viewer',
        enum: ["Developer", "Admin", "Project manager", "Viewer"]
       },
    googleId: {
        type: String,
        unique: true,
        default: this._id
    },
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameUnique: true,
    
});
// UserSchema.plugin(findOrCreate);


module.exports = mongoose.model ('User', UserSchema);

