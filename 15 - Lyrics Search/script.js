const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh/";

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  result.innerHTML = "";

  console.log(data);

  showData(data);
}

// Show song and artist in DOM

function showData(data) {
  const html = `
        <ul class="songs">
            ${data.data
              .map(
                song =>
                  `<li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                    </li>`
              )
              .join("")}
        </ul>
            `;

  result.insertAdjacentHTML("beforeend", html);
  showPagination(data);
}

// Prev - Next Pagination
function showPagination(data) {
  let html = "";
  if (data.prev || data.next) {
    html = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    html = "";
  }
  more.insertAdjacentHTML("beforeend", html);
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;
  }

  more.innerHTML = "";
}

// Event listeners
form.addEventListener("submit", e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  !searchTerm ? alert("Please type in a search term") : searchSongs(searchTerm);
});

// Get lyrics button click
result.addEventListener("click", e => {
  if (e.target.classList.contains("btn")) {
    const artist = e.target.dataset.artist;
    const songTitle = e.target.dataset.songtitle;
    getLyrics(artist, songTitle);
  }
});
