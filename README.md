## CAS - Dashboard

![license](https://img.shields.io/badge/license-MIT-blue.svg)

> Dashboard for CAS server made with React and material UI

## Quick start (local)

- [Download from Github](https://github.com/elPeroN/CAS-dashboard/archive/master.zip) or clone the repo: `git clone https://github.com/elPeroN/CAS-dashboard`
- Make sure your NodeJS and npm versions are up to date for `React 16.8.6`
- Install dependencies: `npm install` or `yarn`
- Start the Mongo-db:	`sudo service mongod start ` or `yarn db`
- Start the server CAS-BACKEND(if main directory of innometrics-backend is at same level of CAS-dash you can run `yarn server`)
- Start the server: `npm run start` or `yarn start`
- Views are on: `localhost:3000`

## Quick start (docker)
- Install docker and docker-compose
- `docker-compose up --build`
- Views are on: `localhost:9010`

## File Structure

Within the download you'll find the following directories and files:

```
.
├── CHANGELOG.md
├── docker-compose.yml
├── Dockerfile
├── LICENSE.md
├── jsconfig.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── _redirects
│   └── static
│       ├── images
│       │   ├── plugins
│       │   │   ├── atom.png
│       │   │   ├── eclipse.png
│       │   │   └── idea.png
│       │   └── undraw_resume_folder_2_arse.svg
│       └── logo.svg
├── README.md
├── src
│   ├── App.js
│   ├── assets
│   │   ├── icons
│   │   │   ├── BugzillaIcon.js
│   │   │   ├── GitlabIcon.js
│   │   │   ├── JenkinsIcon.js
│   │   │   ├── MattermostIcon.js
│   │   │   ├── mattermost.png
│   │   │   ├── SonarQube.js
│   │   │   └── TaigaIcon.js
│   │   └── logo.png
│   ├── components
│   │   ├── AuthPage.js
│   │   ├── DashPage.js
│   │   ├── Logo.js
│   │   ├── SelectedMenu.js
│   │   ├── SimpleBackdrop.js
│   │   └── SimpleSnackBar.js
│   ├── index.js
│   ├── redux
│   │   ├── actions
│   │   │   ├── App
│   │   │   │   └── appActions.js
│   │   │   ├── Gitlab
│   │   │   │   ├── gitlabActions.js
│   │   │   │   └── gitlabCreator.js
│   │   │   ├── Logger
│   │   │   │   ├── loggerActions.js
│   │   │   │   └── loggerCreator.js
│   │   │   ├── Mattermost
│   │   │   │   ├── mattermostActions.js
│   │   │   │   ├── mattermostCreator.js
│   │   │   │   └── Readme.md
│   │   │   ├── Sonar
│   │   │   │   ├── actions.js
│   │   │   │   └── creator.js
│   │   │   └── Taiga
│   │   │       ├── actions.js
│   │   │       └── creator.js
│   │   ├── constants
│   │   │   └── action-types.js
│   │   ├── reducers
│   │   │   ├── appReducer.js
│   │   │   ├── gitlabReducer.js
│   │   │   ├── loggerReducer.js
│   │   │   ├── mattermostReducer.js
│   │   │   ├── reducers.js
│   │   │   ├── sonar-reducer.js
│   │   │   └── taiga-reducer.js
│   │   └── store
│   │       ├── store.js
│   │       └── utils.js
│   ├── services
│   │   ├── activities.js
│   │   ├── auth.js
│   │   ├── config.js
│   │   ├── config.js.bak
│   │   ├── gitlab.js
│   │   ├── mattermost.js
│   │   ├── sonar.js
│   │   └── taiga.js
│   ├── serviceWorker.js
│   ├── theme
│   │   ├── colors.js
│   │   ├── shadows.js
│   │   ├── theme.js
│   │   └── typography.js
│   └── views
│       ├── auth
│       │   ├── LoginView.js
│       │   └── RegisterView.js
│       ├── DashboardLayout
│       │   ├── DashboardLayout.js
│       │   ├── NavBar
│       │   │   ├── NavBar.js
│       │   │   └── NavItem.js
│       │   └── TopBar
│       │       ├── SimpleTopBar.js
│       │       └── TopBar.js
│       ├── errors
│       │   └── NotFoundView.js
│       ├── gitlab
│       │   ├── assets
│       │   │   ├── datasets.js
│       │   │   └── utils.js
│       │   ├── Devel.js
│       │   ├── DevelPieChart.js
│       │   ├── GitlabDash.js
│       │   ├── GitlabLogin.js
│       │   ├── GitlabPage.js
│       │   ├── Help.js
│       │   ├── NoRepositoryFound.js
│       │   └── Recap.js
│       ├── logger
│       │   ├── assets
│       │   │   ├── datasets.js
│       │   │   └── utils.js
│       │   ├── DatePicker.js
│       │   ├── Files.js
│       │   ├── Logger.js
│       │   ├── Metrics.js
│       │   ├── PieChart.js
│       │   ├── Plugins.js
│       │   └── Stats.js
│       ├── mattermost
│       │   ├── MattermostDialog.js
│       │   ├── Mattermost.js
│       │   ├── MattermostLogin.js
│       │   └── Threads.js
│       ├── sonar
│       │   ├── assets
│       │   │   └── utils.js
│       │   ├── Recap.js
│       │   ├── SonarDash.js
│       │   ├── SonarLogin.js
│       │   └── SonarPage.js
│       └── taiga
│           ├── assets
│           │   ├── datasets.js
│           │   └── utils.js
│           ├── BarChart.js
│           ├── Recap.js
│           ├── StoriesPieChart.js
│           ├── TaigaDash.js
│           ├── TaigaLogin.js
│           ├── TaigaPage.js
│           ├── UserDetail.js
│           └── UserStats.js
├── yarn-error.log
└── yarn.lock

```

## Reporting Issues:

- [Github Issues Page](https://github.com/elPeroN/CAS-dashboard/issues)

## License

- Licensed under MIT ()

## Contact Us

- Email Us:
	- stefano.propato@gmail.com
	- perrisalvatore95@gmail.com
