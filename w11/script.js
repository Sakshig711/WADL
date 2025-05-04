// Registration Function
function registerUser(e) {
	e.preventDefault();
      
	const user = {
	  name: document.getElementById('name').value.trim(),
	  email: document.getElementById('email').value.trim(),
	  mobile: document.getElementById('mobile').value.trim(),
	  dob: document.getElementById('dob').value,
	  city: document.getElementById('city').value.trim(),
	  address: document.getElementById('address').value.trim(),
	  username: document.getElementById('username').value.trim(),
	  password: document.getElementById('password').value
	};
      
	// Validation
	const mobileRegex = /^[0-9]{10}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
	if (!emailRegex.test(user.email)) {
	  alert("Invalid email format.");
	  return;
	}
      
	if (!mobileRegex.test(user.mobile)) {
	  alert("Mobile number must be exactly 10 digits.");
	  return;
	}
      
	if (!user.dob) {
	  alert("Please select a valid date of birth.");
	  return;
	}
      
	if (!user.username || !user.password) {
	  alert("Username and password cannot be empty.");
	  return;
	}
      
	let users = JSON.parse(localStorage.getItem('users')) || [];
      
	// Unique username check
	if (users.some(u => u.username === user.username)) {
	  alert("Username already exists!");
	  return;
	}
      
	users.push(user);
	localStorage.setItem('users', JSON.stringify(users));
      
	alert("Registration successful!");
	window.location.href = 'login.html';
      }
      
      // Login Function
      function loginUser(e) {
	e.preventDefault();
      
	const username = document.getElementById('loginUsername').value.trim();
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
      