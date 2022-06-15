import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import selectByIdSingle from '../selectors/selectByIdSingle.js';

export function useByIdSingle(id: Parameters<typeof selectByIdSingle>[1]) {
    const selected = useSelector((state) => selectByIdSingle(state, id));
    useDebugValue({ id, selected });
    return selected;
}

export default useByIdSingle;
