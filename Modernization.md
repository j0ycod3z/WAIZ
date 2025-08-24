# Modernizing wAiz

## 1. Check UI Components
### 1.1 Overview
**Job List:**
- Modernize methods
- App should be responsive
- In SCSS files, replace `@import` method to `@use`. Refer to [Deprecated Warning Fix](#121-scss---deprecated-warning-fix).
- Consolidate and clean SCSS files.
- Restructure react component declaration (Class &rarr; Function).

**All Component Folders**
- [x] Auth
- [ ] Canvas
- [ ] Canvas_forms
- [x] Chatbot
- [ ] Dashboard
- [x] Game changer funnel
- [x] Helpers
- [ ] Interviews
- [ ] Knowledge Base
- [x] Navigation
- [x] Project Admin
- [x] Projects
- [x] Search
- [ ] Users
- [x] Util

<br>

### 1.2 Key Dependency Updates
- react v17.0.2
  - svg
  - ga
  - ===
  - popup

all 3 @fortawesome packages may not be used

1. **chart.js & react-chartjs-2**
   ```bash
   npm install chart.js@^3.9.1 react-chartjs-2@3.3.0
   ```
   - major changes
2. **@material-ui/core**
   - migrate to @mui/material
   - install @mui/material
   ```bash
   npm uninstall @material-ui/core @material-ui/icons
   npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
   ```
   - UI component import changes
   - minor but tedious change
3. **react-router & react-router-dom**
   ```bash
   npm install react-router@6 react-router-dom@6
   ```
   - migrate `<Switch>` to `<Routes>`
   - combine all routes to one file [App.js](src/components/app.js)
4. **react & react-dom**
   ```bash
   npm install react@17 react-dom@17
   ```
   - main react support for other packages