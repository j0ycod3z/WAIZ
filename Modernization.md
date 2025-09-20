# Modernizing wAiz

## 1. Node 18 setup process
- run this command in the terminal
```bash
npm uninstall node-sass node-sass-chokidar
npm install --save-dev sass
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
6. **react-router & react-router-dom**
   ```bash
   npm install --save-dev react-router@6 react-router-dom@6
   ```
   - migrate `<Switch>` to `<Routes>`
   - combine all routes to one file [App.js](src/components/app.js)
7. **redux & react-redux**
   ```bash
   npm install --save-dev redux@5 react-redux@9
   ```
8. **react & react-dom**
   ```bash
   npm install --save-dev react@18 react-dom@18
   ```
   - main react support for other packages