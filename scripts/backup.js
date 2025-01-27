

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

      // Amplitude - Logout | Success ****
        const eventProperties = {
           method: 'front-end',
    
        };
        amplitude.track('Logout | Success', eventProperties);
    
    FS('setIdentity', { anonymous: true });

 
    

    
    alert('Logged out');
} 


function loginSubmit() {
   
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber < 34) {
        
        const errors = ['Closed','Gamstop_Ban','Self_Ban', 'System_Unavailable', 'Fraud', 'Network_Issue'];
        const randomErrorIndex = Math.floor(Math.random() * errors.length);
        const randomError=errors[randomErrorIndex];

        // Full Story - Login | Failure ****
        FS('trackEvent', {
            name: 'Login | Failure',
            properties: {
                method: 'front-end',
                error: randomError,
            }
        });

 
        
        alert( 'Login Failure '+randomError);
     
    } else {
        
        const randomPlayer=getRandomPlayer();

         // Full Story - Identity ****
         FS('setIdentity', {
          uid: randomPlayer['Player Number'],
          properties: {
              playerName: randomPlayer['Player Name'],
              accountStatus: randomPlayer['Account Status'],
              verificationStatus: randomPlayer['Verification Status'],
              playerNumber: randomPlayer['Player Number'],
              playerTier: randomPlayer['Player Tier'],
              balance: randomPlayer['Balance'],
              utm_campaign: randomPlayer['utm_campaign'],
              utm_source: randomPlayer['utm_source'],
              utm_medium: randomPlayer['utm_medium'],
              utm_term: randomPlayer['utm_term'],
              department: randomPlayer['department'],
              destination: randomPlayer['destination'],
              
          }
         });
       

       
        

        // Full Story - Login | Success Event ****
        FS('trackEvent', {
            name: 'Login | Success',
            properties: {
                method: 'front-end',
            }
        });
    

 

        
         alert('Login Success - ' + randomPlayer['Player Name']);
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
        
        
        // Full Story Identity
         FS('setIdentity', {
          uid: randomPlayer['Player Number'],
          properties: {
              playerName: randomPlayer['Player Name'],
              accountStatus: randomPlayer['Account Status'],
              verificationStatus: randomPlayer['Verification Status'],
              playerNumber: randomPlayer['Player Number'],
              playerTier: randomPlayer['Player Tier'],
              utm_campaign: utmCampaign,
              utm_source: utmSource,
              utm_medium: utmMedium,
              utm_term: utmTerm,
              department: utmDept,
              destination: utmDest,
        
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

       
      

      try {
    alert(utmCampaign || "Campaign is not defined.");
} catch (e) {
    alert("Campaign is not defined.");
}
 
      
    }
    
    window.location.href = "homepage.html" + window.location.search;
}









function redirectTo(url) {
    window.location.href = url + window.location.search;
}
 


document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});


function payinFTD() {

    
    const instruments = ['visa', 'mastercard', 'paypal', 'neteller'];
    const randomIndexInst = Math.floor(Math.random() * instruments.length);
    const instrument= instruments[randomIndexInst];

   
    const denominations = [ 5, 10, 20, 25, 50, 75, 100];
    const randomIndex = Math.floor(Math.random() * denominations.length);
    const amount = denominations[randomIndex];

    FS('trackEvent', {
        name: 'Payin | Success',
        properties: {
            method: 'front-end',
            amount: amount,
            instrument: instrument,
            type: 'ftd',
        }
    });

   


    
    alert("Payin FTD Success with amount: " + amount +" "+instrument);
}

function payinSD() {
    const instruments = ['visa', 'mastercard', 'paypal', 'neteller'];
    const randomIndexInst = Math.floor(Math.random() * instruments.length);
    const instrument= instruments[randomIndexInst];

   
    const denominations = [ 5, 10, 20, 25, 50, 75, 100];
    const randomIndex = Math.floor(Math.random() * denominations.length);
    const amount = denominations[randomIndex];
    
 FS('trackEvent', {
            name: 'Payin | Success',
            properties: {
                method: 'front-end',
                amount: amount,
                instrument: instrument,
                type: 'sd',
                
            }
        });




       


function addToCart(product) {
    console.log("Clicked product:", product);
    // FULLSTORY TRACKING
    FS('trackEvent', {
            name: 'Cart | Added',
            properties: {
                genre: 'Lottery',
                product: product,
                
            }
        });
    
    


  const productsDiv = document.getElementById("products");
  const description = document.createElement("p");
  description.textContent = product;
  productsDiv.appendChild(description);

    
}

function checkout() {
    alert('Checked Out');
}
