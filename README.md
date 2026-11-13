# SOLLUX Lighting – Landing Page

Projekt landing page’a przygotowany w ramach rekrutacji. Zawiera interaktywny slider, efekty hover na kafelkach, animację shader (WebGL) oraz responsywny układ.

## Uruchomienie

Projekt składa się z trzech plików: `index.html`, `style.css`, `script.js`. Nie wymaga instalacji zależności ani kompilacji.

1.  **Sposób 1 (najprostszy)**: Otwórz plik `index.html` bezpośrednio w przeglądarce (np. dwuklikiem).
2.  **Sposób 2 (zalecany)**: Użyj prostego lokalnego serwera, aby uniknąć potencjalnych problemów z CORS:
    *   Jeśli masz Pythona: `python -m http.server 8000` (w folderze z projektem), a następnie otwórz `http://localhost:8000`.
    *   Jeśli masz Node.js: `npx serve` lub `npx http-server`.

Projekt korzysta z CDN dla Three.js, więc wymagane jest połączenie z internetem.

## Struktura projektu

-   `index.html` – struktura strony.
-   `style.css` – style i animacje.
-   `script.js` – logika slidera, interakcji z lampami i shaderem.

## Zgodność z wytycznymi

-   **Menu**: Przejścia `ease-in-out` 250ms dla tła i kolorów.
-   **Slider**: Automatyczna zmiana co 3s, crossfade 600ms, skalowanie 1.05, żółty pasek postępu.
-   **Kafelki (Bento)**: Hover – obraz `scale(1.1)` 500ms `ease-out`, przycisk `#4A4A4A` 250ms `ease-in`.
-   **Shader**: Płynna, nieskończona pętla oparta na funkcjach sinusoidalnych.

## Praca z AI – informacje

Zgodnie z wymaganiami, proces tworzenia był wspierany przez AI. Poniżej znajdują się wskazówki, jak wyeksportować rozmowę:

1.  **Jeśli używałeś ChatGPT**: Skorzystaj z funkcji „Share chat” lub „Export data” w ustawieniach konta. Otrzymasz plik JSON z pełną historią.
2.  **Jeśli używałeś innego narzędzia**: Poszukaj opcji „Export” lub „Download conversation”. Jeśli nie ma takiej, możesz ręcznie skopiować treść rozmowy do pliku tekstowego.
3.  **Usuwanie sekretów**: Przed udostępnieniem rozmowy usuń z niej wszelkie klucze API, hasła, tokeny i dane osobowe.

Do odpowiedzi na rekrutację dołącz:
-   Link do repozytorium (np. GitHub) lub archiwum ZIP z kodem.
-   Plik z wyeksportowaną rozmową (JSON/TXT).
-   Ten plik README.
