function registrationSuccess() {
    // Implement registration success logic here if needed
}

function registrationFailure() {
    // Implement registration failure logic here if needed
}

function loginSuccess() {
    // ** IDENTITY ***
    FS('setIdentity', {
        uid: '654321',
        properties: {
            "identification-method": 'login',
            "displayName": 'Player 654321',
            "player-number": '654321',
            "account-status": 'REGISTERED',
            "player-tier": 'NON-VIP',
            "verification-status": 'PENDING',
        }
    });

    const identifierOptions = ['Email', 'Mobile'];
    const verifierOptions = ['Email OTP', 'SMS OTP', 'Password'];

    // ** LOGIN EVENT ***
    FS('trackEvent', {
        name: 'Login | Success',
        properties: {
            identifier: getRandomElement(identifierOptions),
            verifier: getRandomElement(verifierOptions),
            "account-status": 'REGISTERED',
            "player-tier": 'NON-VIP',
            "verification-status": 'PENDING',
            "attempt": 1
        }
    });

    console.log('Log In Success');
}

function loginFailure() {
    FS('setIdentity', { anonymous: true });

    const identifierOptions = ['Email', 'Mobile'];
    const verifierOptions = ['Email OTP', 'SMS OTP', 'Password']; 
    
    FS('trackEvent', {
        name: 'Log In | Failure',
        properties: {
            identifier: getRandomElement(identifierOptions),
            verifier: getRandomElement(verifierOptions),
            "attempt": 1,
            "error": getLoginError()
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

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
