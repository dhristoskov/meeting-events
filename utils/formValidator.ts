import { Errors } from "interfaces/errors";

// export const ValidateEmail: RegExp = RegExp(/^\S+@\S+\.\S+$/);
export const EmailValidator: RegExp = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export const  ValidateInput = (name: string, value: string): Errors => {

        let errors: Errors = {
            username: '',
            email: '',
            password: '',
            password2: ''
        };

        switch(name){ 
            case 'username':
                errors.username = value.length < 3
                    ? 'Username must be at least 3 characters long!'
                    : '';
                    break; 
            case 'email':
                errors.email = EmailValidator.test(value)
                    ? ''
                    : 'Email is not valid!';
                    break;   
            case 'password':
                errors.password = value.length < 7
                    ? 'Password must be at least 7 characters long!'
                    : '';   
                    break;    
            case 'password2':
                errors.password2 = value.length < 7
                    ? 'Password must be at least 7 characters long!'
                    : '';   
                    break;      
            default:
                throw new Error('Something went wrong!');
        };
        return errors
    };