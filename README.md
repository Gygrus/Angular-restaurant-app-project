# Restauracja

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Opis 

Jest to projekt zrealizowany od zera na zajęcia "Wstęp do aplikacji internetowych", mający na celu realizować funkcjonalności strony internetowej przykładowej restauracji. Projekt ten został napisany przy użyciu framework'u webowego Angular oraz bazy danych realtime database ze strony Firebase. W bazie realtime database przechowywane są informacje o potrawach, użytkownikach oraz statusie persystencji.

### Podstawowe funkcjonalności 

Zrealizowany został podział na użytkowników wraz z autentykacją przy użyciu api Firebase. Zaimplementowane zostało logowanie, rejestracja i wylogowywanie w oparciu o moduł AngularFireAuth.

#### Użytkownik niezalogowany

Ma dostęp do widoku strony startowej strony, może przeglądać ofertę oraz filtrować ją, jednak aby zamówić danie musi się zalogować bądź zarejestrować

![HomeView](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20Home.jpg)

#### Użytkownik Client

Klient może przeglądać dania oraz rezerwować oferty zapisując je do swojego koszyka. Może oceniać i zostawiać komentarze ale tylko dla ofert z których 
korzystał. 

#### Użytkownik Manager

Manager może modyfikować ofertę – dodając, modyfikując lub usuwając pozycje menu. Nie 
może oceniać potraw. Może zostawiać komentarze dla wszytkich ofert. 

#### Użytkownik Admin

Admin oprócz modyfikacji oferty może dodatkowo przeglądać listę zarejestrowanych 
użytkowników w specjalnym panelu admina widocznym tylko dla niego. Ma możliwość banowania użytkownika. Zbanowanie oznacza, że użytkownik nie 
może zostawiać komentarzy ani oceniać potraw. Admin może ponadto przypisywać role użytkownikom.

##

Zarówno Admin jak i Manager mają dostęp do panelu Managera Dań, gdzie można edytować daną ofertę, bądź też dodać nową pozycję.

Odpowiednie widoki zostały ukryte dla nieautoryzowanych użytkowników za pomocą AuthGuard'a, więc nie można dostać się do danego widoku po prostu wpisując odpowiedni adres. Zastosowany został również routing

##
### Dodatkowe funkcjonalności

- własna implementacja paginacji
- możliwość ustawienia trybu persystencji
- możliwość zmiany waluty
- slider zdjęć po wejściu w szczegóły dania (tylko dla zalogowanych użytkowników)
- ocenianie dań i komentowanie
- przeglądanie historii zamówień
- filtrowanie dań na podstawie wpisanej nazwy, przedziału cenowego, kategorii itp.
