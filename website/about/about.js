// Resize the header text when the window is resized
window.addEventListener('resize', () => {
  document.getElementById('aboutTitle').style.fontSize = `${Math.max(25, window.innerWidth / 25)}px`;
});

// Set the initial font size for the header text
window.addEventListener('load', function() {
  document.getElementById('aboutTitle').style.fontSize = `${Math.max(25, window.innerWidth / 25)}px`;
})


// Set the initial font size for the header text
window.addEventListener('load', function() {
  document.getElementById('aboutDescription').style.fontSize = `${Math.max(25, window.innerWidth / 20)}px`;
  // Resize the header text when the window is resized
  window.addEventListener('resize', () => {
    document.getElementById('aboutDescription').style.fontSize = `${Math.max(25, window.innerWidth / 20)}px`;
  });
})