import { NumericFormat } from "react-number-format";
import React from 'react'

const FirstPart = ({ incoming, outStandingShip, purchase, totalMargin, shipped, }) => {
    return (
        <div className="w-full p-2">
            <div className="w-full max-w-7xl rounded-xl border border-[var(--rock-blue)] p-2">

                <div className='grid grid-cols-5 gap-4 '>
                    <div className='col-span-5 md:col-span-1 text-[0.8rem]  flex flex-col'>
                        <label className="border-b border-[var(--rock-blue)] font-semibold text-[var(--port-gore)]">Incoming:</label>
                        <label>{
                            <NumericFormat
                                value={incoming}
                                displayType="text"
                                thousandSeparator
                                allowNegative={true}
                                prefix={'$'}
                                decimalScale='2'
                                fixedDecimalScale
                                className='text-[0.8rem]'
                            />
                        }</label>
                    </div>
                    <div className='col-span-5 md:col-span-1 text-[0.8rem] flex flex-col'>
                        <label className="border-b border-[var(--rock-blue)] font-semibold text-[var(--port-gore)]">Outstanding shipment:</label>
                        <label>
                            {<NumericFormat
                                value={outStandingShip}
                                displayType="text"
                                thousandSeparator
                                allowNegative={true}
                                decimalScale='3'
                                fixedDecimalScale
                                className='text-[0.8rem]'
                            />}
                        </label>
                    </div>
                    <div className='col-span-5 md:col-span-1 text-[0.8rem] flex flex-col'>
                        <label className="border-b border-[var(--rock-blue)] font-semibold text-[var(--port-gore)]">Quantity (MT):</label>
                        <label> {<NumericFormat
                            value={purchase}
                            displayType="text"
                            thousandSeparator
                            allowNegative={true}
                            decimalScale='3'
                            fixedDecimalScale
                            className='text-[0.8rem]'
                        />}</label>
                    </div>
                    <div className='col-span-5 md:col-span-1 text-[0.8rem] flex flex-col'>
                        <label className="border-b border-[var(--rock-blue)] font-semibold text-[var(--port-gore)]">Profits:</label>
                        <label>{
                            <NumericFormat
                                value={totalMargin}
                                displayType="text"
                                thousandSeparator
                                allowNegative={true}
                                prefix={'$'}
                                decimalScale='2'
                                fixedDecimalScale
                                className='text-[0.8rem]'
                            />
                        }</label>
                    </div>
                    <div className='col-span-5 md:col-span-1 text-[0.8rem] flex flex-col'>
                        <label className="border-b border-[var(--rock-blue)] font-semibold text-[var(--port-gore)]">Shipped:</label>
                        <label>{
                            <NumericFormat
                                value={shipped}
                                displayType="text"
                                thousandSeparator
                                allowNegative={true}
                                decimalScale='3'
                                fixedDecimalScale
                                className='text-[0.8rem]'
                            />
                        }</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstPart
