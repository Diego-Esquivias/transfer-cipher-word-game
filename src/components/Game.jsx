import React, { useState } from "react";

function Game() {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [ciphertext, setCiphertext] = useState("");

  const encrypt = () => {
    if (!plaintext || !key) return;

    const keyOrder = key.split("").map(Number);
    const rows = [];
    const numColumns = keyOrder.length;

    // Fill grid row-wise
    for (let i = 0; i < plaintext.length; i += numColumns) {
      rows.push(plaintext.slice(i, i + numColumns).padEnd(numColumns, "-"));
    }

    // Rearrange grid by key order
    const encryptedColumns = keyOrder.map((col) =>
      rows.map((row) => row[col - 1]).join("")
    );

    setCiphertext(encryptedColumns.join(""));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Columnar Cipher Encryption</h1>
      <label>Plaintext: </label>
      <input
        type="text"
        value={plaintext}
        onChange={(e) => setPlaintext(e.target.value)}
      />
      <br />
      <label>Key (e.g., 213): </label>
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <br />
      <button onClick={encrypt}>Encrypt</button>
      <h2>Ciphertext: {ciphertext}</h2>
    </div>
  );
}

export default Game;
