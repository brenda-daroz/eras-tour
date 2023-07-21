export default function Custom500() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "purple", fontSize: "1.1rem" }}>Oooops, something went wrong.</p>
      <iframe src="https://giphy.com/embed/WQCv56djMTCmQkySAg" style={{ border: 0 }} width="378" height="480" class="giphy-embed" allowFullScreen></iframe>
      <h1 style={{ color: "purple" }}>Please, refresh the page.</h1>
    </div>
  )
}
