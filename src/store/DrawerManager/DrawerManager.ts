import { Accessor, createSignal, Setter } from 'solid-js';

export interface IDrawerManager {
    drawerOpen: Accessor<boolean>;
    toggleDrawer(): void;
    closeDrawer(): void;
}

export default class NavigationManager implements IDrawerManager {
    public drawerOpen: Accessor<boolean>;

    private setDrawerOpen: Setter<boolean>;

    constructor() {
        [this.drawerOpen, this.setDrawerOpen] = createSignal<boolean>(false);
    }

    public toggleDrawer(): void {
        this.setDrawerOpen((prevDrawerOpen: boolean) => !prevDrawerOpen);
    }

    public closeDrawer(): void {
        this.setDrawerOpen(false);
    }
}
