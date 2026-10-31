# COVID-19 Chart Visualizer

[![Netlify Status](https://api.netlify.com/api/v1/badges/f056920f-36de-4201-8f59-7370f687834b/deploy-status)](https://app.netlify.com/projects/vis-covid19/deploys)

React page to visualize a timeline of the number of confirmed cases of COVID-19 across different countries.

Live at https://vis-covid19.netlify.app/

It uses the [data API](https://disease.sh/) provided by disease.sh.

## Stack
- React
- Bulma CSS
- ChartJS

## To run locally
1. Clone the repo
2. Install dependencies
```
$ yarn install
```
3. Run the app
```
$ yarn start
```

## Deployment
The app is deployed to [Netlify](https://app.netlify.com/projects/vis-covid19/deploys).

- Merging to `master` triggers a new production deploy to https://vis-covid19.netlify.app/
- Pull requests get a deploy preview
- Netlify runs `yarn build` with Node 18
- Netlify builds with `CI=true`, so any lint warning fails the build. Run `CI=true yarn build` locally to check before merging
