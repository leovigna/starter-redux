import { Pet, PetId } from './interface.js';

/** @internal */
export function validateId(item: PetId) {
    return item.id;
}

/** @internal */
export function validate(item: Pet): Pet {
    return item;
}
