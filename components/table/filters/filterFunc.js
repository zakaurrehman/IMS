import React, { useEffect, useState } from "react";


export const Filter = ({ column, table, filterOn }) => {
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = column.columnDef.meta || {};

    return filterOn &&
        (filterVariant === 'range' ? (
            <div>
                <div className="flex space-x-2">

                    <DebouncedInput
                        type="number"
                        value={(columnFilterValue?.[0] ?? '')}
                        onChange={value =>
                            column.setFilterValue(old => [value, old?.[1]])
                        }
                        placeholder={`Min`}
                        className="border shadow rounded w-full max-w-[90px]"
                    />
                    <DebouncedInput
                        type="number"
                        value={(columnFilterValue?.[1] ?? '')}
                        onChange={value =>
                            column.setFilterValue(old => [old?.[0], value])
                        }
                        placeholder={`Max`}
                        className="border shadow rounded w-full max-w-[90px]"
                    />
                </div>
            </div>
        ) : filterVariant === 'selectClient' ? (
            <select
                onChange={e => column.setFilterValue(e.target.value)}
                value={columnFilterValue?.toString()}
                className='text-xs shadow-lg 
            border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] w-full max-w-[160px] text-[var(--port-gore)] appearance-none leading-5'
            >
                <option value="">All</option>
                {
                    [...new Set(table.options.data.map(x => x.client).filter(z => z !== ''))].map(q => {
                        return <option value={q} key={q}>{q}</option>
                    })
                }
            </select>
        ) : filterVariant === 'selectSupplier' ? (
            <select
                onChange={e => column.setFilterValue(e.target.value)}
                value={columnFilterValue?.toString()}
                className='text-xs shadow-lg 
            border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] w-full max-w-[160px] text-[var(--port-gore)] appearance-none leading-5'
            >
                <option value="">All</option>
                {
                    [...new Set(table.options.data.map(x => x.supplier).filter(z => z !== ''))].map(q => {
                        return <option value={q} key={q}>{q}</option>
                    })
                }
            </select>
        ) : filterVariant === 'selectStock' ? (
            <select
                onChange={e => column.setFilterValue(e.target.value)}
                value={columnFilterValue?.toString()}
                className='text-xs shadow-lg 
            border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] w-full max-w-[160px] text-[var(--port-gore)] appearance-none leading-5'
            >
                <option value="">All</option>
                {
                    [...new Set(table.options.data.map(x => x.stock).filter(z => z !== ''))].map(q => {
                        return <option value={q} key={q}>{q}</option>
                    })
                }
            </select>
        ) : filterVariant === 'selectStockType' ? (
            <select
                onChange={e => column.setFilterValue(e.target.value)}
                value={columnFilterValue?.toString()}
                className='text-xs shadow-lg 
            border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] w-full max-w-[160px] text-[var(--port-gore)] appearance-none leading-5'
            >
                <option value="">All</option>
                {
                    [...new Set(table.options.data.map(x => x.sType).filter(z => z !== ''))].map(q => {
                        return <option value={q} key={q}>{q}</option>
                    })
                }
            </select>
        ) :
        filterVariant === 'paidNotPaidExp' ? (
            <select
                onChange={e => column.setFilterValue(e.target.value)}
                value={columnFilterValue?.toString()}
                className='text-xs shadow-lg 
            border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] w-full max-w-[160px] text-[var(--port-gore)]'
            >
                <option value="">All</option>
                {
                    [...new Set(table.options.data.map(x => x.paid).filter(z => z !== ''))].map(q => {
                        return <option value={q} key={q}>{q}</option>
                    })
                }
            </select>
        ):
        filterVariant === 'paidNotPaid' ? (
            <select
                onChange={e => column.setFilterValue(e.target.value)}
                value={columnFilterValue?.toString()}
                className='text-xs shadow-lg 
            border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] w-24 text-[var(--port-gore)]'
            >
                <option value="">All</option>
                {
                    [...new Set(table.options.data.map(x => x.paidNotPaid).filter(z => z !== ''))].map(q => {
                        return <option value={q} key={q}>{q}</option>
                    })
                }
            </select>
        ):
            filterVariant === 'dates' ? (

                <div className="flex space-x-2">
                    <input
                        type="date"
                        value={columnFilterValue?.[0] || ''}
                        onChange={e => {
                            column.setFilterValue(old => {
                                return [
                                    e.target.value,
                                    old ? old[1] : undefined,
                                ];
                            });

                        }}
                        className='text-xs shadow-lg 
                        border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] w-full max-w-[140px] text-[var(--port-gore)] appearance-none leading-5'
                        max={columnFilterValue?.[1] || ''}
                    />
                    <span className="flex items-center text-[var(--regent-gray)]">-</span>
                    <input
                        type="date"
                        value={columnFilterValue?.[1] || ''}
                        onChange={e => {
                            column.setFilterValue(old => {
                                return [
                                    old ? old[0] : undefined,
                                    e.target.value,
                                ];
                            });

                        }}
                        min={columnFilterValue?.[0] || ''}
                        className='text-xs shadow-lg 
                    border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] w-full max-w-[140px] text-[var(--port-gore)] appearance-none leading-5'
                    />
                </div>
            ) : (
                <DebouncedInput
                    className="w-full max-w-[180px] border shadow rounded"
                    onChange={value => column.setFilterValue(value)}
                    placeholder={`Search...`}
                    type="text"
                    value={(columnFilterValue ?? '')}
                />
                // See faceted column filters example for datalist search suggestions
            ));

}





const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    type,
    ...props
}) => {

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)}
            className={`text-xs shadow-lg 
        border rounded-lg border-[var(--rock-blue)]/50 p-1 focus:outline-0 focus:border-[var(--endeavour)] 
        indent-0.2 text-[var(--port-gore)] ${type === 'number' ? 'w-full max-w-[90px]' : 'w-full max-w-[160px]'}`} />
    );
}
