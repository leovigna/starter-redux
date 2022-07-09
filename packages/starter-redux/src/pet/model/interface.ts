export interface PetId {
    id: string;
}
export interface Pet extends PetId {
    name: string;
    age: number;
    type: 'dog' | 'cat';
}

export const PetIndex = '++id, name, age, type';
