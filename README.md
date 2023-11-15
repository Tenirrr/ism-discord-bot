# ISM Discord Bot
Bot Discordowy którego zadaniem jest integracja z Leockim Instytutem Statystyk Międzynarodowych.
## Wymagania
- Dostęp do bazy danych z uprawnieniami ```INSERT, SELECT, UPDATE, CREATE```.
- Wersja node.js ```≥20.0.0``` lub instalacja ```dotenv```
## Jak utworzyć bota?
Poradnik znajduje się w pliku ```DISCORD_TOKEN&GUILD_ID.pdf```
## Zmienne Środowiskowe 
Tworzymy plik o nazwie ```.env``` i ustawiamy w nim następujące zmienne środowiskowe: 
```
DISCORD_TOKEN = SEKRET BOTA DISCORDOWEGO
GUILD_ID = ID SERWERA DISCORD

PORT = PORT NA KTÓRYM MA NASŁUCHIWAĆ WEB SERVER DEF. 3000

DB_HOST = IP/DOMENA BAZY DANYCH
DB_PORT = PORT DEF. 3306
DB_NAME = NAZWA BAZY DANYCH
DB_USER = NAZWA UŻYTKOWNIKA
DB_PASS = HASŁO UŻYTKOWNIKA
```
## Uruchamianie 
Aby uruchomić bota musimy użyć następujących komend:
- Instalujemy wymagane paczki:
```sh
npm install discord.js express mysql2 moment
``` 
- Uruchomienie bota:
```
node --env-file .env ./app.js
```
## Gdzie są dostępne dane?
Dane są dostępne pod adresem: 
```
<ADRES WEB SERVERA>:<PORT WEB SERVERA>?data=<ROK>-<MIESIĄC>-<DZIEŃ>
```
## License
[GPL 3.0](https://choosealicense.com/licenses/gpl-3.0//) - Bierzcie i jecie z tego wszyscy!
