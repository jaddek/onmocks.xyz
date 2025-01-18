import {popper} from "@popperjs/core";
import hljs from 'highlight.js';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

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
    const button = event.target;
    const method = button.getAttribute('data-method');
    const url = button.getAttribute('data-url');
    const curlCommand = `curl -X ${method} "https://onmocks.xyz${url}"`;

    navigator.clipboard.writeText(curlCommand).then(() => {
        showToast(`cURL command copied: ${curlCommand}`);
    }).catch(err => {
        console.error("Failed to copy cURL command: ", err);
    });
}

function handleCopyPHPRequest(event) {
    const button = event.target;
    const method = button.getAttribute('data-method');
    const url = button.getAttribute('data-url');
    const curlCommand = `curl -X ${method} "https://onmocks.xyz${url}"`;

    navigator.clipboard.writeText(curlCommand).then(() => {
        showToast(`cURL command copied: ${curlCommand}`);
    }).catch(err => {
        console.error("Failed to copy cURL command: ", err);
    });
}

function handleCopyPythonRequest(event) {
    const button = event.target;
    const method = button.getAttribute('data-method');
    const url = button.getAttribute('data-url');
    const curlCommand = `curl -X ${method} "https://onmocks.xyz${url}"`;

    navigator.clipboard.writeText(curlCommand).then(() => {
        showToast(`cURL command copied: ${curlCommand}`);
    }).catch(err => {
        console.error("Failed to copy cURL command: ", err);
    });
}

function handleCopyTSRequest(event) {
    const button = event.target;
    const method = button.getAttribute('data-method');
    const url = button.getAttribute('data-url');
    const curlCommand = `curl -X ${method} "https://onmocks.xyz${url}"`;

    navigator.clipboard.writeText(curlCommand).then(() => {
        showToast(`cURL command copied: ${curlCommand}`);
    }).catch(err => {
        console.error("Failed to copy cURL command: ", err);
    });
}

function handleCopyNetRequest(event) {
    const button = event.target;
    const method = button.getAttribute('data-method');
    const url = button.getAttribute('data-url');
    const curlCommand = `curl -X ${method} "https://onmocks.xyz${url}"`;

    navigator.clipboard.writeText(curlCommand).then(() => {
        showToast(`cURL command copied: ${curlCommand}`);
    }).catch(err => {
        console.error("Failed to copy cURL command: ", err);
    });
}

function handleCopyGoRequest(event) {
    const button = event.target;
    const method = button.getAttribute('data-method');
    const url = button.getAttribute('data-url');
    const curlCommand = `curl -X ${method} "https://onmocks.xyz${url}"`;

    navigator.clipboard.writeText(curlCommand).then(() => {
        showToast(`cURL command copied: ${curlCommand}`);
    }).catch(err => {
        console.error("Failed to copy cURL command: ", err);
    });
}

function showToast(message) {
    const toastElement = document.getElementById('toast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

document.querySelectorAll('.copyCurlRequest').forEach(button => {
    button.addEventListener('click', handleCopyCurlRequest);
});
