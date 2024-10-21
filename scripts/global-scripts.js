

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
        alert('Registration Failure');
        event_properties.Ref='REG-37';
        event_properties.Outcome = 'failure';
        const errors = ['Duplicate_Account', 'System_Unavailable', 'Fraud', 'Network_Issue'];
        const randomErrorIndex = Math.floor(Math.random() * errors.length);
        event_properties.Error = errors[randomErrorIndex];
        event_properties['Domain'] = Domain;
        event_properties['Action'] = 'outcome';
        event_properties['Name'] = 'account';
        event_properties['Method'] = 'backend';
     

    } else {
        alert('Registration Success');
        event_properties.Ref='REG-35';
        event_properties['Domain'] = Domain;
        event_properties['Action'] = 'outcome';
        event_properties['Name'] = 'account';
        event_properties['Method'] = 'backend';
        event_properties.Outcome = 'success';
        const statuses = ['verified', 'unverified'];
        const randomStatusIndex = Math.floor(Math.random() * statuses.length);
        event_properties.Status = statuses[randomStatusIndex];
   

        // Fake Backend record
        const backend_properties = {};
        backend_properties.Ref='REG-38';
        backend_properties['Domain'] = Domain;
        backend_properties['Method'] = 'backend';
        backend_properties.Outcome = 'success';
       
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
