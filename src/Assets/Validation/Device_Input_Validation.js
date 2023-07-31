import PasswordValidator from 'password-validator';

const license_key_check = (data) => {
    const lk = new PasswordValidator();
    lk.is().min(16)
    .is().max(16)
    .usingPlugin((value)=>{
        const regex = /[^a-zA-Z0-9]/;
        return !regex.test(value);
    });

    const plk = lk.validate(data);
    if(!plk){
        return {error: true, helperText: 'invalid License key'};
    }
    return {error: false, helperText: ''};
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
    name.is().min(8)
    .is().max(20)
    .has().not().spaces();

    const name_check = name.validate(data, {list: true});
    const initial_check = ['min', 'max'];
    if(name_check.length === 0){
        return {error : false, helperText: ''};
    }
    if(initial_check.some(item=>name_check.includes(item))){
        return {error : true, helperText: "Please enter a device name between 8 and 20 characters"};
    }
    return {error: true, helperText: "Please enter a device name without spaces"};
}

const deviceValid = {license_key_check, name_check, pass_check};

export default deviceValid;