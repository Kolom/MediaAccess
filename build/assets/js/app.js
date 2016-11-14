;/* --- Initialization section --- */

/**
 * Initialize form event listeners
 */
function initForm() {
    var accountForm = document.querySelector('.new_account_form--customer');
    var passwordInput = document.querySelector('#password-input');

    accountForm.onsubmit = submitAccountForm; // set onsubmit event handler for form
    accountForm.noValidate = true; //disable browser validation

    passwordInput.oninput = checkPassStrength; // set oninput event handler for password input
}

window.onload = function () {
    initForm();
};

/* --- Event handlers section --- */

/**
 * Form submit event handler
 *
 * @returns {boolean} - form common validation result
 */
function submitAccountForm() {
    var account = getAccountObj();
    var accountValidationResult = validateAccount(account);

    //check that all fields are valid
    if (accountValidationResult.isValid === true) {
        var popup = document.querySelector('#popup');
        popup.classList.remove('hidden'); //show popup
    } else
    //show validation messages if some of form fields aren't valid
        renderValidationMessages(accountValidationResult);

    // return false to prevent page reload
    return false;
}

/**
 * Check password strength and show appropriate notification indicator
 *
 * @param e - input event
 */
function checkPassStrength(e) {
    console.log(e);
    var passLength = e.target.value.length;

    //get indicators
    var firstLevelStrength = document.querySelector('.pass-str-indicator > .first_level');
    var secondLevelStrength = document.querySelector('.pass-str-indicator > .sec_level');
    var thirdLevelStrength = document.querySelector('.pass-str-indicator > .third_level');
    var fourthLevelStrength = document.querySelector('.pass-str-indicator > .fourth_level');

    //hide all
    firstLevelStrength.classList.add('hidden');
    secondLevelStrength.classList.add('hidden');
    thirdLevelStrength.classList.add('hidden');
    fourthLevelStrength.classList.add('hidden');

    //show appropriate indicator
    if (passLength < 6)
        firstLevelStrength.classList.remove('hidden');
    else if (passLength < 8)
        secondLevelStrength.classList.remove('hidden');
    else if (passLength < 9)
        thirdLevelStrength.classList.remove('hidden');
    else
        fourthLevelStrength.classList.remove('hidden');
}

/* --- Validation --- */
/**
 * Validate account object.
 * Returns validation object with fields - isValid and validationMessage
 *
 * @param account - account object
 * @returns {{email: {isValid: boolean, validationMessage: string}, fName: {isValid: boolean, validationMessage: string}, lName: {isValid: boolean, validationMessage: string}, password: {isValid: boolean, validationMessage: string}, confirmPassword: {isValid: boolean, validationMessage: string}, isValid: boolean}}
 */
function validateAccount(account) {
    //validation result object default state
    var validationResult = {
        email: {
            isValid: false,
            validationMessage: "please, type in valid e-mail!"
        },
        fName: {
            isValid: false,
            validationMessage: "please, type in valid first name!"
        },
        lName: {
            isValid: false,
            validationMessage: "please, type in valid last name!"
        },
        password: {
            isValid: false,
            validationMessage: "please, type in valid password!"
        },
        confirmPassword: {
            isValid: false,
            validationMessage: "confirm password must met password!"
        },
        isValid: false
    };

    //validate email
    validationResult.email.isValid = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(account.email);
    //validate first name
    validationResult.fName.isValid = account.fName.trim().length > 0;
    //validate last name
    validationResult.lName.isValid = account.lName.trim().length > 0;
    //validate password
    validationResult.password.isValid = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/).test(account.password);
    //validate confirm password
    validationResult.confirmPassword.isValid = (account.password === account.confirmPassword);

    //whole form validate
    validationResult.isValid = validationResult.email.isValid && validationResult.fName.isValid && validationResult.lName.isValid && validationResult.password.isValid && validationResult.confirmPassword.isValid

    return validationResult;
}


/**
 * Render validation messages under form fields
 *
 * @param validationResult - object represents form fields validation result
 */
function renderValidationMessages(validationResult) {
    console.log(validationResult);

    var emailErrorP = document.querySelector('.input-error--email');
    var fNameErrorP = document.querySelector('.input-error--f_name');
    var lNameErrorP = document.querySelector('.input-error--l_name');
    var passwordErrorP = document.querySelector('.input-error--password');
    var passConfirmationP = document.querySelector('.pass_confirmation > .input-error--password');

    //set validation messages
    emailErrorP.innerHTML = validationResult.email.validationMessage;
    fNameErrorP.innerHTML = validationResult.fName.validationMessage;
    lNameErrorP.innerHTML = validationResult.lName.validationMessage;
    passwordErrorP.innerHTML = validationResult.password.validationMessage;
    passConfirmationP.innerHTML = validationResult.confirmPassword.validationMessage;

    //show or hide validation messages refer to isValid flag
    if (validationResult.email.isValid) emailErrorP.classList.add('hidden'); else emailErrorP.classList.remove('hidden');
    if (validationResult.fName.isValid) fNameErrorP.classList.add('hidden'); else fNameErrorP.classList.remove('hidden');
    if (validationResult.lName.isValid) lNameErrorP.classList.add('hidden'); else lNameErrorP.classList.remove('hidden');
    if (validationResult.password.isValid) passwordErrorP.classList.add('hidden'); else passwordErrorP.classList.remove('hidden');
    if (validationResult.confirmPassword.isValid) passConfirmationP.classList.add('hidden'); else passConfirmationP.classList.remove('hidden');
}

/**
 * Construct account object from appropriate form fields
 *
 * @returns {{email: *, fName: *, lName: *, password: *, confirmPassword: *}}
 */
function getAccountObj() {
    var emailInput = document.querySelector('#email-input');
    var fNameInput = document.querySelector('#first_name-input');
    var lNameInput = document.querySelector('#last_name-input');
    var passwordInput = document.querySelector('#password-input');
    var confirmPasswordInput = document.querySelector('#password_confirm-input');

    return {
        email: emailInput.value,
        fName: fNameInput.value,
        lName: lNameInput.value,
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value
    }
}


//# sourceMappingURL=app.js.map
