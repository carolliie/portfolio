import "./dither.js";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./app.jsx";

const root = document.getElementById("root");
const page = JSON.parse(root.getAttribute("data-page"));
hydrateRoot(root, <App page={page} />);
