import React, { useEffect, useState } from "react";
import DeckView from "./DeckView";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import BreadCrumb from "../BreadCrumb";
import { readDeck } from "../../utils/api";
import CardList from "../Card/CardList";
import StudyDeck from "./StudyDeck";
import EditDeck from "./EditDeck";
import CreateCard from "../Card/CreateCard";
import EditCard from "../Card/EditCard";

export default function ViewDeck({ decks, setDecks }) {
  const [deck, setDeck] = useState({});
  const { path, url, params } = useRouteMatch();
  const [error, setError] = useState(undefined);
  if (error) {
    console.log(error);
  }

  let deckId;
  for (let param in params) {
    if (param === "deckId") {
      deckId = params[param];
    }
  }
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  return (
    <div>
      <Switch>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard
            decks={decks}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            setDecks={setDecks}
          />
        </Route>
        <Route path={`${path}/cards/new`}>
          <CreateCard
            decks={decks}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            setDecks={setDecks}
          />
        </Route>
        <Route path={`${path}/edit`}>
          <EditDeck
            decks={decks}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            setDecks={setDecks}
          />
        </Route>
        <Route path={`${path}/study`}>
          <StudyDeck decks={decks} deck={deck} />
        </Route>
        <Route exact path={`${path}`}>
          <BreadCrumb decks={decks} />
          <DeckView deck={deck} url={url} decks={decks} setDecks={setDecks} />
          <CardList
            deck={deck}
            deckId={deckId}
            setDeck={setDeck}
            decks={decks}
            setDecks={setDecks}
          />
        </Route>
      </Switch>
    </div>
  );
}
