const handleData = async () => {
  // const response = await fetch('https://solitary-fire-5581.fly.dev/data')
  // const response = await fetch('http://localhost:3000/data')
  const url = (process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/data'
  const response = await fetch(url)
  const data = await response.json()
  // console.log(data)
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


export { handleData, putAlbum }
