import * as https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";
export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    const apiConfig = useRuntimeConfig();
    const query = getQuery(event);
    console.log(query);
    const targetUrl = `${apiConfig.tmdbUrl}/${apiConfig.tmdbApiVer}/discover/movie?include_adult=true&with_genres=27&sort_by=${query.sortOption}.${query.sortDir}&page=${query.page}&vote_count.gte=100`;
    const proxyUrl = `http://${apiConfig.proxyUrl}:${apiConfig.proxyPort}`;
    const agent = new HttpsProxyAgent(proxyUrl);
    const requestOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiConfig.tmdbApiKey,
      },
      agent,
    };
    const req = https.request(targetUrl, requestOptions, (res) => {
      console.log('"response" event!', res.headers);
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    });
    req.on("error", (error) => {
      reject(error);
      console.log("Error occurred:", error);
    });
    req.end();
  });
});
