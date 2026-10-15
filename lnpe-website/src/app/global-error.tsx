"use client";

// Preserve the runtime error presentation used by Next.js 16.1.6.
const styles = {
  error: {
    fontFamily:
      'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "28px",
    margin: "0 8px",
  },
} as const;

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const digest = error?.digest;
  const hostname = typeof window === "undefined" ? "" : window.location.hostname;

  return (
    <html id="__next_error__">
      <head />
      <body>
        <div style={styles.error}>
          <div>
            <h2 style={styles.text}>
              Application error: a {digest ? "server" : "client"}-side exception
              has occurred while loading {hostname} (see the{" "}
              {digest ? "server logs" : "browser console"} for more information).
            </h2>
            {digest ? <p style={styles.text}>{`Digest: ${digest}`}</p> : null}
          </div>
        </div>
      </body>
    </html>
  );
}
