# WCAQuiz

**WCAQuiz** è un'app web sviluppata in **Next.js** che trasforma il mondo della [World Cube Association](https://www.worldcubeassociation.org/) in un'esperienza di gioco interattiva. Attraverso tre modalità di quiz, gli utenti possono mettere alla prova la propria conoscenza delle persone registrate su WCA, cercando di indovinarne identità, risultati e dettagli.

## Modalità di gioco

### Reveal

La modalità classica. Hai 10 tentativi per indovinare correttamente una persona WCA. Ad ogni errore, riceverai un indizio utile per restringere il campo.

### Focus

Basata sulle immagini WCA. Ti verrà mostrata una foto completamente sfocata di una persona. Hai 5 tentativi per indovinare chi è. Ogni errore rivelerà un indizio e un'immagine progressivamente meno sfocata.

### Versus

Una sfida in stile confronto diretto. Scegli un evento WCA e ti verranno proposte due persone. Dovrai scegliere chi tra le due ha la media o il singolo ufficiale più basso nell'evento selezionato.

## Fonti dati

L'app interagisce con:

- L'API ufficiale WCA: [worldcubeassociation.org/api/v0](https://www.worldcubeassociation.org/api/v0)
- L'API non ufficiale di Robin Ingelbrecht: [robiningelbrecht/wca-rest-api](https://wca-rest-api.robiningelbrecht.be/)

## Note sulla versione

Questa versione è un refactoring completo della [versione precedente](https://github.com/proddjt/WCAQuiz2). Le principali novità rispetto alla precedente release sono:

- **Nuova libreria di componenti**: migrazione da HeroUI a [Mantine](https://mantine.dev/)
- **Maggiore stabilità**: architettura del codice rivista per garantire un'esperienza più affidabile
- **Bug fix**: corretti numerosi bug presenti nella versione precedente

## Autori

- Ideazione e sviluppo: [Giovanni Tramontano](https://www.worldcubeassociation.org/persons/2013TRAM03)
- Design e grafiche: [Carmen Gravano](https://www.worldcubeassociation.org/persons/2022GRAV05)

Nessuno dei due è affiliato ufficialmente con il team WCA.

## Live

L'app è disponibile online all'indirizzo:  
[https://wcaquiz.xyz](https://wcaquiz.xyz)

## Contatti

Per domande, suggerimenti o segnalazioni:

- Usa la sezione **Issues** della repository
- Oppure contatta Giovanni su Telegram: [@gitra17](https://t.me/gitra17)
