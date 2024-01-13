# friends of cranebot webring

![signature](https://img.shields.io/badge/crane%20did%20this-926cd4?style=for-the-badge)
![cf pages](https://img.shields.io/badge/made%20with%20cloudflare%20pages-fff?style=for-the-badge&logo=cloudflarepages)


## links

- [what is a webring?](https://en.wikipedia.org/wiki/Webring)
- [cloudflare pages documentation](https://developers.cloudflare.com/pages)
- [live site](https://friends-of-cranebot.pages.dev/)
- [random member's page](https://friends-of-cranebot.pages.dev/api/random/)


## about

the friends of cranebot webring is a humble little webring for the friends of my discord bot, cranebot.

there is no criteria for sites on webring to adhere to -- the basic rules of respect apply, but are not a concern when this webring is between personal friends. all sites are loosely related by similar interests, but this webring is primarily a way for us to feel connected and to promote and support one anothers' sites.

> this readme contains some general notes on its structure, and how to develop with this code.


## cloudflare pages

this site exists on cloudflare's pages hosting service. the following are a few quick reminders on how to use cloudflare's wrangler to deploy, develop, and debug the site.

to deploy update, from project root:
```
npm run deploy
```

to launch local test server:
```
npm run dev
```

to connect to live production logging: 
```
npm run tail
```


## site structure

this [pseudo]static site has a basic structure:

```
root/
├─ functions/
│  ├─ api/
│  │  └─ { api endpoints... }
│  ├─ tsconfig.json
│  ├─ _middleware.ts
│  └─ _routes.json
├─ node modules/
│  └─  { node modules, of course... }
├─ src/
│  ├─ assets/
│  │  ├─ css/
│  │  ├─ images/
│  │  ├─ js/
│  │  ├─ ts/
│  │  └─ favicon.ico
│  ├─ { html pages... }
│  └─ _redirects
├─ package-lock.json
├─ package.json
├─ readme.md
└─ tsconfig.json
```

this project's structure is built specifically for cloudflare pages' framework, and determines the live site's routing. the `src/assets` folder contains all traditionally-static site assets [css, images, js + ts].

> files such as `functions/tsconfig.json` `functions/_middleware.ts`, `functions/_routes.json`, `src/_redirects` lend to features of cloudflare pages and can be explained by [the pages and pages functions documentation](https://developers.cloudflare.com/pages/platform/functions/).   

> files and folders associated with nodejs -- `node_modules`, `package-lock.json`, `package.json`, `root/tsconfig.json` -- may be disregarded.

**important**: when compiling typescript, it is important to only compile the contents of `src/assets/ts/`, outputting them to `src/assets/js/`. the contents of `functions` are handled by cloudflare pages and compiled automatically on deployment.


## node modules

this project uses two modules:

- typescript
- cloudflare wrangler
