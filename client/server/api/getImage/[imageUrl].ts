// server/api/getImage.ts
import * as https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    const apiConfig = useRuntimeConfig();
    const imageUrl =
      "https://image.tmdb.org/t/p/original" + event.context.params?.imageUrl;

    const proxyUrl = `http://${apiConfig.proxyUrl}:${apiConfig.proxyPort}`;

    const agent = new HttpsProxyAgent(proxyUrl);

    const requestOptions = {
      method: "GET",
      agent,
    };
    const req = https.request(imageUrl, requestOptions, (res) => {
      console.log('"response" event!', res.headers);
      let data = Buffer.alloc(0);
      res.on("data", (chunk) => {
        data = Buffer.concat([data, chunk]);
      });
      res.on("end", () => {
        const imageDataBase64 = data.toString("base64");
        resolve(imageDataBase64);
      });
    });
    req.on("error", (error) => {
      reject(error);
      console.log("Error occurred:", error);
    });
    req.end();
  });
});
