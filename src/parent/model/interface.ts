export interface IdDeconstructed {
    readonly firstName: string;
    readonly lastName: string;
}
export type Id = string;

export interface Interface extends IdDeconstructed {
    readonly id?: Id;
    readonly age?: number;
}

export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;
    const { firstName, lastName } = id;

    return [firstName, lastName].join(SEPARATOR);
}
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [firstName, lastName] = id.split(SEPARATOR); //Assumes separator not messed up
    return { firstName, lastName };
}

export function validate(item: Interface): Interface {
    const id = getId(item);
    return {
        ...item,
        id,
    };
}

export default Interface;
