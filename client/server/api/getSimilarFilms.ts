import * as https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";
export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    // Proxy configuration
    const proxyHost = "35.185.196.38";
    const proxyPort = 3128;
    const query = getQuery(event);
    // Target website URL
    const targetUrl = `https://api.themoviedb.org/3/movie/${query.movieId}/similar`;
    // Proxy URL
    const proxyUrl = `http://${proxyHost}:${proxyPort}`;
    // Create a new Proxy Agent
    const agent = new HttpsProxyAgent(proxyUrl);

    // API request options
    const requestOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer ",
      },
      agent, // Pass the proxy agent to the request options
    };

    // Make the API request
    const req = https.request(targetUrl, requestOptions, (res) => {
      console.log('"response" event!', res.headers);
      let data = "";

      // Data handling when receiving from the server
      res.on("data", (chunk) => {
        data += chunk;
      });

      // Handling response completion
      res.on("end", () => {
        resolve(data); // Resolve the promise with the data
      });
    });

    // Handling request errors
    req.on("error", (error) => {
      reject(error); // Reject the promise with the error
      console.log("Error occurred:", error);
    });

    // End the request
    req.end();
  });
});
