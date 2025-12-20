import { NumericFormat } from "react-number-format";
import dateFormat from "dateformat";


export const expensesToolTip = (row, expensesData, settings) => {

    let filteredArr = expensesData.filter(z => (z.supplier === row.original.supplier && z.cur === row.original.cur))
    return (

        <div className="bg-[var(--selago)] max-h-[32rem] overflow-y-auto w-fit rounded-lg">
            <table>
                <thead>
                    <tr className="border border-[var(--rock-blue)] p-2 bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
                        <th className="text-left p-2 text-white">PO#</th>
                        <th className="text-left p-2 text-white">Description</th>
                        <th className="text-left p-2 text-white">Quantity</th>
                        <th className="text-left p-2 text-white">Shipped Weight</th>
                        <th className="text-left p-2 text-white">Remaining Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArr.map((z, i) => {
                        return (
                            <tr className="border border-[var(--rock-blue)]/50 p-2 hover:bg-[var(--rock-blue)]/30 text-[var(--port-gore)]" key={i}>
                                <td className="text-left p-2">{z.order}</td>
                                <td className="text-left p-2" >{z.description}</td>
                                <td className="text-left p-2" >{z.poWeight}</td>
                                <td className="text-left p-2" >{
                                    z.shiipedWeight === 0 ? 0 :
                                        <NumericFormat
                                            value={z.shiipedWeight}
                                            displayType="text"
                                            thousandSeparator
                                            allowNegative={true}
                                            //  prefix={z.cur === 'us' ? '$' : '€'}
                                            decimalScale='3'
                                            fixedDecimalScale
                                            className='text-[0.8rem]'
                                        />
                                }</td>
                                <td className="text-left p-2" >{
                                    z.remaining === 0 ? 0 :
                                        <NumericFormat
                                            value={z.remaining}
                                            displayType="text"
                                            thousandSeparator
                                            allowNegative={true}
                                            //  prefix={z.cur === 'us' ? '$' : '€'}
                                            decimalScale='3'
                                            fixedDecimalScale
                                            className='text-[0.8rem]'
                                        />
                                }</td>
                                <td className="text-left p-2">
                                    {
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
                                    }
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}
