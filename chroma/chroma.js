function logout() {
    FS('trackEvent', {
        name: 'Logout | Success',
        properties: {
            method: 'manual',    
        }
     });
    FS('setIdentity', { anonymous: true }); 
    alert('Logged out');
} 
