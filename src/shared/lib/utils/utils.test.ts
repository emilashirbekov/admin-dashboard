import { formatDate } from './utils';

test('formats ISO string to DD/MM/YYYY', ()=>{
    expect(formatDate('2023-12-01')).toBe('01/12/2023')
})