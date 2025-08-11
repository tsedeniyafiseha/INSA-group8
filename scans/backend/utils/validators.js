const validator = require('validator');

function validateUsername(username) {
    if(!username){
        return "username required";
    }

    if(username.length < 3 || username.length > 20){
        return "username must be  between 3 and 20 characters";
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if(!usernameRegex.test(username)){
        return "username only contain letter, number and underscore ";
    }

    return true;
}


function validateEmail(email) {
    if(!email){
        return "email required";
    }
    
    if(!validator.isEmail(email)){
        return "invalid email";
    }

    return true;
}

function validatePassword(password){
    if(!password){
        return "password required";
    }

    if(password.length < 8){
        return "password must be atleast 8 character long"
    }

    if(!/[A-Z]/.test(password)){
        return "password must contain atleast one uppercase"
    }
    if(!/[0-9]/.test(password)){
        return "password must contain atleast one digit"
    }
    if (!/[!@#$%^&*]/.test(password)) {
        return "Password must contain at least one special character (!@#$%^&*)";
    }

    return true;
}

module.exports = {
    validateUsername,
    validateEmail,
    validatePassword,
};

