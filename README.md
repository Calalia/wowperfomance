Sovelluksen tarkoitus on seurata World of Warcraft pelaajien pelisuoritusdataa. 
Sovellus on suunniteltu esimerkiksi raidien järjestäjien työkaluksi tiimin kykyjen arviointiin.
Sovellus on keskeneräinen ja kloonattu repositorio ei toimi ympäristömuuttujina annettujen salasanojen ja api-avainten puutteen vuoksi.
Backend hakee WarcrafLogsin API:sta tietoja asynkronisesti ja tallentaa niitä omaan tietokantaan. 
Backend jakaa oman tietokannan tietoja REST tyylisen API:n kautta. 
Front endistä on tarkoitus lähettää pyyntöjä ladata tietyn pelaajan tiedot järjestelmään ja järjestellä tietoja helposti luettavaan muotoon