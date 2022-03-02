

# nbkparks-community
# https://nbkparks.org/ @nbkparks/\*

<img src="https://github.com/SamuelWitke/North-Brooklyn-Garden-Bike-Tour/blob/main/apps/nbkparks-bike-tour/src/assets/nbkparks.jpg?raw=true" align="left" width="160px" height="160px"/>
<img align="left" width="0" height="162px" hspace="10"/>

[![Build and Deploy](https://github.com/SamuelWitke/nbkparks-community/actions/workflows/main.yml/badge.svg)](https://github.com/SamuelWitke/nbkparks-community/actions/workflows/main.yml)
[![Public Domain](https://img.shields.io/badge/public-domain-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
-----
Our mission is to create an equitable, accessible, and vibrant parks & open space system in North Brooklyn.
---

<a target="_blank" href="https://calendar.google.com/event?tmeid=NmFxMmg3aHVkdmQ4OWoya2l2MHAyZHRqNzcgd2l0a2VzYW1AbQ&amp;tmsrc=witkesam%40gmail.com"><img border="0" src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"></a>


This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
