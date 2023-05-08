import DarkModeManager from './DarkModeManager';

const darkModeManagerSingleton = new DarkModeManager();
darkModeManagerSingleton.toggleDarkMode =
    darkModeManagerSingleton.toggleDarkMode.bind(darkModeManagerSingleton);

export default darkModeManagerSingleton;
