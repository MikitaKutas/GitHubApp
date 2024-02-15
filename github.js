import { error } from 'console';
import https from 'https';

export default function getRepos(username, done) {
  if (!username) return done(new Error("Username is required")); // Checks if username was passed to the function.

  const option = { // Options for request.
    hostname: "api.github.com",
    path: `/users/${username}/repos`,
    headers: {
      "User-Agent": "github-app",
    }
  }

  const req = https.get(option, (res) => {
    res.setEncoding("utf-8");
    let body = "";

    if (res.statusCode === 200) {
      res.on("data", (data) => (body += data));
      
      res.on("end", () => {
        try {
          const result = JSON.parse(body);
          done(null, result);
        } catch (error) {
          done(new Error("Failed to process data")); // Catches the conversion errors.
        }
      });
    } else { // Catches the response (server) errors.
      done(
        new Error(
          `Server error ${res.statusCode} ${res.statusMessage}`,
        ),
      );
    }
  });

  req.on("error", (error) => done(new Error("Failed to request"))); // Catches the request errors.
}