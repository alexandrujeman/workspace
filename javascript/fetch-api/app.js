document.getElementById("button1").addEventListener("click", getText);
document.getElementById("button2").addEventListener("click", getJson);
document.getElementById("button3").addEventListener("click", GetExternal);

// Get local text data
function getText() {
  fetch("text.txt")
    .then(res => {
      return res.text();
    })
    .then(data => {
      document.getElementById("output").innerHTML = data;
    })
    .catch(err => {
      console.error(err);
    });
}

// Get local JSON data
function getJson() {
  fetch("posts.json")
    .then(res => {
      return res.json();
    })
    .then(data => {
      document.getElementById("output").innerHTML = null;
      data.forEach(post => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${post.title}: `));
        li.appendChild(document.createTextNode(post.body));
        document.getElementById("output").appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
    });
}

// Get external JSON API data
class FetchAsync {
  // Make a HTTP get Request
  async get(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }

  // Make an HTTP post request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    return responseData;
  }

  // Make an HTTP post request
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    return responseData;
  }

  // Delete request
  async delete(url) {
    const response = await fetch(url, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    });

    const responseData = await "Resource deleted";
    return responseData;
  }
}

function GetExternal() {
  const http = new FetchAsync();
  http
    .get(`https://api.github.com/search/users?q=${'alex'}&client_id=${'b1331574c556dbb798d4'}&client_secret=${'e14aa76f05867902eaabb93d6f34359cd18881d4'}`)
    .then(data => {
      console.log(data);
      let output = "";
      data.forEach(user => {
        output += `<li>${user.username}</li>`;
      });
      document.getElementById("output").innerHTML = output;
    })
    .catch(err => console.log(err));
}
