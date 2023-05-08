import { Breakpoint, Theme, createTheme } from '@suid/material';
import { Accessor, Setter, createMemo, createSignal } from 'solid-js';

interface IDarkModeManager {
    readonly mode: Accessor<'light' | 'dark'>;
    readonly theme: Accessor<Theme<Breakpoint>>;
    toggleDarkMode(): void;
}

export default class DarkModeManager implements IDarkModeManager {
    public readonly mode: Accessor<'light' | 'dark'>;

    private readonly setMode: Setter<'light' | 'dark'>;

    public readonly theme: Accessor<Theme<Breakpoint>>;

    constructor() {
        [this.mode, this.setMode] = createSignal<'light' | 'dark'>('light');

        this.theme = createMemo(
            () =>
                createTheme({
                    palette: {
                        primary: {
                            main:
                                this.mode() === 'light' ? '#171f69' : '#3cc2d2',
                        },
                        secondary: { main: '#3cc2d2' },
                        mode: this.mode(),
                        background: {
                            default:
                                this.mode() === 'light' ? '#F0F0F0' : '#1e1e1e',
                        },
                    },
                }),
            [this.mode()]
        );
    }

    public toggleDarkMode(): void {
        if (this.mode() === 'light') {
            this.setMode('dark');
        } else {
            this.setMode('light');
        }
    }
}
