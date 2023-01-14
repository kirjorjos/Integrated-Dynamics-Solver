(function() {
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
  const fileContent = queryParams.get("fileContent");

  if(fileContent) {
    console.log("File Content Found:");
    console.log(JSON.parse(fileContent));
  } else {
    console.log("No file content found in the query string.")
  }
}

// Call the function when the page loads
window.addEventListener("load", getFileContentFromURL);
window.addEventListener('load', function(){
    let hasNbt = document.getElementById("has-nbt");
    let hasNbtWidth = hasNbt.offsetWidth;
    document.getElementById('checkbox-container').style.width = `calc(max(50% - 20px, ${hasNbtWidth}px))`;

    let fileUpload = document.getElementById("file-upload");
    let fileUploadWidth = fileUpload.offsetWidth;
    document.getElementById('upload-container').style.width = `calc(max(50% - 20px, ${fileUploadWidth}px))`;
});


//  Update the boolean if the int nbt checkbox is checked or not
let nbtChecked = false;
let checkbox = document.getElementById('has-nbt');
checkbox.addEventListener('change', (event) => {
  nbtChecked = event.target.checked;
});

//  Listen for the file being uploaded
let file;
let fileInput = document.getElementById('file-upload');
fileInput.addEventListener('change', (event) => {
  file = event.target.files[0];
  if (file.name.split('.').pop() == "json") {
    //add element to display error
  }
});
let hasNbt = document.getElementById("has-nbt");
let hasNbtWidth = hasNbt.offsetWidth;
document.getElementById('checkbox-container').style.width = `calc(max(50% - 20px, ${hasNbtWidth}px))`;
})()