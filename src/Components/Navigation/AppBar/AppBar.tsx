import { AppBar, IconButton, Toolbar, Typography } from '@suid/material';
import MenuIcon from '@suid/icons-material/Menu';
import Brightness4Icon from '@suid/icons-material/Brightness4';
import Brightness7Icon from '@suid/icons-material/Brightness7';
import drawerManagerSingleton from '../../../store/DrawerManager';
import './AppBar.less';
import darkModeManagerSingleton from '../../../store/DarkModeManager';

export default () => (
    <AppBar
        class={`app-bar app-bar-drawer-${
            drawerManagerSingleton.drawerOpen() ? 'open' : 'close'
        }`}
    >
        <Toolbar class="app-bar-top">
            <div class="app-bar-title">
                <IconButton
                    onClick={drawerManagerSingleton.toggleDrawer}
                    size="large"
                    edge="start"
                    class="burger-button"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="#fff">
                    Space Football
                </Typography>
            </div>
            <IconButton onClick={darkModeManagerSingleton.toggleDarkMode}>
                {darkModeManagerSingleton.mode() === 'dark' ? (
                    <Brightness7Icon />
                ) : (
                    <Brightness4Icon color="secondary" />
                )}
            </IconButton>
        </Toolbar>
    </AppBar>
);
