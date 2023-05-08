import { Match, Switch, render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { ThemeProvider } from '@suid/material';
import App from './App';
import './index.less';
import darkModeManagerSingleton from './store/DarkModeManager';

const root = document.getElementById('root');

render(
    () => (
        <Router>
            <Switch>
                <Match when={darkModeManagerSingleton.mode() === 'light'}>
                    <ThemeProvider theme={darkModeManagerSingleton.theme()}>
                        <App />
                    </ThemeProvider>
                </Match>

                <Match when={darkModeManagerSingleton.mode() === 'dark'}>
                    <ThemeProvider theme={darkModeManagerSingleton.theme()}>
                        <App />
                    </ThemeProvider>
                </Match>
            </Switch>
        </Router>
    ),
    root!
);
