import https from "https";
import { printSchema } from "graphql";

export default {
  serverWillStart({ schema }) {
    let body = JSON.stringify({
      schema: printSchema(schema)
    });

    let options = {
      hostname: "da75c4cc9006.ngrok.io",
      path: "/api/schemas",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    };

    https
      .request(options, (res) => {
        let data = "";
        res.on("data", (d) => {
          data += d;
        });
        res.on("end", () => {
          console.log(data);
        });
      })
      .on("error", console.error)
      .end(body);
  },
  requestDidStart({ request }) {
    if (request.operationName !== "IntrospectionQuery") {
      let body = JSON.stringify({
        query: request.query
      });

      let options = {
        hostname: "da75c4cc9006.ngrok.io",
        path: "/api/transactions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body)
        }
      };

      https
        .request(options, (res) => {
          let data = "";
          res.on("data", (d) => {
            data += d;
          });
          res.on("end", () => {
            console.log(data);
          });
        })
        .on("error", console.error)
        .end(body);
    }
  }
};
