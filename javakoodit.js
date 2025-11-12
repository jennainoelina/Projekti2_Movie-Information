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

    // Jos nimi on annettu, haetaan kaikki elokuvat, joiden nimessä on hakusana
    if (nimi) {
        haeElokuvaHakusanalla(nimi, genre, kieli); // Kutsutaan uutta hakutoimintoa
    } else {
        // Jos ei nimeä, haetaan laajemmin (käyttäen mahdollisesti muita ehtoja)
        haeHaku(genre, kieli);
    }
});

// UUSI FUNKTIO: Hakee kaikki elokuvat, joiden nimessä on annettu hakusana (s=search)
function haeElokuvaHakusanalla(hakusana, genre, kieli) {
    tulostus.innerHTML = "<p>Haetaan elokuvia hakusanalla...</p>";

    // Käytetään 's' (search) parametria laajempaan hakuun
    const osoite = `https://www.omdbapi.com/?s=${encodeURIComponent(hakusana)}&type=movie&apikey=${API_KEY}`;

    fetch(osoite)
        .then(vastaus => vastaus.json())
        .then(data => {
            if (data.Response === "False" || !data.Search) {
                tulostus.innerHTML = `<p>Ei löytynyt elokuvia hakusanalla "${hakusana}".</p>`;
                return;
            }

            tulostus.innerHTML = ""; // Tyhjennetään tulostusalue
            const hakutulokset = data.Search;
            let naytetytElokuvat = 0;

            // Käydään läpi kaikki hakutulokset ja haetaan niistä tarkemmat tiedot
            // (Genre- ja kieli-suodatusta varten tarvitaan erillinen haku IMDb ID:llä)
            hakutulokset.forEach(item => {
                // Rajoitetaan hakujen määrää OMDb:n ilmaisen version rajoitusten takia
                // Jos haluat näyttää enemmän kuin 10, tarvitset mahdollisesti pro-tilin tai sivutuksen.
                if (naytetytElokuvat < 10) {
                     // Haetaan tarkemmat tiedot IMDb ID:llä
                    fetch(`https://www.omdbapi.com/?i=${item.imdbID}&apikey=${API_KEY}`)
                        .then(v => v.json())
                        .then(tiedot => {
                            const genret = tiedot.Genre?.toLowerCase() || "";
                            const kielet = tiedot.Language?.toLowerCase() || "";

                            // Suodatetaan genre ja kieli, jos ne on annettu
                            if (genre && !genret.includes(genre)) return;
                            if (kieli && !kielet.includes(kieli)) return;
                            
                            // Tarkistetaan, että kyseessä on elokuva, vaikka yritettiin rajata type=movie:lla
                            if (tiedot.Type && tiedot.Type.toLowerCase() !== 'movie') return;

                            naytaKortti(tiedot);
                            naytetytElokuvat++;
                        })
                        .catch(virhe => console.error("Virhe tarkemmissa tiedoissa:", virhe));
                }
            });

            // Asetetaan viive, jotta ehtii näyttää "Ei tuloksia" jos yksikään kortti ei tule näkyviin
            setTimeout(() => {
                if (tulostus.innerHTML === "") {
                    tulostus.innerHTML = "<p>Ei löytynyt elokuvia annetuilla suodattimilla.</p>";
                }
            }, 2000);
        })
        .catch(virhe => {
            tulostus.innerHTML = "Virhe haussa: " + virhe;
        });
}

// VANHA FUNKTIO, UUSI NIMI: Hakee tietyn elokuvan tai sarjan nimellä (t=title)
function haeTarkkaElokuva(nimi, genre, kieli) {
    tulostus.innerHTML = "<p>Haetaan tarkan nimen mukaista elokuvaa...</p>";

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

// Jos ei ole nimeä, haetaan yleisiä tuloksia
function haeHaku(genre, kieli) {
    tulostus.innerHTML = "<p>Haetaan elokuvia...</p>";

    // Käytetään yleistä hakusanaa, jos muita ehtoja on annettu, mutta ei nimeä
    // Huom: Tämä haku palauttaa satunnaisia tuloksia, koska 's' on tyhjä,
    // tai käytetään kovakoodattua 'movie', kuten vanhassa koodissa.
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

            const elokuvat = data.Search.slice(0, 10);
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

// Näyttää yhden elokuvan tiedot
function naytaTiedot(data, genre, kieli) {
    tulostus.innerHTML = ""; // poistetaan "Haetaan..." teksti

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

// Luo elokuvakortin ja lisää sen sivulle
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