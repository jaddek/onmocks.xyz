
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import hljs from 'highlight.js';
import bootstrap from 'bootstrap/dist/js/bootstrap'

import './scss/main.scss'

const jsonData = {
        "employees": [
            {
                "id": 101,
                "name": "Alice",
                "position": "Software Engineer",
                "description": "Over 3 years experience handling C# .NET"
            },
            {
                "id": 102,
                "name": "Bob",
                "position": "Product Manager",
                "description": "Has launched 3 successful projects"
            },
        ]
    }
;
const formattedJson = JSON.stringify(jsonData, null, 2);

const highlightedJson = hljs.highlight(formattedJson, {language: 'json'}).value;

document.getElementById('json-container').innerHTML = `<pre><code class="json">${highlightedJson}</code></pre>`;



function handleCopyCurlRequest(event) {
    const button = event.target; // Get the clicked button
    const method = button.getAttribute('data-method'); // Get the HTTP method
    const url = button.getAttribute('data-url'); // Get the URL
    const curlCommand = `curl -X ${method} "https://onmocks.xyz${url}"`; // Build the cURL command

    // Copy the cURL command to clipboard
    navigator.clipboard.writeText(curlCommand).then(() => {
        showToast(`cURL command copied: ${curlCommand}`);
    }).catch(err => {
        console.error("Failed to copy cURL command: ", err);
    });
}

function showToast(message) {
    const toastElement = document.getElementById('toast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message; // Update the message in the toast

    const toast = new bootstrap.Toast(toastElement);
    toast.show();  // Show the toast
}

document.querySelectorAll('.copy-curl-request').forEach(button => {
    button.addEventListener('click', handleCopyCurlRequest);
});