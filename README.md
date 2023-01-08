# Inlämningsuppgift: REST-API 

## Beskrivning:
#### Ett enklare REST-API skapat i NodeJS med express. API:et hanterar "användare", varje objekt(användare) har fyra egenskaper, i detta fall - förnamn, efternamn, ålder och ett id. API:et har funktionalitet för CRUD, det finns 5st endpoints (GET x2, DELETE, PUT och POST). Det går att hämta alla användare, lägga till, ta bort och ändra. När en användare läggs till får den ett unikt id, id:et kan användas för at söka efter/hämta en specifik användare. Alla endpoints kan testköras i .rest-filen. Klientgränssnitt saknas. 

## Hur projktet körs:
### 
1. Skriv in npm install i terminalen i vs code.
2. Skriv in npm start för att få igång servern på port 3002.
3. Testa alla endpoints i .rest-filen. 
(Rest Client krävs)

## Följande krav är uppfyllda: 
### För G:
#### 
- Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
- Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)
- All data är sparad i JSON-fil. Datan i JSON-filen uppdateras då något läggs till, tas bort eller ändras/uppdateras.
- API:et svarar med 404 om data saknas
- Git & GitHub har använts.
- Projektmappen innhåller en README.md fil.

### För VG:
- Alla punkter för godkänt är uppfyllda.
- Ytterligare en GET endpoint är tillagd där det går att hämta ett specifikt objekt.

### Ej uppfyllt (VG):
- Saknar klientgränssnitt