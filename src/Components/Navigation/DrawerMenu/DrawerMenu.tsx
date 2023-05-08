import PeopleIcon from '@suid/icons-material/People';
import HomeIcon from '@suid/icons-material/Home';
import {
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@suid/material';
import { useNavigate } from '@solidjs/router';
import './DrawerMenu.less';
import drawerManagerSingleton from '../../../store/DrawerManager';

export default () => {
    const navigate = useNavigate();

    const navigateTo = (url: string): void => {
        navigate(url);
    };

    return (
        <Drawer
            class="drawer-menu"
            variant="persistent"
            anchor="left"
            open={drawerManagerSingleton.drawerOpen()}
        >
            <div class="drawer-menu-items">
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigateTo('/')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigateTo('/players')}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Players" />
                    </ListItemButton>
                </ListItem>
            </div>
        </Drawer>
    );
};
