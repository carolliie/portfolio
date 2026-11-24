import React from "react";
import { STACK_ICONS } from "./data.js";

/* Chips de tecnologia: ícone decorativo (SVG local) + nome em texto acessível,
   para que a informação não dependa apenas da imagem. */
export function TechChips({ items }) {
  return (
    <ul className="stack__chips" aria-label="Tecnologias">
      {items.map((s) => (
        <li className="chip techchip" key={s} title={s}>
          {STACK_ICONS[s] && (
            <img
              src={`/assets/icons/${STACK_ICONS[s]}.svg`}
              alt=""
              width="22"
              height="22"
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="sr-only">{s}</span>
        </li>
      ))}
    </ul>
  );
}
