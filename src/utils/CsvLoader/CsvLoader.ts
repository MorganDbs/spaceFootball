import { sortBy } from 'lodash';
import Papa from 'papaparse';
import {
    Accessor,
    InitializedResource,
    Setter,
    createResource,
    createSignal,
} from 'solid-js';

export interface ICsvLoader {
    readonly rows: InitializedResource<Record<string, string | number>[]>;
    readonly columns: Accessor<string[]>;
}

export default class CsvLoader implements ICsvLoader {
    private readonly stringColumns: string[];

    private readonly path: string;

    private readonly sortingKey: string;

    public readonly rows: InitializedResource<
        Record<string, string | number>[]
    >;

    public readonly columns: Accessor<string[]>;

    private readonly setColumns: Setter<string[]>;

    constructor(path: string, stringColumns: string[], sortingKey: string) {
        this.path = path;
        this.stringColumns = stringColumns;
        this.sortingKey = sortingKey;

        [this.columns, this.setColumns] = createSignal<string[]>([]);
        [this.rows] = createResource(this.loadCsv.bind(this), {
            initialValue: [],
        });
        this.rows.loading;
    }

    private stringArrayToObjectArray(
        data: string[][],
        columns: string[]
    ): Record<string, string | number>[] {
        return sortBy(
            data.map((row) => {
                const objRow: Record<string, string | number> = {};
                columns.forEach(
                    (column, index) =>
                        (objRow[column] = this.stringColumns.includes(column)
                            ? row[index]
                            : +row[index])
                );
                return objRow;
            }),
            this.sortingKey
        );
    }

    private async loadCsv(): Promise<Record<string, string | number>[]> {
        // Simulate request making it slow to see animation
        return new Promise((r) => setTimeout(r, 1000)).then(
            () =>
                new Promise((resolve, reject) => {
                    Papa.parse<string[]>(this.path, {
                        download: true,
                        complete: (rows) => {
                            const newColumns = rows.data.shift() ?? [];
                            this.setColumns(newColumns);
                            resolve(
                                this.stringArrayToObjectArray(
                                    rows.data,
                                    newColumns
                                )
                            );
                        },
                        error(err) {
                            reject(err);
                        },
                    });
                })
        );
    }
}
