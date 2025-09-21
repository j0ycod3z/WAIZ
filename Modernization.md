# Modernizing wAiz

## 1. Node 18 setup process
- run this command in the terminal
```bash
npm uninstall node-sass node-sass-chokidar
npm install --save-dev sass
npm install --save-dev react@16 react-dom@16
npm install --save-dev react-dnd@16 react-dnd-html5-backend@16
```
**SCSS - Deprecated Warning Fix**
- replace all imports in all scss files
```scss
@use "src/resources/base" as base;
@use "src/resources/layout" as layout;
@use "src/resources/forms" as forms;
```
- Make necessary changes in.
```scss
// Before
@include fonts();
@include border-radius(20px);
background-color: $green;

// After
@include base.fonts();
@include base.border-radius(20px);
background-color: base.$green;
```

### 1.1 Modernization done in node 18
- converting components declarations (class &rarr; function)
- fixing UI styles that are breaking
- consolidating global styles

## 2. Integration Issues (Node 20 env)
_*eto palang yung nahahanap ko na issues._
  - **Knowledge Base:** some YouTube videos are not rendering
  - **Dashboard:** Graph data for Hypothesis and Interviews are not showing
  - **Dashboard:** Remove old insdustry data
  - **Projects Admin:** Can't create a cohort in the front end. _(no code in the front end at all)_
  - **(FIXED) Canvas:** Weekly filter not working

## 3.  Check UI Components
### 3.1 Goal
- Update to React v18
### 3.2 Job List 
- Update/remove Dependencies
  - update methods under the dependencies
  - remove unused dependencies
- UI/UX Changes

### 3.3 Dependency to be Updated
#### Dependencies that may be unused _(can be removed)_
- [x] select
- [x] react-svg
- [x] react-popup
- [x] react-ga
- [x] react-css-modules
- [x] react-transition-group
- [x] react-bootstrap
- [x] styled-components
- [x] yup

#### List of dependencies to be updated
1. **chart.js & react-chartjs-2 (DONE)**
   ```bash
   npm install --save-dev chart.js@4 react-chartjs-2@5
   "chart.js": "^3.9.1",
   "react-chartjs-2": "^3.3.0",
   ```
2. **@mui/material (DONE)**
   - migrate to @mui/material
   ```bash
   npm uninstall @mui/material @material-ui/icons
   npm install --save-dev @mui/material @mui/icons-material @mui/lab @emotion/react @emotion/styled
   ```
   - UI component import changes
   - minor but tedious change
3. **formik (DONE)**
   ```bash
   npm install --save-dev formik@2
   ```
   - check for newer methods
4. **react-csv (DONE)**
   ```bash
   npm install --save-dev react-csv@2
   ```
   - check for newer methods
5. **react-youtube (DONE)**
   ```bash
   npm install --save-dev react-youtube@10
   ```
   - check for newer methods
6. **redux, redux-thunk, & react-redux**
   ```bash
   npm install --save-dev redux@5 redux-thunk@3 react-redux@9
   ```
7. **react-router & react-router-dom**
   ```bash
   npm install --save-dev react-router@6 react-router-dom@6
   ```
   - migrate `<Switch>` to `<Routes>`
   - combine all routes to [App.js](src/components/app.js)
8. **react & react-dom**
   ```bash
   npm install --save-dev react@18 react-dom@18
   ```
   - main react support for other packages

Package Name | Current | Target | Status
-|-|-|-|
body-parser      | 1.20.3 |  2.2.0 | Done
express          | 4.21.2 |  5.1.0 | Done
file-saver       |  2.0.2 |  2.0.5 | Done
log              |  6.0.0 |  6.3.2 | Done
cross-fetch      |  3.2.0 |  4.1.0 | Done
redux            |  4.0.4 |  5.0.1 | Replace deprecated method
redux-thunk      |  2.3.0 |  3.1.0 | Done
react-redux      |  8.1.3 |  9.2.0 | Reactv18 required
react-router     |  5.3.4 |  7.9.1 | v6 first
react-router-dom |  5.3.4 |  7.9.1 | v6 first
react            | 17.0.2 | 19.1.1 | pending react-router/dom@6
react-dom        | 17.0.2 | 19.1.1 | pending react-router/dom@6

commit text: partial fix on redux dependencies; formik method fix

- Removed dependencies
  - react-bootstrap
  - react-scripts-cssmodules
  - serve-favicon
- Updated dependencies
  - react-csv
  - react-youtube
  - jquery
  - formik

- Removed dependencies
  - @material-ui/core
  - reactour
  - extract-text-webpack-plugin
- Added dependencies
  - @emotion/react
  - @emotion/styled
  - @mui/icons-material
  - @mui/lab
  - @mui/material
  - @reactour/tour
- Updated dependencies
  - body-parser
  - react-select
  - cross-fetch
  - morgan
  - debug

browserify-zlib@0.2.0
path-browserify@1.0.1
querystring-es3@0.2.1

- Removed
  - extract-text-webpack-plugin
  - browserify-zlib
  - path-browserify
  - querystring-es3
- Updated
  - body-parser
  - file-saver
  - log