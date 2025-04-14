



function registrationSuccess() {

}

function registrationFailure() {

}

function loginSuccess() {
    // ** IDENTITY ***
    FS('setIdentity', {
        uid: '654321',
        properties: {
            displayName: 'Player 654321',
            "player-number": '654321',
            "account-status": 'SELFBAN',
            "player-tier": 'SILVER',
            "verification-status": 'PENDING',
            "identification-method": 'login'
        }
    });

    // ** LOGIN EVENT ***
    FS('trackEvent', {
        name: 'Login | Success',
        properties: {
            "type": 'standard',
            "2fa": 'none',
            "attempt": 1
        }
    });

    alert('Log In Success');
}

function loginFailure() {
    FS('setIdentity', { anonymous: true });

    
    FS('trackEvent', {
        name: 'Log In | Failure',
        properties: {
            "type": 'standard',
            "attempt": 1,
            "error": getLoginError()
        }
    });

    alert('Log In Failure');
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
        error = 'SelfBan';         // 20% chance
    } else {
        error = 'GamstopBan';          // 20% chance
    }
    return error;
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

    alert('Logged out');
}
