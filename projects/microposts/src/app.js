import { http } from "./http";
import "core-js/stable";
import "regenerator-runtime/runtime";

// Het post on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

function getPosts() {
  http.get("http://localhost:3000/posts")
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
