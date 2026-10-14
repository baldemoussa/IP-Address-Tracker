# IP Address Tracker

A one-page tracker. The heading is "IP Address Tracker". The typeface is Rubik. The page loads `dist/index.js`, which is the compiled copy of `src/index.ts`, and it loads Leaflet from the unpkg script in `index.html`.

Serve this folder and open `index.html`. The script is a module, so it needs a local server. This run used http://127.0.0.1:5522/.

The lookup goes to `https://geo.ipify.org/api/v2/country,city`. The key is written in `src/services/apiService.ts`. The map is a Leaflet map at zoom 12 with OpenStreetMap tiles and one marker. The marker popup opens on its own.

## First load

The first lookup is the address `8.8.8.8`. The card starts as "IP Address Loading ...", "Location Loading ...", "Timezone Loading ...", and "ISP Loading ...", then fills in.

This response was IP `8.8.8.8`, location California, US, and Mountain View, timezone `UTC -07:00`, and ISP Google LLC. The postal code was empty. The coordinates were latitude `32.69922` and longitude `-117.11281`, so the pin sits in the San Diego area while the city name is Mountain View. The popup reads "California, US, Mountain View".

The labels are uppercase. At this window, about 842px wide, the four columns wrap: the timezone splits after `UTC`, and the ISP splits after `Google`.

![8.8.8.8 on the first load, with the pin near San Diego](docs/screenshots/home.png)

## Search

The box placeholder is "Search for any IP address, domain or email". Typing checks the text as an IP address, then an email, then a domain.

`hello` shows the red sentence "Please enter a valid IP address, Email, or Domain."

![hello is rejected](docs/screenshots/invalid.png)

`1.1.1.1` shows "Valid IP Address, proceed to search" in `rgb(100, 143, 100)` at 24px. That line is drawn behind the white card, so only a strip of it shows above the card.

![The valid message sits behind the card](docs/screenshots/valid.png)

The search button and the Enter key both run the lookup and clear that message. Searching `1.1.1.1` returned State of Queensland, AU, and South Bank, timezone `UTC +10:00`, ISP Cloudflare. The postal code was empty. The pin is at latitude `-27.47766` and longitude `153.0211`.

![1.1.1.1 in South Bank](docs/screenshots/cloudflare.png)

`google.com` shows "Valid Domain Name, proceed to search". The lookup returned IP `142.251.215.206`, location California, US, and The Greenhouse, timezone `UTC -07:00`, ISP Google LLC, at latitude `37.41889` and longitude `-122.10361`.

`ada@example.com` shows "Valid Email Address, proceed to search". The lookup returned 200 and the body `{"results":[]}`. That body has no location, so the card stayed on the Google result and the message was cleared.

A value that fails the three checks does not change the last query type. After the email search, `hello` was still sent as an email. That request returned 422 and `{"code":422,"messages":"Input correct email."}`. The red sentence was cleared by the click, and the card stayed on `142.251.215.206`.

The search button stylesheet turns the black button to `hsl(0, 0%, 25%)` on hover and keyboard focus.

## Narrow window

The stacked layout is in a `max-width: 375px` rule. A 360px window used it. The header grows to 350px and switches to `images/pattern-bg-mobile.png`. The card becomes one centered column, and the dividers between the columns go away. `UTC -07:00` and `Google LLC` each fit on one line. The placeholder is clipped by the arrow button. At a reported width of 375px, this browser still kept the desktop row.

![The stacked card at 360px](docs/screenshots/mobile.png)
