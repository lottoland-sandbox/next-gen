// -----------------------------
// UTILITY FUNCTIONS
// -----------------------------
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomAmount() {
    const amounts = [10,20,30,35,40,50,60,70,75,80,90,100,120,125,150,175,180,200];
    return getRandomElement(amounts);
}

function getRandomMethod() {
    const methods = ['Visa','Mastercard','Paypal','Skrill','Netteller'];
    return getRandomElement(methods);
}

function getRandomErrorData() {
    const errors = [
        {code: "UNMNAN000", type: "MESSAGEKEY", category: "unknown"},
        {code: "BIZPLA007", type: "MESSAGEKEY", category: "cardExpired"},
        {code: "BIZPLA009", type: "MESSAGEKEY", category: "cvvWrong"},
        {code: "BIZFIN001", type: "MESSAGEKEY", category: "transactionNotFound"}
        // Add more as needed
    ];
    return getRandomElement(errors);
}

function getRegistrationError() {
    const rand = Math.random();
    if (rand < 0.1) return 'SystemFailure';
    if (rand < 0.4) return 'GamStopBan';
    if (rand < 0.6) return 'AccountClosed';
    if (rand < 0.8) return 'BetStopBan';
    return 'SystemUnavailable';
}

function getLoginError() {
    const rand = Math.random();
    if (rand < 0.1) return 'SystemFailure';
    if (rand < 0.4) return 'InvalidCredential';
    if (rand < 0.6) return 'AccountLocked';
    if (rand < 0.8) return 'SelfBan';
    return 'GamstopBan';
}

// -----------------------------
// FULLSTORY HELPERS
// -----------------------------
function safeFS(callback) {
    if (typeof FS !== 'undefined' && FS.event) {
        callback();
    } else {
        console.warn('FullStory not loaded yet.');
    }
}

function setSite(siteName) {
    safeFS(() => {
        FS.setUserVars({ site: siteName });
        console.log(`FS.setUserVars called with site: ${siteName}`);
    });
}

// -----------------------------
// REGISTRATION
// -----------------------------
function registrationSuccess(userId='654321') {    
    safeFS(() => {
        FS.setUserVars({
            uid: userId,
            method: 'Registration',
            displayName: `Player ${userId}`,
            playerNumber: userId,
            accountStatus: 'REGISTERED',
            playerTier: 'NON-VIP',
            verificationStatus: 'PENDING'
        });
        FS.event('Registration | Success');
        console.log('Registration Success sent to FullStory');
    });
}

function registrationFailure() {  
    safeFS(() => {
        FS.event('Registration | Failure', {
            error: getRegistrationError()
        });
        console.log('Registration Failure sent to FullStory');
    });
}

// -----------------------------
// LOGIN
// -----------------------------
function loginSuccess(userId='654321') {
    safeFS(() => {
        FS.setUserVars({
            uid: userId,
            method: 'Login',
            displayName: `Player ${userId}`,
            playerNumber: userId,
            accountStatus: 'REGISTERED',
            playerTier: 'NON-VIP',
            verificationStatus: 'PENDING'
        });

        const identifierOptions = ['Email', 'Mobile'];
        const verifierOptions = ['Email OTP', 'SMS OTP', 'Password'];
        const identifier = getRandomElement(identifierOptions);
        const verifier = getRandomElement(verifierOptions);

        FS.event('Login | Success', {
            identifier,
            verifier,
            credentials: `${identifier} - ${verifier}`,
            accountStatus: 'REGISTERED',
            playerTier: 'NON-VIP',
            verificationStatus: 'PENDING',
            attempt: 1
        });
        console.log('Login Success sent to FullStory');
    });
}

function loginFailure() {
    safeFS(() => {
        FS.setUserVars({ anonymous: true });

        const identifierOptions = ['Email', 'Mobile'];
        const verifierOptions = ['Email OTP', 'SMS OTP', 'Password'];
        const identifier = getRandomElement(identifierOptions);
        const verifier = getRandomElement(verifierOptions);

        FS.event('Login | Failure', {
            identifier,
            verifier,
            credentials: `${identifier} - ${verifier}`,
            attempt: 1,
            error: getLoginError()
        });
        console.log('Login Failure sent to FullStory');
    });
}

// -----------------------------
// LOGOUT
// -----------------------------
function logoutSuccess() {
    safeFS(() => {
        const method = Math.random() < 0.2 ? 'timeout' : 'manual';
        FS.event('Logout | Success', { method });
        FS.setUserVars({ anonymous: true });
        console.log('Logout Success sent to FullStory');
    });
}

// -----------------------------
// DEPOSITS
// -----------------------------
function payinSuccess(process='FTD') {
    safeFS(() => {
        FS.event('Deposit | Success', {
            process,
            method: getRandomMethod(),
            currency: 'GBP',
            amount: getRandomAmount()
        });
        console.log(`Payin ${process} Success sent to FullStory`);
    });
}

function payinPending(process='FTD') {
    safeFS(() => {
        FS.event('Deposit | Pending', {
            process,
            method: getRandomMethod(),
            currency: 'GBP',
            amount: getRandomAmount()
        });
        console.log(`Payin ${process} Pending sent to FullStory`);
    });
}

function payinFailure(process='FTD') {
    safeFS(() => {
        const error = getRandomErrorData();
        FS.event('Deposit | Failure', {
            process,
            method: getRandomMethod(),
            code: error.code,
            type: error.type,
            category: error.category,
            currency: 'GBP',
            amount: getRandomAmount(),
            error: `${error.code} | ${error.type} | ${error.category}`
        });
        console.log(`Payin ${process} Failure sent to FullStory`);
    });
}
