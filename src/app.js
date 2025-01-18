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

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Command copied:<br/><hr><pre>' + text + '</pre>');
    }).catch(err => {
        console.error("Failed to copy command: ", err);
    });
}

function handleCopyCurlRequest(method, url) {
    return `curl -X ${method} "https://onmocks.xyz${url}"`;
}

function handleCopyJsRequest(method, url) {
    return `
const url = 'https://onmocks.xyz${url}';
data = {};
fetch(url, {
  method: '${method}', 
  headers: {
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify(data) 
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(\`Request failed\`);
    }
  })
  .then(data => {
    console.log('Response body:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
`;
}

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function handleCopyPHPRequest(method, url) {
    return `<?php
$url = 'https://onmocks.xyz/rest/api/countries';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://onmocks.xyz${url}');         
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');
$response = curl_exec($ch);
if(curl_errno($ch)) { echo 'cURL Error: ' . curl_error($ch);} else { echo $response;}
curl_close($ch);
`;
}

function handleCopyPythonRequest(method, url) {
    return `
import requests

url = "https://onmocks.xyz"
response = requests.${method}(${url})

if response.status_code == 200:
    print("Response body:")
    print(response.text)
else:
    print(f"Request failed with status: {response.status_code}")
`;
}

function handleCopyRustRequest(method, url) {
    return `
use error_chain::error_chain;

error_chain! {
    foreign_links {
        Io(std::io::Error);
        HttpRequest(reqwest::Error);
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let res = reqwest::${method}("${url}").await?;
    println!("Status: {}", res.status());
    println!("Headers:\\n{:#?}", res.headers());

    let body = res.text().await?;
    println!("Body:\\n{}", body);
    Ok(())
}
`
}

function handleCopyGoRequest(method, url) {
    return `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	url := "https://onmocks.xyz/${url}"

	data := map[string]string{
		"key": "value",
		"anotherKey": "anotherValue",
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Fatalf("Error marshaling JSON: %v", err)
	}

	req, err := http.NewRequest("${method}", url, bytes.NewBuffer(jsonData))
	if err != nil {
		log.Fatalf("Error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Error sending request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		var responseBody map[string]interface{}
		decoder := json.NewDecoder(resp.Body)
		if err := decoder.Decode(&responseBody); err != nil {
			log.Fatalf("Error decoding response body: %v", err)
		}
		fmt.Println("Response body:", responseBody)
	} else {
		fmt.Printf("Request failed with status: %s\n", resp.Status)
	}
}
`;
}

function showToast(message) {
    const toastElement = document.getElementById('toast');
    if (!toastElement) {
        console.error('Toast element not found!');
        return;
    }

    const toastBody = toastElement.querySelector('.toast-body');
    if (!toastBody) {
        console.error('Toast body element not found!');
        return;
    }

    toastBody.innerHTML = message;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

function handleCopyRequest(event) {
    const button = event.target;
    const method = button.getAttribute('data-method').toLowerCase();
    const url = button.getAttribute('data-url');
    const runtime = button.getAttribute('data-runtime')

    let text = undefined;
    switch (runtime) {
        case 'php':
            text = handleCopyPHPRequest(method, url);
            break;
        case 'curl':
            text = handleCopyCurlRequest(method, url);
            break;
        case 'rust':
            text = handleCopyRustRequest(method, url);
            break
        case 'go':
            text = handleCopyGoRequest(method, url);
            break
        case 'js':
            text = handleCopyJsRequest(method, url);
            break
        case 'python':
            text = handleCopyPythonRequest(method, url);
            break
    }

    if (text) {
        copyToClipboard(encodeHTML(text))
    }
}

function getLastLoginMessage() {
    const now = new Date();

    // Array for weekday names (similar to "Sat" in the message)
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Format date and time
    const day = weekdays[now.getDay()]; // Get the current weekday
    const month = now.toLocaleString('default', {month: 'short'}); // Short month name
    const date = now.getDate(); // Day of the month
    const hours = String(now.getHours()).padStart(2, '0'); // Hour in 24-hour format
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Seconds

    // Build the login message
    return `Last login: ${day} ${month} ${date} ${hours}:${minutes}:${seconds} on ttys001`;
}

document.querySelectorAll('.handleCopyRequest').forEach(button => {
    button.addEventListener('click', handleCopyRequest);
});

document.getElementById('last-login').textContent = getLastLoginMessage();