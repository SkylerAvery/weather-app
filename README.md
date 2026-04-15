# Weather App Submission for FMG - Skyler

This application will be using Next.js to create a Weather Forecasting webapp.

## Setup Instructions

```
npm install

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architectural Decisions

Aside from Next.js being the core constraint for this project, I intend to use the following tooling
- Tailwind CSS: Personal preference, I find the Tailwind approach to styling avoids unnesasary styling files that could lead to overrides or poor CSS standards
- Jest and React Testing Library: I would like to right some tests to capture responses from the API and handle error states correctly. Jest and RTL I will use for this test, however if I had more time I would like to include Playwright testing too for end to end testing

I will structure any global components inside a `/components` folder. Everything else will be related to the route that is consuming the component. If the scope of this project is due to change however, I would extract these into an atomic, molecule, organism structure of components.

## Deployment

I've deployed this application to [https://weather-app-green-nine-56.vercel.app/](https://weather-app-green-nine-56.vercel.app/).
This is synced in Vercel that any commit to main will redeploy the application