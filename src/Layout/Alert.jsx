import React from "react";

export default function Alert({ test }) {
  return (
    <div className="container my-4">
      <div className="alert alert-success" role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>Success! {test}</strong> Card added successfully
      </div>
    </div>
  );
}
