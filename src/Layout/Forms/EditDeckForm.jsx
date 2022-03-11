import React, { useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { updateDeck, listDecks } from "../../utils/api";

export default function EditDeckForm({ deck, setDeck, deckUrl, setDecks }) {
  const [name, setName] = useState(deck.name);
  const { params } = useRouteMatch();
  const handleNameChange = (event) => setName(event.target.value);
  const [description, setDescription] = useState(deck.description);
  const history = useHistory();
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const abortController = new AbortController();

  const [tempDeck, setTempDeck] = useState({
    name: name,
    description: description,
    id: params.deckId,
  });
  useEffect(() => {
    setDescription(() => deck.description);
    setName(() => deck.name);
  }, [deck]);
  useEffect(() => {
    setTempDeck({ name: name, description: description, id: params.deckId });
  }, [name, description]);
  function submitHandler(event) {
    event.preventDefault();
    console.log(tempDeck);
    updateDeck(tempDeck, abortController.signal)
      .then(setDeck({ ...deck, ...tempDeck }))
      .then(listDecks(abortController.signal).then(setDecks))
      .then(history.push(deckUrl))
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <form name="editDeck" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description </label>
        <textarea
          id="description"
          type="text"
          name="description"
          value={description}
          className="form-control"
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <Link className="btn btn-secondary mr-1" to={`${deckUrl}`}>
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}
