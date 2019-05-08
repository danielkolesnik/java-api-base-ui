
// outsource dependencies

// local dependencies
import signIn from './sign-in/reducer';
import signUp from './sign-up/reducer';
import forgotPassword from './forgot-password/reducer';
import changePassword from './change-password/reducer';
import emailConfirmation from './email-confirmation/reducer';

export default {
    signIn,
    signUp,
    forgotPassword,
    changePassword,
    emailConfirmation,
};
