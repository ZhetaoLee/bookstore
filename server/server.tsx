import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App.tsx";

const app = express();

app.use("^/$", (req, res) => {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("error");
        }
        const ssr = ReactDOMServer.renderToString(<App />);
        return res.send(
            data.replace(
              "<div id=\"root\"></div>",
              `<div id="root">${ssr}</div>`
            )
        );
    });
});

app.use(express.static(path.resolve(__dirname, "../build")));

app.listen(3005, () => {
    console.log("App launched on 3005");
})