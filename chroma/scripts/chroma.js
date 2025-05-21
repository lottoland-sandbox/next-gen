function accountRegistrationSuccess() {

 FS('trackEvent', {
        name: 'Account | Registration | Success',
        properties: {
            
            accountStatus: 'REGISTERED',
            playerTier: 'NON-VIP',
            verificationStatus: 'PENDING',


            
         
        }
    });    
}




function registrationSuccess() {    
    FS('setIdentity', {
        uid: '654321',
        properties: {
            method: 'Registration',
            displayName: 'Player 654321',
            playerNumber: '654321',
            accountStatus: 'REGISTERED',
            playerTier: 'NON-VIP',
            verificationStatus: 'PENDING',
        }
    });
    FS('trackEvent', {
        name: 'Registration | Success',
        properties: {
            // *** None Currently ***
        }
    });
    console.log('Registration Success');
}


function registrationFailure() {  
    FS('trackEvent', {
        name: 'Registration | Failure',
        properties: {
            error: getRegistrationError()
        }
    });
    console.log('Registration Failure')
}

function loginSuccess() {
    // ** IDENTITY ***
    FS('setIdentity', {
        uid: '654321',
        properties: {
            "identification-method": 'login',
            "displayName": 'Player 654321',
            "playerNumber": '654321',
            "accountStatus": 'REGISTERED',
            "playerTier": 'NON-VIP',
            "verificationStatus": 'PENDING',
        }
    });

    const identifierOptions = ['Email', 'Mobile'];
    const verifierOptions = ['Email OTP', 'SMS OTP', 'Password'];

    const identifier = getRandomElement(identifierOptions);
    const verifier = getRandomElement(verifierOptions);

    // ** LOGIN EVENT ***
    FS('trackEvent', {
        name: 'Login | Success',
        properties: {
            identifier: identifier,
            verifier: verifier,
            credentials: `${identifier} - ${verifier}`,
            accountStatus: 'REGISTERED',
            playerTier: 'NON-VIP',
            verificationStatus: 'PENDING',
            attempt: 1
        }
    });

    console.log('Log In Success');
}

function loginFailure() {
    FS('setIdentity', { anonymous: true });

    const identifierOptions = ['Email', 'Mobile'];
    const verifierOptions = ['Email OTP', 'SMS OTP', 'Password']; 

    const identifier = getRandomElement(identifierOptions);
    const verifier = getRandomElement(verifierOptions);

    FS('trackEvent', {
        name: 'Log In | Failure',
        properties: {
            identifier: identifier,
            verifier: verifier,
            credentials: `${identifier} - ${verifier}`,
            attempt: 1,
            error: getLoginError()
        }
    });

    console.log('Log In Failure');
}
function logoutSuccess() {
    const method = Math.random() < 0.2 ? 'timeout' : 'manual';

    FS('trackEvent', {
        name: 'Logout | Success',
        properties: {
            method: method
        }
    });

    FS('setIdentity', { anonymous: true });

    console.log('Logged out');
}

function getLoginError() {
    const rand = Math.random();

    let error;
    if (rand < 0.1) {
        error = 'SystemFailure';         // 10% chance
    } else if (rand < 0.4) {
        error = 'InvalidCredential';     // 30% chance
    } else if (rand < 0.6) {
        error = 'AccountLocked';         // 20% chance
    } else if (rand < 0.8) {
        error = 'SelfBan';               // 20% chance
    } else {
        error = 'GamstopBan';            // 20% chance
    }
    return error;
}



function getRegistrationError() {
    const rand = Math.random();

    let error;
    if (rand < 0.1) {
        error = 'SystemFailure';         // 10% chance
    } else if (rand < 0.4) {
        error = 'GamStopBan';     // 30% chance
    } else if (rand < 0.6) {
        error = 'AccountClosed';         // 20% chance
    } else if (rand < 0.8) {
        error = 'BetStopBan';               // 20% chance
    } else {
        error = 'SystemUnavailable';            // 20% chance
    }
    return error;
}


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
