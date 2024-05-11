// server/api/getImage.ts
import * as https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    // Proxy configuration
    const proxyHost = "35.185.196.38";
    const proxyPort = 3128;
    console.log(event.context.params?.imageUrl);
    // Target image URL
    const imageUrl =
      "https://image.tmdb.org/t/p/original" + event.context.params?.imageUrl;

    // Proxy URL
    const proxyUrl = `http://${proxyHost}:${proxyPort}`;

    // Create a new Proxy Agent
    const agent = new HttpsProxyAgent(proxyUrl);

    // Image request options
    const requestOptions = {
      method: "GET",
      agent, // Pass the proxy agent to the request options
    };

    // Make the image request
    const req = https.request(imageUrl, requestOptions, (res) => {
      console.log('"response" event!', res.headers);
      let data = Buffer.alloc(0);

      // Data handling when receiving from the server
      res.on("data", (chunk) => {
        data = Buffer.concat([data, chunk]);
      });

      // Handling response completion
      res.on("end", () => {
        // Convert image data to Base64
        const imageDataBase64 = data.toString("base64");
        resolve(imageDataBase64); // Resolve the promise with the image data as Base64 string
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
