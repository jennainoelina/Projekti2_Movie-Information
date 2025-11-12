# Projektin nimi ja tekijät
Projektin "Leffaportti" tekijänä Jenna Vahviala

## Verkkolinkit:
Pääset julkaistuun sovellukseen käsiksi osoitteessa https://leffaportti.netlify.app/

Linkki projektin videoesittelyyn https://fotovahviala.kuvat.fi/kuvat/Omat/LAUREA/Websovellusten+kehitt%C3%A4minen/

## Työn jakautuminen 
Koko projektin teki Jenna Vahviala.

## Oma arvio työstä ja oman osaamisen kehittymisestä
Mielestäni onnistuin erityisesti ulkoasun luomisessa. Aikaisemmin jäänyt vaivaamaan, ettei ulkoasusta ole tullut "tarpeeksi nätti" omaan makuun. Nyt olen todella tyytyväinen.

Parantamista olisi rajapintahakujen kanssa.

Sovelluksesta jäi puuttumaan lisätiedot kuvia painaessa. Sovellus näyttää myös vain 10 tulosta, jos hakee kielellä tai genrellä. Kielihaku on myös rajallinen (esim. suomenkielisiä tuloksia ei tule).

Koen, että olen oppinut paljonkin projektia tehdessä. Rajapintojen kutsu ja tietojen käyttä konkretisoitui paremmin kun teki omaa projektia.

Antaisin itselleni arvosanaksi: 4-5

## Palaute opettajalle kurssista sekä itse opetuksesta tähän saakka
Kurssi sekä lähiopetus ovat tuntuneet todella hyödyllisiltä. Workshopit ovat auttaneet tehtävien ymmärtämisessä kun apua on saatavilla helposti. Tehtävissä käytettiin paljon opittuja koodeja, mutta myös sellaisia pätkiä ja rakenteita, joita ei mielestäni käyty yhteisesti läpi tai selitetty ollenkaan. Oppimista tukisi huomattavasti koodien läpikäynti ja selitys, mitä yksittäiset koodit tekee. Jouduin itse kysymään tekoälyltä paljon apua koodien selittämisessä, koska teorioissa ei käyty asiaa läpi tarpeeksi perusteellisesti.

Mutta yleisesti ottaen nautin kyllä tästä kurssista, tehtävistä ja opetuksesta. Pidän Mikan opetustyylistä.


## Sisällysluettelo:

- [Tietoja sovelluksesta](#tietoja-sovelluksesta)
- [Tunnetut virheet/bugit](#Tunnetut-virheet/bugit)
- [Kuvakaappaukset](#kuvakaappaukset)
- [Teknologiat](#teknologiat)
- [Asennus](#asennus)
- [Kiitokset](#kiitokset)

## Tietoja sovelluksesta
Leffaportti on sovellus, josta pystyy hakemaan leffatietoja OMDb -sivustolta. Sovelluksella pystyy hakemaan elokuvan tai sarjan nimellä, genrellä ja kielellä. Yhden hakuehdon täytyy täyttyä, jotta sovelluksen haku toimii. Hakutulos näyttää haetun/haettuje nimen, julkaisvuoden, keston, genren, kielen sekä posterin. Hakemalla nimellä tulostetaan kaikki hakusanan sisältämät tulokset.

## Tunnetut virheet/bugit
Ongelmaksi muodostui Finnkinon rajapinnasta tietojen hakeminen. Netistä ei saanut suoraa vastausta, miksi ei tietoja hakenut, joten taistelin tämän kanssa pidemmän aikaa. Loppujen lopuksi selvisi, ettei rajapintakutsu toimi juuri tällä hetkellä, joten jouduin päivässä päivittämään koko sovelluksen eri rajapinnalle (OMBd), josta tuli hieman erilaisia tietoja.

Toinen tunnettu ongelma on, että tuloksien lukumäärä vaihtelee suuresti valintojen perusteella.

## Kuvakaappaukset
[ESIM1](./kuvat/SS1.png)
[ESIM2](./kuvat/SS2.png)
[ESIM3](./kuvat/SS3.png)
[ESIM4](./kuvat/SS4.png)

## Teknologiat
Käytin seuraavia teknologioita koodin tekemiseen: html, css sekä javascript. Koodi on luotu Visual Studio Code -ohjelmalla.
Demovideo on näytillä kuvat.fi palvelussa ja sovellus toimii Netlify alustalla.

## Asennus 
- Sovellus löytyy osoitteesta https://leffaportti.netlify.app/
- Kirjoita elokuvan tai sarjan nimi, genre ja/tai kieli. Yhden hakuehdon täytyy täyttyä, jotta haku suoritetaan.
- Paina HAE.
- Haku näyttää max. 10 tulosta haun perusteella.

## Kiitokset  
- AI (ChatGPT)
- Canvas materiaali
- Mika Stenberg opetus
- W3schools (https://www.w3schools.com/)

AI toimi apuna koodipätkien ja vikojen etsimisessä. Auttoi myös koodien soveltamisessa oikeaan tarkoitukseen.