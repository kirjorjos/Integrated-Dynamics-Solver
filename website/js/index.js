// Get a reference to the buttons container element
const buttonsContainer = document.getElementById('mainButtons');

// Calculate the font size based on the number of buttons and the container width
function calculateFontSize() {
  return Math.max(
    20,
    Math.floor(buttonsContainer.offsetWidth/(
      (() => {
        let buttonNameList=[];
        [...buttonsContainer.children].forEach(button => buttonNameList.push(button.innerText))
        return buttonNameList.join('').length;
      })()
    )
  ));
}

// Set the font size for the buttons
function setButtonFontSize() {
  const fontSize = calculateFontSize();
  for (const button of buttonsContainer.children) {
    button.style.fontSize = `${fontSize}px`;
  }
}

// Create the buttons
function createButtons() {
  // Clear the buttons container
  buttonsContainer.innerHTML = '';
  document.getElementById("mainButtons").innerHTML = `<button class="button" style="font-size: 49px;">About</button><button class="button" style="font-size: 49px;">Simulate</button><button class="button" style="font-size: 49px;">Build</button>`
  
  // Loop through the buttons
  for (const button of document.getElementById("mainButtons").children) {

    // Set the button's class and text
    button.className = 'button';

    // Set the button's font size
    button.style.fontSize = `${calculateFontSize()}px`;

    //  Change which button is active
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      async function loadNewHTML() {
        // Send the request to the server and get the response
        const response = await fetch(`/${button.textContent.toLowerCase()}/${button.textContent.toLowerCase()}.html`);
        // Get the response text
        const html = await response.text();
        // Update the content of the page with the new HTML
        document.body.innerHTML = html;
        createButtons();
        // Update the URL in the browser's address bar
        window.history.pushState({}, '', `/${button.textContent.toLowerCase()}/${button.textContent.toLowerCase()}.html`);
      }
      loadNewHTML();
      //  setup the bottom of the page depending which button selected
      switch(button.textContent.toLowerCase()) {
        case "about":
          break;
        case "simulate":
          break;
        case "build":
          break;
      }
    });
  }
}


// Attach a resize event listener to the window object
window.addEventListener('resize', setButtonFontSize);

// Create the buttons when the page is loaded
window.addEventListener('load', createButtons);
window.addEventListener('load', setButtonFontSize);


// Resize the header text when the window is resized
window.addEventListener('resize', () => {
  document.getElementById('mainTitle').style.fontSize = `${Math.max(25, window.innerWidth / 25)}px`;
});

// Set the initial font size for the header text
document.getElementById('mainTitle').style.fontSize = `${Math.max(25, window.innerWidth / 25)}px`;