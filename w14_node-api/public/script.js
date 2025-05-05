fetch("/api/users")
  .then(response => response.json())
  .then(users => {
    const list = document.getElementById("userList");
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (${user.email})`;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error fetching user data:", error);
  });
