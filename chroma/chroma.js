



function registrationSuccess() {

}

function registrationFailure() {

}

function loginSuccess() {

    // ** IDENTITY ***
    FS('setIdentity',
    uid:'123456',
    properties: {
      "player-number":'123456',
      "account-status":'SELFBAN',
      "player-tier": 'SILVER',
      "verification-status": 'PENDING',
      "identification-method": 'login'
    }) 

    // ** LOGIN EVENT ***
    FS('trackEvent', {
      name: 'Login | Success',
      properties: {
        "type": 'standard',
        "2fa": 'none'
        "attempt": 1,
      }
    });
     alert('Log In Success');
}

function loginFailure() {
    FS('trackEvent', {
      name: 'Log In | Failure',
      properties: {
        "type": 'standard',
        "2fa": 'none'
        "attempt": 1,
        "error": "InvalidCredentials"
      }
    }); 
    alert('Log In Failure');
}


function logoutSuccess() {
    FS('trackEvent', {
        name: 'Logout | Success',
        properties: {
            method: 'manual',    
        }
     });
    FS('setIdentity', { anonymous: true }); 
    alert('Logged out');
} 
