import { Route, Routes } from '@solidjs/router';
import { Box, Paper } from '@suid/material';
import Home from './Pages/Home';
import Players from './Pages/Players';
import Navigation from './Components/Navigation';
import drawerManagerSingleton from './store/DrawerManager';
import './App.less';

export default () => (
    <Box class="app" sx={{ bgcolor: 'background.default' }}>
        <Navigation />

        <div
            class={`main main-drawer-${
                drawerManagerSingleton.drawerOpen() ? 'open' : 'close'
            }`}
        >
            <Box class="content" sx={{ bgcolor: 'background.paper' }}>
                <Routes>
                    <Route path="/" component={Home} />
                    <Route path="/players" component={Players} />
                </Routes>
            </Box>
        </div>
    </Box>
);
