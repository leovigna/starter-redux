import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import selectByIdMany from '../selectors/selectByIdMany.js';

export function useByIdMany(id: Parameters<typeof selectByIdMany>[1]) {
    const selected = useSelector((state) => selectByIdMany(state, id));
    useDebugValue({ id, selected });
    return selected;
}

export default useByIdMany;
