import { NumericFormat } from "react-number-format";

const ThirdPart = ({ data, remaining, outStandingShip, purchase, totalMargin, yr, title }) => {

    return (
        <div className="w-full p-2 mt-6">
            <h1 className="font-bold text-lg mb-2 text-[var(--port-gore)]">{title}:</h1>
            <div className="w-full max-w-xl divide-y divide-[var(--selago)] rounded-xl border border-[var(--rock-blue)]">
                {/* Header row */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1 bg-gradient-to-r from-[var(--endeavour)] via-[var(--chathams-blue)] to-[var(--endeavour)] rounded-t-xl">
                    <div className="text-[0.8rem] font-semibold text-white">Months</div>
                    <div className="text-[0.8rem] font-semibold text-white">Purchased quantity (MT)</div>
                    <div className="text-[0.8rem] font-semibold text-white sm:block hidden">Profit</div>
                    <div className="text-[0.8rem] font-semibold text-white sm:block hidden">Outstanding shipment</div>
                    <div className="text-[0.8rem] font-semibold text-white sm:block hidden">Remaining</div>
                </div>
                {/* Data rows */}
                {data.map((z, i) => (
                    <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1">
                        <div className="text-[0.8rem] flex items-center">{z.month + "-" + yr}</div>
                        <div className="text-[0.8rem] flex items-center">
                            <NumericFormat
                                value={z.purchase}
                                displayType="text"
                                thousandSeparator
                                allowNegative={true}
                                decimalScale={!Number.isInteger(z.purchase) && '2'}
                                fixedDecimalScale
                                className="text-[0.8rem]"
                            />
                        </div>
                        <div className="text-[0.8rem] hidden sm:flex items-center">
                            <NumericFormat
                                value={z.totalMargin}
                                displayType="text"
                                thousandSeparator
                                allowNegative={true}
                                prefix={'$'}
                                decimalScale="2"
                                fixedDecimalScale
                                className="text-[0.8rem]"
                            />
                        </div>
                        <div className="text-[0.8rem] hidden sm:flex items-center">
                            <NumericFormat
                                value={z.openShip}
                                displayType="text"
                                thousandSeparator
                                allowNegative={true}
                                decimalScale={!Number.isInteger(z.openShip) && '2'}
                                fixedDecimalScale
                                className="text-[0.8rem]"
                            />
                        </div>
                        <div className="text-[0.8rem] hidden sm:flex items-center">
                            <NumericFormat
                                value={z.remaining}
                                displayType="text"
                                thousandSeparator
                                allowNegative={true}
                                prefix={'$'}
                                decimalScale="2"
                                fixedDecimalScale
                                className="text-[0.8rem]"
                            />
                        </div>
                    </div>
                ))}
                {/* Totals row */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1 bg-[var(--rock-blue)]/50 rounded-b-xl">
                    <div className="text-[0.8rem] font-semibold text-[var(--port-gore)]">Total</div>
                    <div className="text-[0.8rem] font-semibold">
                        <NumericFormat
                            value={purchase}
                            displayType="text"
                            thousandSeparator
                            allowNegative={true}
                            decimalScale={!Number.isInteger(purchase) && '2'}
                            fixedDecimalScale
                            className="text-[0.8rem]"
                        />
                    </div>
                    <div className="text-[0.8rem] font-semibold hidden sm:flex items-center">
                        <NumericFormat
                            value={totalMargin}
                            displayType="text"
                            thousandSeparator
                            allowNegative={true}
                            prefix={'$'}
                            decimalScale="2"
                            fixedDecimalScale
                            className="text-[0.8rem]"
                        />
                    </div>
                    <div className="text-[0.8rem] font-semibold hidden sm:flex items-center">
                        <NumericFormat
                            value={outStandingShip}
                            displayType="text"
                            thousandSeparator
                            allowNegative={true}
                            decimalScale="2"
                            fixedDecimalScale
                            className="text-[0.8rem]"
                        />
                    </div>
                    <div className="text-[0.8rem] font-semibold hidden sm:flex items-center">
                        <NumericFormat
                            value={remaining}
                            displayType="text"
                            thousandSeparator
                            allowNegative={true}
                            prefix={'$'}
                            decimalScale="2"
                            fixedDecimalScale
                            className="text-[0.8rem]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThirdPart
