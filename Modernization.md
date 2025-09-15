# Modernizing wAiz
## 1. Integration Issues
  _*eto palang yung nahahanap ko na issues._
   - **Knowledge Base:** some YouTube videos are not rendering
   - **Dashboard:** Graph data for Hypothesis and Interviews are not showing
   - **Projects Admin:** Can't create a cohort in the front end. _(no code in the front end at all)_

## 2.  Check UI Components
### 2.1 Goal
- Update to React v18 (update to React v17 first)
### 2.2 Job List 
- Update/remove Dependencies
  - update methods under the dependencies
  - remove unused dependencies
- UI/UX Changes

### 2.3 Dependency to be Updated
#### Dependencies that may be unused _(can be removed)_
- jquery
- select
- react-svg
- react-popup
- react-ga
- react-css-modules
- react-transition-group
- styled-components
- yup
  
#### List of dependencies
1. **chart.js & react-chartjs-2**
   ```bash
   npm --save-dev install chart.js@4 react-chartjs-2@5
   ```
2. **@material-ui/core**
   - migrate to @mui/material
   ```bash
   npm uninstall @material-ui/core @material-ui/icons
   npm install --save-dev @mui/material @mui/icons-material @emotion/react @emotion/styled
   ```
   - UI component import changes
   - minor but tedious change
3. **formik**
   ```bash
   npm install --save-dev formik@2
   ```
   - check for newer methods
4. **react-csv**
   ```bash
   npm install --save-dev react-csv@2
   ```
   - check for newer methods
5. **react-youtube**
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
8.  **react & react-dom**
   ```bash
   npm install --save-dev react@17 react-dom@17
   ```
   - main react support for other packages