This project provides ability to create status pages for [Cronitor](https://Cronitor.io/) which is a monitoring system.


## Demo
Checkout our live demo [here](https://cronitor-statuspage.vercel.app).

## Getting Started

First, create a [Cronitor](https://cronitor.io/signup) account and setup your monitors. [Read cronitor guides](https://cronitor.io/docs/guides)

Then in your Cronitor dashboard go to Settings and look for [API](https://cronitor.io/app/settings/api) section. There you can find your API keys which we're gonna use to setup your status page. Copy your API key!

Clone this project: 

```bash
git clone https://github.com/thevahidal/cronitor-statuspage.git
```

Duplicate ```.env_``` and rename it to ```.env```, then fill the placeholder variables with your own:

```bash
cp .env_ .env
nano .env
```

That's it, your status page is ready!

## Deploy on Vercel

The easiest way to deploy your status page is to use the [Vercel Platform](https://vercel.com/new).

