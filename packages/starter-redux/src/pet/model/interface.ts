export interface Pet {
    id?: number;
    name: string;
    age: number;
    type: 'dog' | 'cat';
}

export const PetIndex = '++id, name, age, type';
