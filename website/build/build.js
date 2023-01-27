// import * as functions from '../js/functions.js';
(function() {
  // const { ...functions } = Object.fromEntries(Object.entries(functions));
  // console.log(JSONtoNBT);
  let fileContent;
  let urlNBT;
  function getFileContentFromURL() {
    // Get the current URL
    const currentURL = window.location.href;

    // Check if the URL has a query string
    if (currentURL.indexOf("?") === -1) {
      console.log("No file content found in the URL.");
      return;
    }

    // Get the query string
    const queryString = currentURL.split("?")[1];

    // Split the query string into key-value pairs
    const queryParams = new URLSearchParams(queryString);

    // Get the file content from the query string
    const tempFileContent = queryParams.get("fileContent");
    urlNBT = queryParams.get("nbtChecked");
    if (tempFileContent) {
      try {
        JSON.parse(tempFileContent);
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
    fileContent = JSON.parse(fileContent);
  }
  if (fileContent) {
    document.getElementById("upload-button").disabled = false;
  } else {
    document.getElementById("upload-button").disabled = true;
    document.getElementById("paste-button").disabled = true;
  }
  getFileContentFromURL();
  


  //  Update the boolean if the int nbt checkbox is checked or not
  let nbtChecked = urlNBT || false;
  let checkbox = document.getElementById('has-nbt');
  checkbox.addEventListener('change', (event) => {
    nbtChecked = event.target.checked;
    let currentUrl = new URL(window.location.href);
    let searchParams = new URLSearchParams(currentUrl.search);
    searchParams.set('nbtChecked', nbtChecked);
    currentUrl.search = searchParams.toString();
    history.pushState({}, '', currentUrl.href);
  });
  //  Listen for the file being uploaded
  let file;
  let fileInput = document.getElementById('file-upload');
  fileInput.addEventListener('change', (event) => {
    file = event.target.files[0];
    if (file.name.split('.').pop() !== "json") {
      document.getElementById("upload-button").disabled = true;
    } else {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.addEventListener('load', () => {
        let text = reader.result
        let content = encodeURIComponent(text);
        let currentUrl = new URL(window.location.href);
        let searchParams = new URLSearchParams(currentUrl.search);
        searchParams.set('fileContent', content);
        currentUrl.search = searchParams.toString();
        history.pushState({}, '', currentUrl.href);
        try {
          fileContent = JSON.parse(text);
          document.getElementById("upload-button").disabled = false;
        } catch(e) {
          document.getElementById("upload-button").disabled = true;
        }
      })
    }
  })
  let hasNbt = document.getElementById("has-nbt");
  let hasNbtWidth = hasNbt.offsetWidth;
  document.getElementById('checkbox-container').style.width = `calc(max(50% - 20px, ${hasNbtWidth}px))`;
  document.querySelector('.switch input[type="checkbox"]').addEventListener('change', function() {
    if (this.checked) {
      document.getElementById('paste-text').style.display = 'block';
      document.getElementById('upload-text').style.display = 'none';
      document.getElementById('paste-nbt-container').style.display = 'block';
      document.getElementById('file-upload-container').style.display = 'none';
    } else {
      document.getElementById('paste-text').style.display = 'none';
      document.getElementById('upload-text').style.display = 'block';
      document.getElementById('paste-nbt-container').style.display = 'none';
      document.getElementById('file-upload-container').style.display = 'block';
    }
  });
  if (fileContent) {
    document.getElementById("upload-toggle").style.display = 'none';
    document.getElementById("upload-text").style.display = 'none';
    document.getElementById("paste-text").style.display = 'none';
    document.getElementById("file-upload-container").style.display = 'none';
    document.getElementById("paste-nbt-container").style.display = 'none';
  }


  let pasteInput = document.getElementById('paste-nbt');

  // Get the upload text and paste text elements
  const uploadText = document.getElementById('upload-text');
  const pasteText = document.getElementById('paste-text');

  // Generate a random number either 1 or 2
  const randomNum = Math.floor(Math.random() * 2);
  document.getElementById("upload-toggle").checked = randomNum;
  document.getElementById("upload-toggle").dispatchEvent(new Event('change'));

  //  Paste NBT listener
  let match;
  pasteInput.addEventListener("input", function() {
    // The value of the paste input has changed
    const pasteValue = this.value;
    match = pasteValue.match(/^([A-Za-z0-9_]+\{[\s\S]*\})+$/);
    console.log(match);
    if (!match) return; else match = match[0];
    // console.log(match);
    document.getElementById("paste-button").disabled = false;
  });
    

  //  Step generation logic
  //  wait for contuine
  //  fileContent and nbtChecked store the realvent values
  document.getElementById("upload-button").addEventListener("click", function() {
    console.log(fileContent);
    console.log(nbtChecked);
  })
})()