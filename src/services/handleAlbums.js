const handleAlbums = async () => {
  const response = await fetch('http://localhost:3000/albums')
  const data = await response.json()
  return data
}

export default handleAlbums
