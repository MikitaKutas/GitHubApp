import getRepos from './github.js';
const username = process.argv[2]; // Command line argument.

getRepos(username, (error, repos) => {
  if (error) console.error(error.message);

  repos.forEach((repo) => console.log(repo.name));
})