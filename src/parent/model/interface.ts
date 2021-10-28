export interface IdDeconstructed {
    readonly firstName: string;
    readonly lastName: string;
}
export type Id = string;

//Id args cannot be optional
export default interface Interface extends IdDeconstructed {
    readonly id: Id;
    readonly age?: number;
}

export interface InterfacePartialWithId extends Partial<Interface> {
    id: Id;
}

export interface InterfacePartialWithIdDeconstructed extends Partial<Interface> {
    firstName: IdDeconstructed['firstName'];
    lastName: IdDeconstructed['lastName'];
}
export type InterfacePartial = InterfacePartialWithId | InterfacePartialWithIdDeconstructed;
export function isPartialWithId(x: InterfacePartial): x is InterfacePartialWithId {
    return !!x.id;
}
export function isPartialWithIdDeconstructed(x: InterfacePartial): x is InterfacePartialWithIdDeconstructed {
    return !x.id;
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

export function validate(item: InterfacePartial): Interface {
    if (isPartialWithIdDeconstructed(item)) {
        const id = getId({ ...(item as InterfacePartialWithIdDeconstructed) });
        return {
            ...item,
            id,
        };
    } else {
        const { firstName, lastName } = getIdDeconstructed(item.id);
        return {
            ...item,
            firstName,
            lastName,
        };
    }
}
