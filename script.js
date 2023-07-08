// Get the button element
const toggleButton = document.getElementById('toggle-dark-mode');

// Add event listener to the button
toggleButton.addEventListener('click', function() {
  // Toggle the 'dark-mode' class on the body element
  document.body.classList.toggle('dark-mode');
});
