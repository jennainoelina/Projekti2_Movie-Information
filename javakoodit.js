// elementtien haku
const haku = document.getElementById("hae");
const tulostus = document.getElementById("data");
const nimiKentta = document.getElementById("nimi");
const genreValinta = document.getElementById("genre");
const kieliKentta = document.getElementById("kieli");

// OMDb API-avain
const API_KEY = "14dc0fd";

// Hae-nappulan toiminto
haku.addEventListener("click", function() {
    const nimi = nimiKentta.value.trim();
    const genre = genreValinta.value.toLowerCase();
    const kieli = kieliKentta.value.trim().toLowerCase();

    // Tarkistetaan että vähintään yksi kenttä on täytetty
    if (!nimi && !genre && !kieli) {
        tulostus.innerHTML = "<p>Anna vähintään yksi hakuehto (nimi, genre tai kieli).</p>";
        return;
    }

    // Jos nimi on annettu, haetaan suoraan tietyllä nimellä
    if (nimi) {
        haeElokuva(nimi, genre, kieli);
    } 
    // Genre/kieli on annettu, haetaan hakusanalla (useita tuloksia)
    else {
        haeHaku(genre, kieli);
    }
});

// Hakee tietyn elokuvan tai sarjan nimellä
function haeElokuva(nimi, genre, kieli) {
    tulostus.innerHTML = "Haetaan elokuvatietoja...";

    const osoite = `https://www.omdbapi.com/?t=${encodeURIComponent(nimi)}&apikey=${API_KEY}`;

    fetch(osoite)
        .then(vastaus => vastaus.json())
        .then(data => {
            if (data.Response === "False") {
                tulostus.innerHTML = `<p>Ei löytynyt elokuvaa nimellä "${nimi}".</p>`;
                return;
            }

            naytaTiedot(data, genre, kieli);
        })
        .catch(virhe => {
            tulostus.innerHTML = "Virhe haussa: " + virhe;
        });
}

// Jos ei ole nimeä, haetaan useampia ehdokkaita hakusanoilla
function haeHaku(genre, kieli) {
    tulostus.innerHTML = "Haetaan elokuvia...";

    // haetaan yleinen lista, esim. "movie" tai "film" hakusanalla
    const osoite = `https://www.omdbapi.com/?s=movie&apikey=${API_KEY}`;

    fetch(osoite)
        .then(vastaus => vastaus.json())
        .then(data => {
            if (data.Response === "False") {
                tulostus.innerHTML = "<p>Ei löytynyt elokuvia valituilla ehdoilla.</p>";
                return;
            }

            tulostus.innerHTML = "";
            let laskuri = 0;

            // Käydään läpi hakutulokset ja suodatetaan genre/kieli
            const elokuvat = data.Search.slice(0, 10); // max 10 tulosta
            elokuvat.forEach(item => {
                fetch(`https://www.omdbapi.com/?i=${item.imdbID}&apikey=${API_KEY}`)
                    .then(v => v.json())
                    .then(tiedot => {
                        const genret = tiedot.Genre?.toLowerCase() || "";
                        const kielet = tiedot.Language?.toLowerCase() || "";

                        if (genre && !genret.includes(genre)) return;
                        if (kieli && !kielet.includes(kieli)) return;

                        naytaKortti(tiedot);
                        laskuri++;
                    });
            });

            setTimeout(() => {
                if (laskuri === 0) {
                    tulostus.innerHTML = "<p>Ei löytynyt elokuvia valituilla ehdoilla.</p>";
                }
            }, 2000);
        })
        .catch(virhe => {
            tulostus.innerHTML = "Virhe haussa: " + virhe;
        });
}

// Näyttää yksittäisen elokuvan tiedot
function naytaTiedot(data, genre, kieli) {
    const genret = data.Genre?.toLowerCase() || "";
    const kielet = data.Language?.toLowerCase() || "";

    if (genre && !genret.includes(genre)) {
        tulostus.innerHTML = `<p>Elokuvan genre ei vastaa hakua (${genre}).</p>`;
        return;
    }

    if (kieli && !kielet.includes(kieli)) {
        tulostus.innerHTML = `<p>Elokuvan kieli ei vastaa hakua (${kieli}).</p>`;
        return;
    }

    naytaKortti(data);
}

// Luo ja näyttää kortin
function naytaKortti(data) {
    const html = `
        <div class="leffa">
            <h3>${data.Title}</h3>
            ${data.Poster && data.Poster !== "N/A" ? `<img src="${data.Poster}" alt="${data.Title}" width="200">` : ""}
            <p><b>Julkaisuvuosi:</b> ${data.Year || "-"}</p>
            <p><b>Kesto:</b> ${data.Runtime || "-"}</p>
            <p><b>Genre:</b> ${data.Genre || "-"}</p>
            <p><b>Kieli:</b> ${data.Language || "-"}</p>
        </div>
    `;
    tulostus.innerHTML += html;
}
