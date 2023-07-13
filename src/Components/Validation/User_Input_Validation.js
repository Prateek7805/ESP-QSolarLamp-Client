import PasswordValidator from "password-validator";

const email_check = (data) =>{
    const email = new PasswordValidator();
    email.is().min(4)
    .is().max(150)
    .is().usingPlugin((value)=>{
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email_regex.test(value);
    });
    const email_valid = email.validate(data);
    if(!email_valid){
        return {error: true, helperText: 'Invalid Email ID'}
    }
    return {error: false, helperText: ''}
}
const pass_check = (data) =>{
    const password = new PasswordValidator();
    password.is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols();

    const pel = password.validate(data, {list: true}).map(item=>{
        if(item.endsWith('s')){
            return item.substring(0, item.length - 1);
        }
        return item;
    });
    const initial_check = ['min', 'max'];
    if(pel.length === 0) return {error: false, helperText: ''};
    if(initial_check.some(item=>pel.includes(item)))
        return {error: true, helperText: 'Please enter a password between 8 and 20 characters'};
    return {error: true, helperText: `Please enter a password with atleast 1 ${pel.join(', ')} characters`};
}
const name_check = (data) => {
    const name = new PasswordValidator();
    name.is().min(2)
    .is().max(20)
    .has().not().spaces()
    .has().not().digits()
    .has().not().symbols();

    const name_check = name.validate(data, {list: true});
    const initial_check = ['min', 'max'];
    if(name_check.length === 0){
        return {error : false, message: ''};
    }
    if(initial_check.some(item=>name_check.includes(item))){
        return {error : true, message: "Please enter the firstname and lastname between 2 and 20 characters"};
    }
    return {error: true, message: "Please enter the firstname or lastname without any spaces, numbers or symbols"};
}

export default {email_check, pass_check, name_check};