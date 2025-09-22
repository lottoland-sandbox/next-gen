
function setSite(siteName) {
    if (typeof FS !== 'undefined' && FS.setVars) {
        FS.setVars('session', {
            site: siteName
        });
        console.log(`FS.setVars called with site: ${siteName}`);
    } else {
        console.warn('FullStory not loaded yet. siteName:', siteName);
    }
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
    });
    console.log('Registration Failure')
}

function loginSuccess() {
    // ** IDENTITY ***
    FS('setIdentity', {
        uid: '654321',
        properties: {
            "method": 'login',
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

function payinFTDSuccess() {

    var method=getRandomMethod();
    var currency='GBP';
    var amount=getRandomAmount(); 

    FS('trackEvent', {
        name: 'Deposit | Success',
        properties: {
            process: 'FTD',
            method: method, 
            currency: currency,
            amount: amount,
        }
    });
     console.log('Payin FTD Success');
}




function payinFTDPending() {

    var method=getRandomMethod();
    var currency='GBP';
    var amount=getRandomAmount(); 

    FS('trackEvent', {
        name: 'Deposit | Pending',
        properties: {
            process: 'FTD',
            method: method, 
            currency: currency,
            amount: amount,
        }
    });
     console.log('Payin FTD Pending');
}


function payinSDPending() {

    var method=getRandomMethod();
    var currency='GBP';
    var amount=getRandomAmount(); 

    FS('trackEvent', {
        name: 'Deposit | Pending',
        properties: {
            process: 'SD',
            method: method, 
            currency: currency,
            amount: amount,
        }
    });
     console.log('Payin SD Pending');
}



function payinFTDFailure() {

    var error = getRandomErrorData();
    var method=getRandomMethod();
    var currency='GBP';
    var amount=getRandomAmount(); 

    FS('trackEvent', {
        name: 'Deposit | Failure',
        properties: {
            process: 'FTD',
            method: method, 
            code: error.code,
            type: error.type,
            category: error.category,
            currency: currency,
            amount: amount,
            error: `${error.code} | ${error.type} | ${error.category}`,
        }
    });
     console.log('Payin FTD Failure');
}

function payinSDSuccess() {
    var method=getRandomMethod();
    var currency='GBP';
    var amount=getRandomAmount(); 

    FS('trackEvent', {
        name: 'Deposit | Success',
        properties: {
            process: 'SD',
            method: method, 
            currency: currency,
            amount: amount,
        }
    });
     console.log('Payin SD Success');
}



function payinSDFailure() {

    var error = getRandomErrorData();
    var method=getRandomMethod();
    var currency='GBP';
    var amount=getRandomAmount(); 

    FS('trackEvent', {
        name: 'Deposit | Failure',
        properties: {
            process: 'SD',
            method: method, 
            code: error.code,
            type: error.type,
            category: error.category,
            currency: currency,
            amount: amount,
            error: `${error.code} | ${error.type} | ${error.category}`,
        }
    });
     console.log('Payin SD Failure');
}

function getRandomAmount() {
    const amounts = [
        10, 20, 30, 35, 40, 50, 60, 70, 75, 80, 90,
        100, 120, 125, 150, 175, 180, 200
    ];
    return amounts[Math.floor(Math.random() * amounts.length)];
}

function getRandomMethod() {
    const methods = ['Visa', 'Mastercard', 'Paypal', 'Skrill', 'Netteller'];
    return methods[Math.floor(Math.random() * methods.length)];
}

function getRandomErrorData() {
    const errors = [
{code: "UNMNAN000",type: "MESSAGEKEY", category: "unknown"},
{code: "BIZUNM000",type: "MESSAGEKEY", category: "wrongConfiguration"},
{code: "BIZCFG001",type: "MESSAGEKEY", category: "unknown"},
{code: "BIZCFG002",type: "MESSAGEKEY", category: "unknown"},
{code: "BIZCFG003",type: "MESSAGEKEY", category: "unknown"},
{code: "BIZCFG004",type: "MESSAGEKEY", category: "unknown"},
{code: "BIZCFG005",type: "MESSAGEKEY", category: "3dsValidationFailed"},
{code: "BIZTDS001",type: "MESSAGEKEY", category: "3dsExpired"},
{code: "BIZTDS002",type: "MESSAGEKEY", category: "3dsAuthenticationNotPerformed"},
{code: "BIZTDS003",type: "MESSAGEKEY", category: "3dsAuthenticationRejected"},
{code: "BIZTDS004",type: "MESSAGEKEY", category: "3dsNotAuthenticatedAccountNotVerified"},
{code: "BIZTDS005",type: "MESSAGEKEY", category: "unknown"},
{code: "BIZTDS006",type: "MESSAGEKEY", category: "readTimeout"},
{code: "BIZTDS007",type: "MESSAGEKEY", category: "paymentAbandoned"},
{code: "BIZPLA000",type: "MESSAGEKEY", category: "insuficientFunds"},
{code: "BIZPLA001",type: "MESSAGEKEY", category: "tooManyPspAccounts"},
{code: "BIZPLA003",type: "MESSAGEKEY", category: "pspAccountUsedByOtherUser"},
{code: "BIZPLA004",type: "MESSAGEKEY", category: "accountBlocked"},
{code: "BIZPLA005",type: "MESSAGEKEY", category: "accountSuspended"},
{code: "BIZPLA006",type: "MESSAGEKEY", category: "contactProviderSupport"},
{code: "BIZPLA007",type: "MESSAGEKEY", category: "cardExpired"},
{code: "BIZPLA008",type: "MESSAGEKEY", category: "depositNeedsToBeFirst"},
{code: "BIZPLA009",type: "MESSAGEKEY", category: "cvvWrong"},
{code: "BIZPLA010",type: "MESSAGEKEY", category: "countryNotAllowed"},
{code: "BIZPLA011",type: "MESSAGEKEY", category: "cardBlocked"},
{code: "BIZPLA012",type: "MESSAGEKEY", category: "cancelledByUser"},
{code: "BIZPLA013",type: "MESSAGEKEY", category: "invalidAccountNumber"},
{code: "BIZPLA014",type: "MESSAGEKEY", category: "contactBank"},
{code: "BIZPLA015",type: "MESSAGEKEY", category: "internalErrorProvider"},
{code: "BIZPLA016",type: "MESSAGEKEY", category: "blacklistedIban"},
{code: "BIZPLA017",type: "MESSAGEKEY", category: "INSTRUMENT_CAN_NOT_BE_USED"},
{code: "BIZPLA017",type: "INSTRUMENT", category: "firstUsedCardInactive"},
{code: "BIZPLA018",type: "MESSAGEKEY", category: "invalidIban"},
{code: "BIZPLA019",type: "MESSAGEKEY", category: "paymentRequestExpiredCancelled"},
{code: "BIZPLA020",type: "MESSAGEKEY", category: "failedBankAuth"},
{code: "BIZPLA021",type: "MESSAGEKEY", category: "voucherRedeemed"},
{code: "BIZPLA022",type: "MESSAGEKEY", category: "voucherCannotBeFound"},
{code: "BIZPLA023",type: "MESSAGEKEY", category: "voucherExpiredOrCancelled"},
{code: "BIZPLA024",type: "MESSAGEKEY", category: "accountMismatch"},
{code: "BIZPLA025",type: "MESSAGEKEY", category: "amountLowerThanOriginal"},
{code: "BIZPLA026",type: "MESSAGEKEY", category: "invalidUserId"},
{code: "BIZPLA027",type: "MESSAGEKEY", category: "invalidCurrency"},
{code: "BIZPLA028",type: "MESSAGEKEY", category: "insuficientFundsMerchantAccount"},
{code: "BIZFIN001",type: "MESSAGEKEY", category: "transactionNotFound"},
{code: "BIZNTX000",type: "MESSAGEKEY", category: "invalidMerchantCode - not in aurum repository"},
{code: "TECCFG001",type: "MESSAGEKEY", category: "tokenExpired"},
{code: "PSPINT001",type: "MESSAGEKEY", category: "INSTRUMENT_CAN_NOT_BE_USED"},
{code: "PSPINT001",type: "INSTRUMENT", category: "technicalErrorDlq"},
{code: "TECAWS001",type: "MESSAGEKEY", category: "TRANSACTION_NOT_FOUND"},
{code: "BIZNTX000",type: "ALERTING", category: "TRANSACTION_IN_DOUBT"},
{code: "TECNET504",type: "ALERTING", category: "TRANSACTION_IN_DOUBT"},
{code: "TECNET408",type: "ALERTING", category: "REFUND_FAILED"},
{code: "BIZRFD000",type: "ALERTING", category: ""},
{code: "TECAWS002",type: "ALERTING", category: "ibanBlocking"},
{code: "MTHBIC001",type: "MESSAGEKEY", category: "INSTRUMENT_CAN_NOT_BE_USED"},
{code: "MTHBIC001",type: "INSTRUMENTS", category: ""},
    ];
    return getRandomElement(errors);
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
