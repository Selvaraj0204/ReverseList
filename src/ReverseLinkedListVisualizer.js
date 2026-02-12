import React, { useState } from "react";

export default function ReverseLinkedListVisualizer() {
  const initialList = [1, 2, 3, 4, 5];

  const [original, setOriginal] = useState(initialList);
  const [reversed, setReversed] = useState([]);
  const [currentValue, setCurrentValue] = useState(initialList[0]);
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState(initialList[1]);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index >= original.length) return;

    const newCurrent = original[index];
    const newNext = index + 1 < original.length ? original[index + 1] : null;

    setReversed([newCurrent, ...reversed]);
    setPrevValue(newCurrent);
    setCurrentValue(newNext);
    setNextValue(index + 2 < original.length ? original[index + 2] : null);
    setIndex(index + 1);
  };

  const handleReset = () => {
    setOriginal(initialList);
    setReversed([]);
    setCurrentValue(initialList[0]);
    setPrevValue(null);
    setNextValue(initialList[1]);
    setIndex(0);
  };

  const renderChain = (list, highlightValue = null) => (
    <div style={styles.chain}>
      {list.map((val, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              ...styles.node,
              backgroundColor: val === highlightValue ? "#4f46e5" : "#e5e7eb",
              color: val === highlightValue ? "white" : "black",
            }}
          >
            {val}
          </div>
          <div style={styles.arrow}>→</div>
        </React.Fragment>
      ))}
      <div style={styles.nullBox}>NULL</div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Singly Linked List Reversal Visualization</h1>

      <div style={styles.card}>
        <h2>Original List</h2>
        {renderChain(original.slice(index), currentValue)}

        <h2 style={{ marginTop: 30 }}>Reversed List</h2>
        {renderChain(reversed)}

        <div style={styles.variables}>
          <div><strong>Prev:</strong> {prevValue !== null ? prevValue : "NULL"}</div>
          <div><strong>Current:</strong> {currentValue !== null ? currentValue : "NULL"}</div>
          <div><strong>Next:</strong> {nextValue !== null ? nextValue : "NULL"}</div>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.primaryButton} onClick={handleNext}>Next Step</button>
          <button style={styles.secondaryButton} onClick={handleReset}>Reset</button>
        </div>

        <div style={styles.codeBox}>
{`while (current != null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
}`}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#c7d2fe,#e9d5ff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  card: {
    width: "100%",
    maxWidth: "1100px",
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
  },
  chain: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "15px",
  },
  node: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  arrow: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  nullBox: {
    padding: "10px 15px",
    background: "#111827",
    color: "white",
    borderRadius: "8px",
    fontSize: "14px",
  },
  variables: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "30px",
    fontSize: "18px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "25px",
  },
  primaryButton: {
    padding: "12px 28px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
  secondaryButton: {
    padding: "12px 28px",
    borderRadius: "10px",
    border: "1px solid #4f46e5",
    background: "white",
    color: "#4f46e5",
    cursor: "pointer",
    fontSize: "16px",
  },
  codeBox: {
    background: "#111827",
    color: "#10b981",
    padding: "20px",
    borderRadius: "10px",
    fontFamily: "monospace",
    whiteSpace: "pre-line",
    marginTop: "30px",
  },
};