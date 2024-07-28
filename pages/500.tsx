import React from "react"
export default function Custom500() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "purple", fontSize: "1.1rem" }}>Oops, something went wrong. It's not you, it's us.</p>
      <iframe src="https://giphy.com/embed/WQCv56djMTCmQkySAg" style={{ border: 0 }} width="378" height="480" className="giphy-embed" allowFullScreen></iframe>
      <h1 style={{ color: "purple" }}>We're doing everything we can to bring the app back up and running.</h1>
    </div>
  )
}
