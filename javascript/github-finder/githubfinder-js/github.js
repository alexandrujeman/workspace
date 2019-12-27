// Creat Github class
class Github {
  constructor() {
    // Init Oauth git hub variables
    this.client_id = "b1331574c556dbb798d4";
    this.client_secret = "e14aa76f05867902eaabb93d6f34359cd18881d4";
  }

  // Getting users and user/repos asynchronously
  async getUser(user) {
    // Fetch JSON data
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    return {
      profile: profile,
      repos: repos
    };
  }
}
