//länk till repository: https://github.com/JuliaErmansson/U2

'use strict'
//Funktionen gör så att det skapas en ny låt och returnerar variabeln song
function createNewSong (songName, artist, releaseYear, genre) {
  let song = {
    song: songName,
    artist: artist,
    releaseYear: releaseYear,
    genre: genre
  }
  return song
}
//Funktionen gör så att variabeln song läggs till i database
function addNewSongToDatabase (database, song) {
  database.push(song)
}
//Tar bort låten beroende på dess id
function removeSongById (songs, id) {
  for (let i = 0; i < songs.length; i++) {
    let song = songs[i]

    if (song.id == id) {
      songs.splice(i, 1)
      return
    }
  }
}
//Hämtar ett objekt baserat på namnet
function getSongsByName (songs, name) {
  let songsByName = []

  for (let song of songs) {
    if (song.song.toLowerCase() == name.toLowerCase()) {
      songsByName.push(song)
    }
  }
  return songsByName
}
//Hämtar ett objekt baserat på artisten
function getSongsByArtist (songs, artist) {
  let songsByArtist = []

  for (let song of songs) {
    if (song.artist.toLowerCase() == artist.toLowerCase()) {
      songsByArtist.push(song)
    }
  }
  return songsByArtist
}
//Hämtar ett objekt baserat på utgivningsåret
function getSongsByReleaseYear (songs, releaseYear) {
  let songsByReleaseYear = []

  for (let song of songs) {
    if (song.releaseYear == releaseYear) {
      songsByReleaseYear.push(song)
    }
  }
  return songsByReleaseYear
}
//Hämtar ett objekt baserat på genre
function getSongsByGenre (songs, genre) {
  let songsByGenre = []

  for (let song of songs) {
    if (song.genre.toLowerCase() == genre.toLowerCase()) {
      songsByGenre.push(song)
    }
  }
  return songsByGenre
}
//Gör ett objekt till en div
function renderSong (song) {
  let div = document.createElement('div')
  div.classList.add('song')
  div.id = song.id
  div.innerHTML = `
    <li></li>
    <div>${song.song}</div>
    <div>${song.artist}</div>
    <div>${song.releaseYear}</div>
    <div>${song.genre}</div>
    <button type="button" id="remove">Remove</button>
    `

  return div
}
//Renderar låtarna så dem visas upp på sidan
function renderSongs (songs) {
  let songsElement = document.getElementById('songs')
  songsElement.innerHTML = ''

  for (let song of songs) {
    let songElement = renderSong(song)
    songsElement.appendChild(songElement)
  }
  setRemoveSongHandlers()
}
//Gör så man kan fylla i forms
function addSongSubmit (event) {
  event.preventDefault()

  let song = document.getElementById('song').value
  let artist = document.getElementById('artist').value
  let releaseYear = document.getElementById('releaseYear').value
  let genre = document.getElementById('genre').value
  //Ber användaren att fylla i rutorna ifall dem är tomma
  if (song == '') {
    return alert('Please write the name of the song')
  } else if (artist == '') {
    return alert('Please write the name of the artist')
  } else if (releaseYear == 0) {
    return alert('Please write the release year of the song')
  } else if (genre == '') {
    return alert('Please write the genre of the song')
  }

  let songElement = createNewSong(song, artist, releaseYear, genre)

  if ((database.length = database.length)) {
    songElement.id = database[database.length - 1].id + 1
  } else {
    songElement.id = 1
  }

  addNewSongToDatabase(database, songElement)
  renderSongs(database)

  let form = document.getElementById('add-song')
  form.reset()
}
//Gör så man kan addera låtar till databasen med click på en knapp
function addSongHandler () {
  let form = document.getElementById('add-song')
  form.addEventListener('submit', addSongSubmit)
}
//Gör så att man kan ta bort en låt
function removeSongClick (event) {
  let button = event.target
  let id = button.parentElement.id
  let sure = confirm('Are you sure that you want to remove this song?')
  if (sure) {
    removeSongById(database, id)
    alert('the song was removed')
  } else {
    alert('the song was not removed')
  }

  renderSongs(database)
}
//Gör så att en låt går bort när man trycker på remove knappen
function setRemoveSongHandlers () {
  let buttons = document.querySelectorAll('#remove')

  for (let button of buttons) {
    button.addEventListener('click', removeSongClick)
  }
}
//Filtrerar låtarna beroende på låtnamn
function filterBySongNameSubmit (event) {
  event.preventDefault()
  let songName = document.getElementById('filter-song').value

  let songs = getSongsByName(database, songName)

  renderSongs(songs)
}
//Filtrerar låtarna beronde på artist
function filterByArtistSubmit (event) {
  event.preventDefault()
  let artist = document.getElementById('filter-artist').value

  let songs = getSongsByArtist(database, artist)

  renderSongs(songs)
}
//Filtrerar låtarna beronde på utgivningsåret
function filterByReleaseYearSubmit (event) {
  event.preventDefault()
  let releaseYear = document.getElementById('filter-release').value

  let songs = getSongsByReleaseYear(database, releaseYear)

  renderSongs(songs)
}
//Filtrerar låtarna beroende på genre
function filterByGenreSubmit (event) {
  event.preventDefault()
  let genre = document.getElementById('filter-genre').value

  let songs = getSongsByGenre(database, genre)

  renderSongs(songs)
}
//Gör så att alla låtar från den orginella databasen kommer tillbaks efter filtrering
function showAllClick () {
  document.getElementById('filter-song').value = ''
  document.getElementById('filter-artist').value = ''
  document.getElementById('filter-release').value = ''
  document.getElementById('filter-genre').value = ''
  renderSongs(database)
}
//Lägger till olika event på dem olika filterknapparna
function filterSongHandlers () {
  let nameForm = document.getElementById('filter-by-song')
  let artistForm = document.getElementById('filter-by-artist')
  let releaseForm = document.getElementById('filter-by-releaseYear')
  let genreForm = document.getElementById('filter-by-genre')
  let showAll = document.getElementById('show-all')

  nameForm.addEventListener('submit', filterBySongNameSubmit)
  artistForm.addEventListener('submit', filterByArtistSubmit)
  releaseForm.addEventListener('submit', filterByReleaseYearSubmit)
  genreForm.addEventListener('submit', filterByGenreSubmit)
  showAll.addEventListener('click', showAllClick)
}

renderSongs(database)
addSongHandler()
filterSongHandlers()
