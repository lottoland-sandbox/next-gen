

// Global variables
let currentStep = 1;

// Functions
function nextStep(step) {
    updateStep(step, step + 1);
}

function prevStep(step) {
    updateStep(step, step - 1);
}

function updateStep(currentStep, nextStep) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${nextStep}`).classList.add('active');
    updateProgressBar(nextStep);
}

function updateProgressBar(step) {
    const progressBarInner = document.querySelector('.progress-bar-inner');
    const fillPercentage = Math.min((step - 1) / 4 * 100, 100);
    progressBarInner.style.width = `${fillPercentage}%`;
}

function logout() {
    FS('trackEvent', {
        name: 'Logout | Success',
        properties: {
            method: 'front-end',    
        }
     });
    
    FS('setIdentity', { anonymous: true });
    alert('Logged out');
} 


function loginSubmit() {
   
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber < 34) {
        alert('Login Failure');
        const errors = ['Duplicate_Account', 'System_Unavailable', 'Fraud', 'Network_Issue'];
        const randomErrorIndex = Math.floor(Math.random() * errors.length);
        const randomError=errors[randomErrorIndex];
        
        FS('trackEvent', {
            name: 'Login | Failure',
            properties: {
                method: 'front-end',
                error: randomError,
            }
        });
        alert( randomError);
     
    } else {
        alert('Login Success');
        const randomPlayer=getRandomPlayer();
        
         FS('setIdentity', {
          uid: randomPlayer['Player Number'],
          properties: {
              playerName: randomPlayer['Player Name'],
              accountStatus: randomPlayer['Account Status'],
              verificationStatus: randomPlayer['Verification Status'],
              playerNumber: randomPlayer['Player Number'],
              playerTier: randomPlayer['Player Tier'],
              balance: randomPlayer['Balance'],
          }
         });
        
        FS('trackEvent', {
            name: 'Login | Success',
            properties: {
                method: 'front-end',
            }
        });
         alert(randomPlayer['Player Name']);
    }
    window.location.href = "homepage.html" + window.location.search;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function registrationSubmit() {
   
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber < 34) {
        alert('Registration Failure');
        const errors = ['Duplicate_Account', 'System_Unavailable', 'Out_of_state', 'Network_Issue'];
        const randomErrorIndex = Math.floor(Math.random() * errors.length);
        const randomError=errors[randomErrorIndex];
        
        FS('trackEvent', {
            name: 'Registration | Failure',
            properties: {
                method: 'front-end',
                error: randomError,
            }
        });
        alert( randomError);
     
    } else {
        alert('Registration Success');
        const randomPlayer=getRandomPlayer();
        const utmCampaign = getCookie('utm_campaign');
        const utmSource = getCookie('utm_source');
        const utmMedium = getCookie('utm_medium');
        const utmTerm = getCookie('utm_term');
        const utmDept = getCookie('dept');
        const utmDest = getCookie('dest');
        
        
        
         FS('setIdentity', {
          uid: randomPlayer['Player Number'],
          properties: {
              playerName: randomPlayer['Player Name'],
              accountStatus: randomPlayer['Account Status'],
              verificationStatus: randomPlayer['Verification Status'],
              playerNumber: randomPlayer['Player Number'],
              playerTier: randomPlayer['Player Tier'],
           
        
          }
         });

 
        
        FS('trackEvent', {
            name: 'Registration | Success',
            properties: {
                method: 'front-end',
                utm_campaign: utmCampaign,
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_term: utmTerm,
                department: utmDept,
                destination: utmDest,
            }
        });
        alert(utmCampaign);
    }
    
    window.location.href = "homepage.html" + window.location.search;
}









function redirectTo(url) {
    window.location.href = url + window.location.search;
}
 


document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});



       

