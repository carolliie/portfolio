import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./app.jsx";

export function render(page) {
  return renderToString(<App page={page} />);
}
export * as data from "./data.js";
