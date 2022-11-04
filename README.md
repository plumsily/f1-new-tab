<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/plumsily/f1-new-tab">🏎️
  </a>

<h3 align="center">F1 New Tab Page for Google Chrome</h3>

  <p align="center">
    This Chrome extension will replace the default new tab page with one that displays current Formula 1 race information as well as providing wallpaper quality images of each circuit.
    <br />
    <br />
    <a href="https://plumsily.github.io/f1-new-tab/"><strong>View it live here!</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="src/screenshots/f1-screenshot10.png">

This app was inspired by various other Chrome new tab replacers that display aesthetic backgrounds. Additionally, I wanted to serve relevant info related to F1 races at a quick glance. The combination of those motivations resulted in a page that automatically displays the next upcoming race on the schedule. Race info is obtained via the Ergast Developer API. Features include:

- Countdown to upcoming races
- Several wallpaper quality backgrounds
- Track layout map
- Practice, qualifying, and race times adjusted to local time
- Historical records like the previous race winner and fastest lap time
- History bar to access all rounds of the season

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- React
- Tailwind
- Firebase

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Pertinent info is displayed at the center of the page. This includes the name of the race, name of the circuit, date, and (if applicable) countdown until the race date.

<img src="src/screenshots/f1-screenshot5.png" width="600">
<br>

For the nearest upcoming race, within one week, the title will change accordingly.

<img src="src/screenshots/f1-screenshot4.png" width="600">
<br>

For upcoming races, local schedule times will be displayed at the bottom left along with historical records like previous race winner and fastest lap times.

<img src="src/screenshots/f1-screenshot2.png" width="600">
<br>

For all races, the track layout map will be displayed at the bottom right. Here all turn numbers and DRS zones are shown.

<img src="src/screenshots/f1-screenshot3.png" width="600">
<br>

To access other races like past races of the season, a history bar on the bottom center of the page allows access to all rounds. Currently displayed race is indicated by a red pill. The next upcoming race is indicated by a green pill when not displayed. At the end of the season, the race shuffle button will be selected by default.

<img src="src/screenshots/f1-screenshot6.png" width="600">

<img src="src/screenshots/f1-screenshot7.png" width="600">

<img src="src/screenshots/f1-screenshot9.png" width="600">
<br>

For past races, only the current race winner and fastest lap time will be shown.

<img src="src/screenshots/f1-screenshot8.png" width="600">

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] 2022 race schedule info and track layout
  - [x] Background wallpaper shuffling
  - [x] Countdown for next upcoming race
  - [x] Automatic display of next upcoming race info
- [x] History bar to access past races of the season
  - [x] Shuffling button
    - [x] Active by default at end of season to cycle all races
- [ ] Chrome extension store approval
- [ ] 2023 race schedule assets for Firebase

See the [open issues](https://github.com/plumsily/f1-new-tab/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

<a href="http://ergast.com/mrd/">Ergast Developer API</a> for F1 records.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Justin Lee - [@plumsily](https://twitter.com/plumsily)

Project Link: [https://github.com/plumsily/f1-new-tab](https://github.com/plumsily/f1-new-tab)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
