const handleAlbums = async () => {
  const response = await fetch('http://localhost:3000/albums')
  // const response = await fetch("http://localhost:3000/albums")
  const data = await response.json()
  console.log(data)
  return data
}

const handleSpecial = async () => {
  const response = await fetch('http://localhost:5000/data')
  const data = await response.json()
  const sets = data.setlist.map(set => set.sets)
  const nonEmptySets = sets.filter(set => set.set.length > 0)
  const set = nonEmptySets.map(set => set.set[9].song)
  const name = set.map(song => song.map(song => song.name))
  const nameFlat = name.flat()
  const nameLowercase = nameFlat.map(song => song.toLowerCase())
  console.log(nameLowercase)
  return nameLowercase
}

handleSpecial()

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


export { handleAlbums, handleSpecial, putAlbum }
