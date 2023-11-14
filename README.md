# ISM Discord Bot

Bot Discordowy którego zadaniem jest integracja z Leockim Instytutem Statystyk Międzynarodowych. UWAGA! Sam bot tylko zapisuje statystyki do bazy danych! Zaprezentowanie ich dla ISM zostawiam już w waszych rękach.



## Wymagania
- Dostęp do bazy danych z uprawnieniami ```INSERT, SELECT, UPDATE, CREATE```.
- Wersja node.js ```≥20.0.0``` lub instalacja ```dotenv```
## Zmienne Środowiskowe 
Tworzymy plik o nazwie ```.env``` i ustawiamy w nim następujące zmienne środowiskowe: 
```
DISCORD_TOKEN = SEKRET BOTA DISCORDOWEGO
GUILD_ID = ID SERWERA DISCORD

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
npm install discord.js mysql2
``` 
- Uruchomienie bota:
```
node --env-file .env ./app.js
```
## License

[GPL 3.0](https://choosealicense.com/licenses/gpl-3.0//) - Bierzcie i jecie z tego wszyscy!
