import { IStoreTableBaseColumn, Shape } from '../../../../../front-components/src/lib/shared/models';

export enum ExampleRowItemField {
    example1 = 'example1',
    example2 = 'example2',
    example3 = 'example3',
    example4 = 'example4',
    example5 = 'example5',
    example6 = 'example6',
}

export const DEFAULT_COLS: IStoreTableBaseColumn[] = [
    {
        id: ExampleRowItemField.example1,
        title: '',
        order: 0,
        width: null,
        skeleton: {
            header: {
                width: '100px',
                height: '10px',
                type: Shape.Round
            },
            body: {
                width: '100px',
                height: '100px',
                type: Shape.Round
            }
        }
    },
    {
        id: ExampleRowItemField.example2,
        title: 'Порядок',
        order: 1,
        width: null,
        skeleton: {
            header: {
                width: '100px',
                height: '10px',
                type: Shape.Square
            },
            body: {
                width: '100px',
                height: '20px',
                type: Shape.Square
            }
        }
    },
    {
        id: ExampleRowItemField.example3,
        title: 'Изображение',
        order: 2,
        width: null,
        skeleton: {
            header: {
                width: '100px',
                height: '50px',
                type: Shape.Square
            },
            body: {
                width: '100px',
                height: '50px',
                type: Shape.Square
            }
        }
    },
    {
        id: ExampleRowItemField.example4,
        title: 'Баннер',
        order: 3,
        width: null,
        skeleton: {
            header: {
                width: '100px',
                height: '50px',
                type: Shape.Square
            },
            body: {
                width: '100px',
                height: '50px',
                type: Shape.Square
            }
        }
    },
    {
        id: ExampleRowItemField.example5,
        title: 'Статус',
        order: 4,
        width: null,
        skeleton: {
            header: {
                width: '100px',
                height: '50px',
                type: Shape.Square
            },
            body: {
                width: '100px',
                height: '50px',
                type: Shape.Square
            }
        }
    },
    {
        id: ExampleRowItemField.example6,
        title: 'Действие',
        order: 5,
        width: null,
        skeleton: {
            header: {
                width: '100px',
                height: '50px',
                type: Shape.Square
            },
            body: {
                width: '100px',
                height: '50px',
                type: Shape.Square
            }
        }
    }
]
