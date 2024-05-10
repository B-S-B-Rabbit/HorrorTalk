import * as https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";
export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    // Proxy configuration
    const proxyHost = "35.185.196.38";
    const proxyPort = 3128;

    // Target website URL
    const targetUrl = "https://ident.me/ip";

    // Proxy URL
    const proxyUrl = `http://${proxyHost}:${proxyPort}`;

    // Create a new Proxy Agent
    const agent = new HttpsProxyAgent(proxyUrl);

    // Fetch the target website using the proxy agent
    const req = https.get(targetUrl, { agent }, (res) => {
      console.log('"response" event!', res.headers);
      let data = "";

      // Обработка данных при получении их от сервера
      res.on("data", (chunk) => {
        data += chunk;
      });

      // Обработка завершения ответа
      res.on("end", () => {
        resolve(data); // Разрешение промиса с данными
      });
    });

    // Обработка ошибок запроса
    req.on("error", (error) => {
      reject(error); // Отклонение промиса с ошибкой
      console.log("pizdec");
    });
  });
});
