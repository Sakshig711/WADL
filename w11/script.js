function registerUser(e) {
	e.preventDefault();
      
	const user = {
	  name: document.getElementById('name').value,
	  email: document.getElementById('email').value,
	  mobile: document.getElementById('mobile').value,
	  dob: document.getElementById('dob').value,
	  city: document.getElementById('city').value,
	  address: document.getElementById('address').value,
	  username: document.getElementById('username').value,
	  password: document.getElementById('password').value
	};
      
	let users = JSON.parse(localStorage.getItem('users')) || [];
      
	// Validation: unique username
	if (users.some(u => u.username === user.username)) {
	  alert("Username already exists!");
	  return;
	}
      
	users.push(user);
	localStorage.setItem('users', JSON.stringify(users));
	alert("Registration successful!");
	window.location.href = 'login.html';
      }
      
      function loginUser(e) {
	e.preventDefault();
	const username = document.getElementById('loginUsername').value;
	const password = document.getElementById('loginPassword').value;
      
	const users = JSON.parse(localStorage.getItem('users')) || [];
      
	const match = users.find(user => user.username === username && user.password === password);
	if (match) {
	  alert("Login successful!");
	  window.location.href = 'users.html';
	} else {
	  alert("Invalid credentials.");
	}
      }
      