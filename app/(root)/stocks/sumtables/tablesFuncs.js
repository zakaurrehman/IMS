import { sortArr } from "@utils/utils"
import { NumericFormat } from "react-number-format";
import dateFormat from "dateformat";



export const detailsToolTip = (row, data, settings, dataTable,) => {
 
    let id = settings.Stocks.Stocks.find(z => z.nname === row.original.stock)?.id
    let filteredArr = dataTable.filter(z => z.stock === id)

    return (
        <div className="bg-[var(--selago)] max-h-[28rem] overflow-y-auto rounded-lg">
            <table>
                <thead>
                    <tr className="border border-[var(--rock-blue)] p-2 bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)]">
                        <th className="text-left p-2 text-white">PO#</th>
                        <th className="text-left p-2 text-white">Supplier</th>
                        <th className="text-left p-2 text-white">Description</th>
                        <th className="text-left p-2 text-white">Quantity</th>
                        <th className="text-left p-2 text-white">Unit Price</th>
                        <th className="text-left p-2 text-white">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredArr.map((z, i) => {
                        return (
                            <tr className="border border-[var(--rock-blue)]/50 p-2 hover:bg-[var(--rock-blue)]/30 text-[var(--port-gore)]" key={i}>
                                <td className="text-left p-2">{z.order}</td>
                                <td className="text-left p-2">{settings.Supplier.Supplier.find(q => q.id === z.supplier)?.nname}</td>
                                <td className="text-left p-2" >{z.descriptionName}</td>
                                <td className="text-left p-2">{
                                    <NumericFormat
                                        value={z.qnty}
                                        displayType="text"
                                        thousandSeparator
                                        allowNegative={true}
                                        //  prefix={z.cur === 'us' ? '$' : '€'}
                                        decimalScale='3'
                                        fixedDecimalScale
                                        className='text-[0.8rem]'
                                    />
                                }</td>
                                <td className="text-left p-2">{
                                    <NumericFormat
                                        value={z.unitPrc}
                                        displayType="text"
                                        thousandSeparator
                                        allowNegative={true}
                                        prefix={z.cur === 'us' ? '$' : '€'}
                                        decimalScale='2'
                                        fixedDecimalScale
                                        className='text-[0.8rem]'
                                    />
                                }</td>
                                <td className="text-left p-2">{
                                    <NumericFormat
                                        value={z.total}
                                        displayType="text"
                                        thousandSeparator
                                        allowNegative={true}
                                        prefix={z.cur === 'us' ? '$' : '€'}
                                        decimalScale='2'
                                        fixedDecimalScale
                                        className='text-[0.8rem]'
                                    />
                                }</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )//stock; 
}
