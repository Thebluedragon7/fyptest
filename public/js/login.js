var loginButton = document.getElementById('admin-login-btn');
console.log("Loaded");
loginButton.addEventListener('click', function (event) {
    console.log("Clicked!");
    event.preventDefault(); // Prevent the default link behavior

    var username = document.getElementById('admin-username').value;
    var password = document.getElementById('admin-password').value;

    // Validate the username and password here

    // Send the username and password to the server using fetch()
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'email=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // window.location.href = '/admin/dashboard';

            // window.location.replace(`/admin/dashboard?access_token=${encodeURIComponent(localStorage.getItem('accessToken'))}`);
            fetch('/admin/dashboard', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = '/admin/dashboard';
                    } else {
                        throw new Error('Failed to fetch dashboard');
                    }
                })
                .catch(error => {
                    // handle error
                });
        })
        .catch(function (error) {
            // Handle the error here
        });
});