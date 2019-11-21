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
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  // Make an HTTP post request
  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  
  // PUT request (update)
  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  // Delete request
  delete(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(data => resolve('Resource deleted'))
        .catch(err => reject(err));
    });
  }
}

function GetExternal() {
  const http = new FetchAsync();
  http
    .get("https://jsonplaceholder.typicode.com/users")
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
