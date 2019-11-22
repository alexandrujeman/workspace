// API Call to randomuser
async function getUser() {
  const rawData = await fetch("https://randomuser.me/api/");
  const result = await rawData.json();
  return result.results[0];
}

// Get as many users as you want
function getUsers(userNumber) {
  let data = [];
  for (let i = 0; i < userNumber; i++) {
    getUser()
      .then(user => {
        let userCurrent = {};
        userCurrent.name = `${user.name.first} ${user.name.last}`;
        userCurrent.age = user.dob.age;
        userCurrent.sex = user.gender;
        userCurrent.email = user.email;
        userCurrent.location = `${user.location.city}, ${user.location.state}`;
        userCurrent.image = user.picture.large;
        user.gender === "female"
          ? (userCurrent.lookingfor = "male")
          : (userCurrent.lookingfor = "female");
        data.push(userCurrent);
      })
      .catch(err => console.log(err));
  }
  return data;
}
// Call function getUsers(5) with number of users needed as argument
let userDB = getUsers(5);
let profiles = profileIterator(userDB);

// Next event
document.getElementById("next").addEventListener("click", nextProfile);

// Next profile display
function nextProfile() {
  const currentProfile = profiles.next().value;
  if (currentProfile !== undefined) {
    document.getElementById("profileDisplay").innerHTML = `
  <ul class="list-group">
    <li class="list-group-item">Name: ${currentProfile.name}</li>
    <li class="list-group-item">Email: ${currentProfile.email}</li>
    <li class="list-group-item">Age: ${currentProfile.age}</li>
    <li class="list-group-item">Location: ${currentProfile.location}</li>
    <li class="list-group-item">Preference: ${currentProfile.sex} fooking for ${currentProfile.lookingfor}</li>
  </ul>
  `;

    document.getElementById(
      "imageDisplay"
    ).innerHTML = `<img src="${currentProfile.image}">`;
  } else {
    // No more profiles
    window.location.reload();
  }
}

// Profile iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++] }
        : { done: true };
    }
  };
}
