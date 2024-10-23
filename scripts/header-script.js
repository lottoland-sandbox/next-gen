




//RANDOM USERS
var user1 = {
    'Player Name': 'MJ',
    'Account Status': 'standard',
    'Verification Status': 'verified',
    'Player Number': '1234',
    'Player Tier': 'VIP',
    'Balance': '10.23',
    'Logged In': 'yes',

    'utm_campaign': 'halloween',
    'utm_source': 'facebook',
    'utm_medium': 'social',
    'utm_term': 'ghostofdead_50',
    'department': 'acquisition_organic',
    'destination': 'landing',
};

var user2 = {
    'Player Name': 'ML',
    'Account Status': 'suspended',
    'Verification Status': 'unverified',
    'Player Number': '4321',
    'Player Tier': 'NON VIP',
    'Balance': '102.23',
    'Logged In': 'yes',

    'utm_campaign': 'christmas',
    'utm_source': 'groupon',
    'utm_medium': 'affiliates',
    'utm_term': 'advent_calendar',
    'department': 'acquisition_performance',
    'destination': 'landing',
};

var user3 = {
    'Player Name': 'PG',
    'Account Status': 'closed',
    'Verification Status': 'unverified',
    'Player Number': '2222',
    'Player Tier': 'GOLD',
    'Balance': '0.22',
    'Logged In': 'yes',

    'utm_campaign': 'halloween',
    'utm_source': 'google',
    'utm_medium': 'ppc',
    'utm_term': 'ghostofdead_50',
    'department': 'acquisition_performance',
    'destination': 'landing',
};

var user4 = {
    'Player Name': 'JF',
    'Account Status': 'self excluded',
    'Verification Status': 'pending',
    'Player Number': '18882',
    'Player Tier': 'PLATINUM',
    'Balance': '9.11',
    'Logged In': 'yes',

    'utm_campaign': 'casino',
    'utm_source': 'myaffiliates',
    'utm_medium': 'coop',
    'utm_term': 'big_bass_bonanza',
    'department': 'acquisition_performance',
    'destination': 'landing',
};

// Function to select a random payload
function getRandomPlayer() {
    const payloads = [user1, user2, user3, user4];
    const randomIndex = Math.floor(Math.random() * payloads.length);
    return payloads[randomIndex];
}


 
 

