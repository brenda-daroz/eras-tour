const handleAlbums = async () => {
  const response = await fetch('http://localhost:3000/albums')
  const data = await response.json()
  return data
}



const putAlbum = async (album) => {
  const response = await fetch(`http://localhost:3000/albums/${album.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(album)
  })
  console.log(response)
  const data = await response.json()
  return data
}

// patchAlbum()


export {handleAlbums, putAlbum}
