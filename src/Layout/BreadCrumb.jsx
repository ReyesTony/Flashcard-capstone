import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function BreadCrumb({ decks }) {
  const [deck, setDeck] = useState({});
  const { url, params } = useRouteMatch();
  const [error, setError] = useState(undefined);
  const subUrls = url.split(`/`);

  let deckId;
  for (let param in params) {
    if (param === "deckId") {
      deckId = params[param];
    }
  }

  if (error) {
    console.log(error);
  }
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    return () => abortController.abort();
  }, [decks, deckId]);
  const list = subUrls.map((aSubUrl, index) => {
    if (deck !== undefined) {
      let className;
      if (index >= subUrls.length - 1) {
        className = "breadcrumb-item active";
        if (aSubUrl === deckId && deckId !== "new") {
          return <li className={className}>{deck.name}</li>;
        }
        let value = "  ";
        switch (aSubUrl) {
          case "new":
            if (subUrls[index - 1] === "cards") {
              value = "Add Card";
            } else {
              value = "Create Deck";
            }

            break;
          case "study":
            value = "Study";
            break;
          case "edit":
            if (subUrls[index - 2] === "cards") {
              value = `Edit Card ${subUrls[index - 1]}`;
            } else {
              value = "Edit Deck";
            }

            break;
        }
        return <li className={className}>{value}</li>;
      } else {
        className = "breadcrumb-item";
      }
      if (aSubUrl !== "decks" && aSubUrl !== "") {
        if (aSubUrl === deckId) {
          return (
            <li className={className}>
              <Link to={`/decks/${aSubUrl}`}>{deck.name}</Link>
            </li>
          );
        }
      } else {
        if (aSubUrl === "") {
          return (
            <li className={className}>
              <Link to={`${aSubUrl}`} className="oi oi-home">
                Home
              </Link>
            </li>
          );
        }
      }
    } else {
      return null;
    }
  });
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">{list}</ol>
    </nav>
  );
}
