import React, { useEffect, useState } from "react";

export function Options() {
  const [baseUrl, setBaseUrl] = useState("http://localhost:3000");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get("baseUrl", (result) => {
      if (result.baseUrl) {
        setBaseUrl(result.baseUrl);
      }
    });
  }, []);

  const handleSave = async () => {
    await chrome.storage.sync.set({ baseUrl });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cuttoso Settings</h1>

      <div style={styles.field}>
        <label style={styles.label}>API Base URL</label>
        <input
          type="url"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          style={styles.input}
          placeholder="http://localhost:3000"
        />
        <p style={styles.hint}>
          Use http://localhost:3000 for development, or your production URL.
        </p>
      </div>

      <button onClick={handleSave} style={styles.button}>
        Save Settings
      </button>

      {saved && <p style={styles.saved}>Settings saved!</p>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4f46e5",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    outline: "none",
  },
  hint: {
    fontSize: "12px",
    color: "#6b7280",
  },
  button: {
    padding: "10px 20px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  saved: {
    color: "#059669",
    fontSize: "14px",
  },
};
