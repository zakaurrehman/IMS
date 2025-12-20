import { NumericFormat } from "react-number-format";
import dateFormat from "dateformat";


export const expensesToolTip = (row, expensesData, settings, filt) => {

    let filteredArr = filt === 'reduced' ?
        expensesData.filter(z => (z.paidNotPaid === 'Not Paid' && z.supplier === row.original.supplier && z.cur === row.original.cur)) :
        expensesData.filter(z => (z.supplier === row.original.supplier && z.cur === row.original.cur))

    return (

        <div className="bg-[var(--selago)] max-h-[32rem] overflow-y-auto w-fit rounded-lg">
            <table>
                <thead>
                    <tr className="border border-[var(--rock-blue)] p-2 bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
                        <th className="text-left p-2 text-white">PO#</th>
                        {/* <th className="text-left p-2">Supplier</th> */}
                        <th className="text-left p-2 text-white">Invoice</th>
                        <th className="text-left p-2 text-white">Description</th>
                        <th className="text-left p-2 text-white">Amount</th>
                        <th className="text-left p-2 text-white">Date</th>
                        <th className="text-left p-2 text-white">Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArr.map((z, i) => {
                        return (
                            <tr className="border border-[var(--rock-blue)]/50 p-2 hover:bg-[var(--rock-blue)]/30 text-black" key={i}>
                                <td className="text-left p-2">{z?.order}</td>
                                {/* <td className="text-left p-2">{settings.Supplier.Supplier.find(q => q.id === z.supplier)?.nname}</td> */}
                                <td className="text-left p-2" >{z.invoice}</td>
                                <td className="text-left p-2" >{z.description}</td>
                                <td className="text-left p-2">{
                                    <NumericFormat
                                        value={z.total}
                                        displayType="text"
                                        thousandSeparator
                                        allowNegative={true}
                                        prefix={z.cur === 'us' ? '$' : '€'}
                                        decimalScale='3'
                                        fixedDecimalScale
                                        className='text-[0.8rem]'
                                    />
                                }</td>
                                <td className="text-left p-2">
                                    {dateFormat(z.date, 'dd-mmm-yy')}
                                </td>
                                <td className="text-left p-2">
                                    {z.paidNotPaid}
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}
