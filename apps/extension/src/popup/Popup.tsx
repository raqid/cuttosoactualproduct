import React, { useEffect, useState } from "react";

interface LastResult {
  asin: string;
  title: string;
  matched: boolean;
  offerId: string | null;
  timestamp: number;
}

interface Settings {
  enabled: boolean;
  baseUrl: string;
}

export function Popup() {
  const [lastResult, setLastResult] = useState<LastResult | null>(null);
  const [settings, setSettings] = useState<Settings>({ enabled: true, baseUrl: "http://localhost:3000" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load last result and settings
    Promise.all([
      chrome.storage.local.get("lastResult"),
      chrome.storage.sync.get(["enabled", "baseUrl"]),
    ]).then(([localData, syncData]) => {
      if (localData.lastResult) {
        setLastResult(localData.lastResult);
      }
      setSettings({
        enabled: syncData.enabled ?? true,
        baseUrl: syncData.baseUrl ?? "http://localhost:3000",
      });
      setLoading(false);
    });
  }, []);

  const toggleEnabled = async () => {
    const newEnabled = !settings.enabled;
    await chrome.storage.sync.set({ enabled: newEnabled });
    setSettings((prev) => ({ ...prev, enabled: newEnabled }));
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Cuttoso</h1>
        <button onClick={toggleEnabled} style={styles.toggle}>
          {settings.enabled ? "ON" : "OFF"}
        </button>
      </div>

      {lastResult && (
        <div style={styles.result}>
          <p style={styles.label}>Last detected:</p>
          <p style={styles.asin}>ASIN: {lastResult.asin}</p>
          <p style={styles.title}>{lastResult.title.slice(0, 60)}...</p>
          <div style={lastResult.matched ? styles.matched : styles.notMatched}>
            {lastResult.matched ? "Direct offer found!" : "No match yet"}
          </div>
          {lastResult.matched && lastResult.offerId && (
            <a
              href={`${settings.baseUrl}/o/${lastResult.offerId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              View Offer →
            </a>
          )}
        </div>
      )}

      {!lastResult && (
        <p style={styles.empty}>
          Visit an Amazon product page to see direct offers.
        </p>
      )}

      <a href="#" onClick={() => chrome.runtime.openOptionsPage()} style={styles.options}>
        Settings
      </a>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4f46e5",
  },
  toggle: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  result: {
    background: "white",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  label: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "4px",
  },
  asin: {
    fontSize: "12px",
    color: "#374151",
    fontFamily: "monospace",
  },
  matched: {
    marginTop: "8px",
    padding: "6px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "4px",
    fontSize: "12px",
    textAlign: "center",
  },
  notMatched: {
    marginTop: "8px",
    padding: "6px",
    background: "#fef3c7",
    color: "#92400e",
    borderRadius: "4px",
    fontSize: "12px",
    textAlign: "center",
  },
  link: {
    display: "block",
    marginTop: "8px",
    color: "#4f46e5",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },
  empty: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    padding: "20px 0",
  },
  options: {
    color: "#6b7280",
    fontSize: "12px",
    textAlign: "center",
    textDecoration: "none",
  },
};
