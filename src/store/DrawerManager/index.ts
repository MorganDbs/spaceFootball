import DrawerManager from './DrawerManager';

const drawerManagerSingleton = new DrawerManager();
drawerManagerSingleton.toggleDrawer = drawerManagerSingleton.toggleDrawer.bind(
    drawerManagerSingleton
);
drawerManagerSingleton.closeDrawer = drawerManagerSingleton.closeDrawer.bind(
    drawerManagerSingleton
);

export default drawerManagerSingleton;
