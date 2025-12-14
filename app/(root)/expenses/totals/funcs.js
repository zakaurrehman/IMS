import { NumericFormat } from "react-number-format";
import dateFormat from "dateformat";


export const expensesToolTip = (row, expensesData, settings, filt) => {

    let filteredArr = filt === 'reduced' ? expensesData.filter(z => z.paid === '222') : expensesData;
    filteredArr = filteredArr.filter(z => (z.supplier === row.original.supplier && z.cur === row.original.cur))

    return (

        <div className="bg-[var(--selago)] max-h-[32rem] overflow-y-auto w-fit rounded-lg shadow-lg">
            <table>
                <thead>
                    <tr className="bg-gradient-to-r from-[var(--endeavour)] to-[var(--chathams-blue)]">
                        <th className="text-left p-2 text-white text-sm font-semibold">PO#</th>
                        {/* <th className="text-left p-2">Supplier</th> */}
                        <th className="text-left p-2 text-white text-sm font-semibold">Expense Invoice</th>
                        <th className="text-left p-2 text-white text-sm font-semibold">Expense Type</th>
                        <th className="text-left p-2 text-white text-sm font-semibold">Amount</th>
                        <th className="text-left p-2 text-white text-sm font-semibold">Date</th>
                        <th className="text-left p-2 text-white text-sm font-semibold">Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArr.map((z, i) => {
                        return (
                            <tr className="border-b border-[var(--rock-blue)]/30 hover:bg-[var(--rock-blue)]/20 transition-colors" key={i}>
                                <td className="text-left p-2 text-[var(--port-gore)]">{z.poSupplier?.order ?? 'Comp. Exp.'}</td>
                                {/* <td className="text-left p-2">{settings.Supplier.Supplier.find(q => q.id === z.supplier)?.nname}</td> */}
                                <td className="text-left p-2 text-[var(--port-gore)]" >{z.expense}</td>
                                <td className="text-left p-2 text-[var(--port-gore)]" >{settings.Expenses.Expenses.find(q => q.id === z.expType)?.expType}</td>
                                <td className="text-left p-2">{
                                    <NumericFormat
                                        value={z.amount}
                                        displayType="text"
                                        thousandSeparator
                                        allowNegative={true}
                                        prefix={z.cur === 'us' ? '$' : '€'}
                                        decimalScale='3'
                                        fixedDecimalScale
                                        className='text-[0.8rem]'
                                    />
                                }</td>
                                <td className="text-left p-2 text-[var(--port-gore)]">
                                    {dateFormat(z.date, 'dd-mmm-yy')}
                                </td>
                                <td className="text-left p-2 text-[var(--port-gore)]">
                                    {z.paid === '111' ? 'Paid' : 'Unpaid'}
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}
