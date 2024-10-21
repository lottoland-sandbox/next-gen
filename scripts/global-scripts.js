

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

function loginSubmit() {
   
    // Simulate form submission outcome
    const event_properties = {};
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber < 34) {
        alert('Login Failure');
        const errors = ['Duplicate_Account', 'System_Unavailable', 'Fraud', 'Network_Issue'];
        const randomErrorIndex = Math.floor(Math.random() * errors.length);
        
        FS('trackEvent', {
            name: 'Login Failure',
            error: errors[randomErrorIndex],         
        });
     
    } else {
        alert('Login Success');
        FS('trackEvent', {
            name: 'Login Success',
            player: getRandomPlayer(),
        });
       
    }
    window.location.href = "homepage.html" + window.location.search;
}

function redirectTo(url) {
    window.location.href = url + window.location.search;
}
 
document.getElementById('resetForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    document.getElementById('popup').style.display = 'block'; 
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});
