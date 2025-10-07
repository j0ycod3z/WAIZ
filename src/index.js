import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MuiTheme } from 'settings/MuiTheme';
import { BrowserRouter, Route } from 'react-router-dom'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Popup from 'react-popup';

import App from 'components/App';
import Worker from 'settings/bin/Worker';
import Store from 'settings/bin/Store';

import 'index.css';

const store = Store();
const muiTheme = MuiTheme();

ReactDOM.render(
    <Provider store={store}>    
        <ThemeProvider theme={muiTheme}>    
            <DndProvider backend={HTML5Backend}>
                <Popup />
                <BrowserRouter>
                    <Route path='/' component={App} />
                </BrowserRouter>
            </DndProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
Worker();