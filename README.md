# Web estàtica de Gestió i Prevenció de Conflictes

Aquesta carpeta conté la versió simplificada de la web. Només utilitza HTML,
CSS i JavaScript. No necessita Node.js, npm, React ni cap servidor per funcionar.

## Com obrir-la al Windows

1. Entra a la carpeta `web-estatica`.
2. Fes doble clic al fitxer `index.html`.
3. La pàgina s’obrirà amb el navegador predeterminat.

L’enllaç «Escriure un correu electrònic» funciona també d’aquesta manera: el
navegador intentarà obrir el programa de correu configurat al Windows.

Si el correu no s’obre, cal configurar una aplicació de correu predeterminada al
Windows. Això no és una limitació de la web, sinó del protocol `mailto:`.

## On es modifiquen els textos

Els textos de la pàgina principal són a `index.html`. L’avís legal i la política
de privacitat són, respectivament, a `avis-legal.html` i
`politica-privacitat.html`. Es poden cercar directament pel text que es vulgui
canviar.

Des de la pàgina principal, els enllaços legals obren aquests mateixos documents
en una finestra superposada. Les pàgines independents continuen disponibles i
es poden obrir directament.

## On es modifiquen els colors i els estils

Els estils són a `css/estils.css`.

Els colors principals es troben al principi del fitxer, dins de `:root`, amb noms
com ara `--forest`, `--copper`, `--ivory` i `--paper`. Canviar-ne el valor actualitza
el color a tota la web.

En aquest mateix fitxer també es defineixen les tipografies, les mides, les
columnes, els botons, les targetes i l’adaptació a mòbils.

## On es troben les imatges

Les imatges són a la carpeta `img`:

- `DONARLESMANS_LOGO_FACTURES.png` és el logotip original de referència.
- `dar-la-mano_gris.bmp` és el dibuix original de l’encaixada de mans.
- `encaixada-ivori.png` és la versió transparent i en color ivori que utilitza
  la web. El text del logotip es reprodueix amb HTML i CSS perquè sigui nítid a
  qualsevol mida.
- `og.png` és la imatge de previsualització quan es comparteix la web.

## Com es modifiquen els enllaços del menú

El menú és a la part superior d’`index.html`. Hi ha una versió d’escriptori amb
la classe `desktop-nav` i una versió mòbil dins de `mobile-nav`.

Cada enllaç té una destinació com `href="#contacte"`. Aquesta destinació ha de
coincidir amb l’atribut `id` de la secció corresponent, per exemple
`<section id="contacte">`.

## Contacte per correu electrònic

L’enllaç de contacte és a `index.html` i utilitza directament el protocol
`mailto:`. La web no conté formularis, no desa dades i no envia consultes a cap
servidor.

## Fitxers que s’han de publicar

Per publicar la web en un allotjament estàtic o a GitHub Pages cal pujar tot el
contingut de `web-estatica` mantenint aquesta estructura:

- `index.html`
- `avis-legal.html`
- `politica-privacitat.html`
- `css/estils.css`
- `js/script.js`
- la carpeta `img` completa

El `README.md` és només documentació i es pot publicar o ometre.
