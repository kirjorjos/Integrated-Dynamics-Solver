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
function setupButtons() {
  
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
        document.getElementById("subPage").innerHTML = html;
        // Update the URL in the browser's address bar
        window.history.pushState({}, '', `/${button.textContent.toLowerCase()}`);
        //  Select the proper button on first page load
        const currentPage = window.location.pathname.substring(1);
        button.classList.add("active")
        for (const label of ["build", "simulate", "about"]) {
          let button = document.getElementById(`${label}Button`);
          if (label == currentPage) {
            button.classList.add("active");
          } else {
            button.classList.remove("active");
          }
        }
        changeScript(`/${currentPage}/${currentPage}.js`);
        changeCSS()
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
window.addEventListener('load', setupButtons);
window.addEventListener('load', setButtonFontSize);
window.addEventListener('load', () => {
  //  Select the proper button on first page load
  const currentPage = window.location.pathname.substring(1);
  document.getElementById(`${currentPage}Button`).classList.add("active");
})


// Resize the header text when the window is resized
window.addEventListener('resize', () => {
  document.getElementById('mainTitle').style.fontSize = `${Math.max(25, window.innerWidth / 25)}px`;
});

// Set the initial font size for the header text
document.getElementById('mainTitle').style.fontSize = `${Math.max(25, window.innerWidth / 25)}px`;

function changeScript(src) {
  const oldScript = document.getElementById('dynamicScript');
  oldScript.parentNode.removeChild(oldScript);

  const newScript = document.createElement('script');
  newScript.src = src;
  newScript.id = 'dynamicScript';
  document.head.appendChild(newScript);
}
function changeCSS() {
  // Get the current URL
  const currentURL = window.location.href;
  // Extract the part of the URL after the last "/"
  const part = currentURL.substring(currentURL.lastIndexOf("/") + 1);
  // Create a new link element with the appropriate href
  const newLink = document.createElement("link");
  newLink.href = `/css/${part}.css`;
  newLink.rel = "stylesheet";
  newLink.type = "text/css"
  // Remove the old link element if it exists
  const oldLink = document.getElementById("dynamicCSS");
  if (oldLink) {
    oldLink.parentNode.removeChild(oldLink);
  }
  // Add the new link element with the ID "dynamicCSS"
  newLink.id = "dynamicCSS";
  document.head.appendChild(newLink);
}



// Create a function that updates the page content
function updatePageContent() {
  // Get the current URL
  const currentURL = window.location.href;

  // Split the URL into parts
  const urlParts = currentURL.split('/');

  // Get the last part of the URL, which should be the name of the button
  const buttonName = urlParts[urlParts.length - 1];

  // Send a request to the server to get the HTML for the button
  fetch(`/${buttonName}/${buttonName}.html`)
    .then((response) => response.text())
    .then((html) => {
      // Update the content of the page with the new HTML
      document.getElementById("subPage").innerHTML = html;
      changeScript(`/${buttonName}/${buttonName}.js`)
      changeCSS();
    });
}

// Add an event listener for the popstate event
window.addEventListener('popstate', updatePageContent);
window.addEventListener('load', updatePageContent);