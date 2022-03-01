"use strict"

function createNewSong(songName, artist, releaseYear, genre){
    let song = {
        song: songName,
        artist: artist,
        releaseYear: releaseYear,
        genre: genre,
    };
    return song;
}

function addNewSongToDatabase(song, database){
    database.push(song); 
  /* let x = document.forms["add-song"].value;
   if(x == ""){
        alert("You have to fill in the filters");
        return false
   }*/
}

function removeSongById(songs, id){
    for (let i = 0; i < songs.length; i++){
        let song = songs[i];

        if(song.id == id){
            songs.splice(i, 1);
            return;
        }
    }

}

function getSongsByName(songs, name){
    let songsByName = [];

    for (let song of songs){
        if (songs.name.toLowerCase() == name.toLowerCase()){
            songsByName.push(song)
        }
    }
}

function getSongsByArtist(songs, artist){
    let songsByArtist = [];

    for (let song of songs){
        if (songs.artist.toLowerCase() == artist.toLowerCase()){
            songsByArtist.push(song)
        }
    }
}

function getSongsByReleaseYear(songs, releaseYear){
    let songsByReleaseYear = [];

    for (let song of songs){
        if (songs.releaseYear == releaseYear){
            songsByReleaseYear.push(song)
        }
    }
}

function getSongsByGenre(songs, genre){
    let songsByGenre = [];

    for (let song of songs){
        if (songs.genre.toLowerCase() == genre.toLowerCase()){
            songsByGenre.push(song)
        }
    }
}

function renderSong(song){
    let div = document.createElement("div");
    div.classList.add("song");
    div.id = song.id;
    div.innerHTML = `
    <div>${song.id}</div>
    <div>${song.song}</div>
    <div>${song.artist}</div>
    <div>${song.releaseYear}</div>
    <div>${song.genre}</div>
    <button type="button" id="remove">Remove</button>
    `;

    return div;
}

function renderSongs(songs){
    let songsElement = document.getElementById("songs");
    songsElement.innerHTML = "";

    for (let song of songs){
        let songElement = renderSong(song);
        songsElement.appendChild(songElement);
    }
    setRemoveSongHandlers();
}

function addSongSubmit(event){
    event.preventDefault();

    let song = document.getElementById("song").value;
    let artist = document.getElementById("artist").value;
    let releaseYear = document.getElementById("releaseYear").value;
    let genre = document.getElementById("genre").value;

    if(song == ""){
        return alert ("Please write the name of the song")
    }
    else if(artist == ""){
        return alert ("Please write the name of the artist")
    }
    else if(releaseYear == 0){
        return alert ("Please write the release year of the song")
    }
    else if(genre == ""){
        return alert ("Please write the genre of the song")
    }

    let songElement = createNewSong(song, artist, releaseYear, genre);

    songElement.id = database[database.length - 1].id + 1;

    addNewSongToDatabase(database, songElement);
    renderSongs(database);

    let form = document.getElementById("add-song");
    form.reset();
}

function addSongHandler(){
    let form = document.getElementById("add-song");
    form.addEventListener("submit", addSongSubmit);
}

function removeSongClick(event){
    let button = event.target;
    let id = button.parentElement.id;
    removeSongById(database, id);
    renderSongs(database);
}

function setRemoveSongHandlers(){
    let buttons = document.querySelectorAll("#remove");

    for( let button of buttons){
        button.addEventListener("click", removeSongClick);
    }
}

function filterBySongNameSubmit(event){
    event.preventDefault();
    let songName = document.getElementById("filter-song").value;

    let songs = getSongsByName(database, songName);

    renderSongs(songs)
}

function filterByArtistSubmit(event){
    event.preventDefault();
    let artist = document.getElementById("filter-artist").value;

    let songs = getSongsByArtist(database, artist);

    renderSongs(songs)
}

function filterByReleaseYearSubmit(event){
    event.preventDefault();
    let releaseYear = document.getElementById("filter-release").value;

    let songs = getSongsByReleaseYear(database, releaseYear);

    renderSongs(songs)
}

function filterByGenreSubmit(event){
    event.preventDefault();
    let genre = document.getElementById("filter-genre").value;

    let songs = getSongsByGenre(database, genre);

    renderSongs(songs)
}

function showAllClick(){
    document.getElementById("filter-song").value = "";
    document.getElementById("filter-artist").value = "";
    document.getElementById("filter-release").value = "";
    document.getElementById("filter-genre").value = "";
    renderSongs(database);
}

function filterSongHandlers(){
    let nameForm = document.getElementById("filter-by-song");
    let artistForm = document.getElementById("filter-by-artist");
    let releaseForm = document.getElementById("filter-by-releaseYear");
    let genreForm = document.getElementById("filter-by-genre");
    let showAll = document.getElementById("show-all");

    nameForm.addEventListener("submit", filterBySongNameSubmit);
    artistForm.addEventListener("submit", filterByArtistSubmit);
    releaseForm.addEventListener("submit", filterByReleaseYearSubmit);
    genreForm.addEventListener("submit", filterByGenreSubmit);
    showAll.addEventListener("submit", showAllClick)
}



renderSongs(database);
addSongHandler();
filterSongHandlers();