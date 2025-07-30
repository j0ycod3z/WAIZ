# Modernizing wAiz

## 1. Check UI Components
### 1.1 Overview
**Job List:**
- Modernize methods
- App should be responsive
- In SCSS files, replace `@import` method to `@use`. Refer to [Deprecated Warning Fix](#121-scss---deprecated-warning-fix).
- Consolidate and clean SCSS files.
- Restructure react component declaration (Class &rarr; Function).

**Component folders to be checked this week**
- [ ] Interviews
- [ ] Knowledge Base
- [ ] Navigation

**All Component Folders**
- [x] Auth
- [x] Canvas
- [x] Canvas_forms
- [x] Chatbot
- [ ] Dashboard
- [x] Game changer funnel
- [x] Helpers
- [ ] Interviews
- [ ] Knowledge Base
- [ ] Navigation
- [ ] Project Admin
- [ ] Projects
- [ ] Search
- [ ] Users
- [ ] Util

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

### 1.2 Needed Changes
#### 1.2.1 SCSS - Deprecated Warning Fix
- replace all imports in all scss files to:
```scss
// Example
@use '[filepath]' as [variable_name];

// Use case
@use "src/resources/base" as base;
@use "src/resources/layout" as layout;
@use "src/resources/forms" as forms;
```
- Make necessary changes.
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