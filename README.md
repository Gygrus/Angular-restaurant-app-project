# Restauracja

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Build

Aby uruchomić projekt na swoim komputerze musimy mieć zainstalowany Angular, menedżer pakietów npm oraz zainstalować pliki z tego repozytorium. W folderze z plikami po uruchomieniu konsoli wpisujemy:
`npm install` - instaluje wszystkie zależności użyte w projekcie
`ng serve --open` - uruchamia projekt

## Opis 

Jest to projekt zrealizowany od zera na zajęcia "Wstęp do aplikacji internetowych", mający na celu realizować funkcjonalności strony internetowej przykładowej restauracji. Projekt ten został napisany przy użyciu framework'u webowego Angular oraz bazy danych realtime database ze strony Firebase. W bazie realtime database przechowywane są informacje o potrawach, użytkownikach oraz statusie persystencji.

### Podstawowe funkcjonalności 

Zrealizowany został podział na użytkowników wraz z autentykacją przy użyciu api Firebase. Zaimplementowane zostało logowanie, rejestracja i wylogowywanie w oparciu o moduł AngularFireAuth.

Widok rejestracji
![SignIn](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20rejestracji.jpg)

Widok logowania
![LogIn](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20logowania.jpg)


#### Użytkownik niezalogowany

Ma dostęp do widoku strony startowej strony, może przeglądać ofertę oraz filtrować ją, jednak aby zamówić danie musi się zalogować bądź zarejestrować.

Widok strony startowej
![HomeView](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20Home.jpg)

Widok Menu
![MenuView](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20Menu.png)


#### Użytkownik Client

Klient może przeglądać dania oraz rezerwować oferty zapisując je do swojego koszyka. Zamówione dania zostaną dodane do historii zamówień. Może oceniać i zostawiać komentarze ale tylko dla ofert z których 
korzystał. 

Widok szczegółów dania
![DishDetails1](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/widok%20szczegolow%20dania%201.png)
![DishDetails2](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/widok%20szczegolow%20daniia%202.jpg)

Widok koszyka
![Cart](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20koszyka.jpg)

Widok historii zamówień
![DishHistory](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20historii%20zam%C3%B3wie%C5%84.jpg)

#### Użytkownik Manager

Manager może modyfikować ofertę – dodając, modyfikując lub usuwając pozycje menu. Nie 
może oceniać potraw. Może zostawiać komentarze dla wszytkich ofert. 

#### Użytkownik Admin

Admin oprócz modyfikacji oferty może dodatkowo przeglądać listę zarejestrowanych 
użytkowników w specjalnym panelu admina widocznym tylko dla niego. Ma możliwość banowania użytkownika. Zbanowanie oznacza, że użytkownik nie 
może zostawiać komentarzy ani oceniać potraw. Admin może ponadto przypisywać role użytkownikom.

![AdminPanel](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20panelu%20admina.png)


##

Zarówno Admin jak i Manager mają dostęp do panelu Managera Dań, gdzie można edytować daną ofertę, bądź też dodać nową pozycję.

![DishManager](https://github.com/Gygrus/Angular-restaurant-app-project/blob/master/images/Widok%20managera%20da%C5%84.jpg)


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
