// // import { useState } from "react";

// // const Fenicr = ({ value, handleChange }) => {
// //     const [focusedField, setFocusedField] = useState(null);


// //     const fe = (100 - value?.fenicr?.ni - value?.fenicr?.cr - value?.fenicr?.mo).toFixed(2)
// //     const solidsPrice = value?.fenicr?.ni * value?.general?.nilme * value?.fenicr?.formulaNiCost / 10000 +
// //         value?.fenicr?.cr * value?.fenicr?.crPrice / 100 +
// //         value?.fenicr?.mo * value?.fenicr?.moPrice / 100 +
// //         fe * value?.fenicr?.fePrice / 100


// //     const solidsPrice1 = value?.fenicr?.ni * value?.general?.nilme / 100 * value?.fenicr?.formulaNiPrice / 100 +
// //         value?.fenicr?.cr / 100 * value.general?.chargeCrLb * value.general?.mt * value?.fenicr?.crPriceArgus / 100 +
// //         value?.fenicr?.mo / 100 * (value.general?.MoOxideLb * value?.fenicr?.moPriceArgus * value.general?.mt / 100) +
// //         fe * value?.fenicr?.fePrice1 / 100


// //     const addComma = (nStr, z) => {
// //         nStr += '';
// //         var x = nStr.split('.');
// //         var x1 = x[0];
// //         var x2 = x.length > 1 ? '.' + x[1] : '';
// //         var rgx = /(\d+)(\d{3})/;
// //         while (rgx.test(x1)) {
// //             x1 = x1.replace(rgx, '$1,$2');
// //         }

// //         const symbol = !z ? '$' : '€'
// //         return (symbol + x1 + x2);
// //     }

// //     return value.fenicr != null ? (
// //         <div className='border border-slate-300 p-3 rounded-lg flex flex-col md:flex-row w-full'>

// //             <div className="grid grid-cols-2 w-[75rem]">
// //                 <div className="col-span-2 md:col-span-1">
// //                     <p className='text-center text-slate-600 text-lg font-semibold'>Cost</p>
// //                     <div className='flex gap-6 pt-2'>
// //                         <div>
// //                             <div>
// //                                 <p className='text-center text-slate-600 text-sm font-semibold'>Composition</p>
// //                                 <div className='flex justify-center'>
// //                                     <div className='border border-slate-500 w-24 flex flex-col justify-center'>
// //                                         <span className='title_style'>Ni</span>
// //                                         <input type='input' className='input_style text-red-700' value={value?.fenicr?.ni + '%'}
// //                                             name='ni' onChange={(e) => {
// //                                                 handleChange({
// //                                                     target: {
// //                                                         name: e.target.name,
// //                                                         value: e.target.value.replace('%', ''),
// //                                                     },
// //                                                 }, 'fenicr');
// //                                             }}
// //                                             onBlur={(e) => {
// //                                                 let num = parseFloat(e.target.value.replace("%", ""));
// //                                                 if (!isNaN(num)) {
// //                                                     handleChange(
// //                                                         {
// //                                                             target: {
// //                                                                 name: e.target.name,
// //                                                                 value: num.toFixed(2), // format with 2 decimals
// //                                                             },
// //                                                         },
// //                                                         "fenicr"
// //                                                     );
// //                                                 }
// //                                             }}
// //                                         />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style'>Cr</span>
// //                                         <input type='input' className='input_style text-red-700' value={value?.fenicr?.cr + '%'}
// //                                             name='cr' onChange={(e) => {
// //                                                 handleChange({
// //                                                     target: {
// //                                                         name: e.target.name,
// //                                                         value: e.target.value.replace('%', ''),
// //                                                     },
// //                                                 }, 'fenicr');
// //                                             }}
// //                                             onBlur={(e) => {
// //                                                 let num = parseFloat(e.target.value.replace("%", ""));
// //                                                 if (!isNaN(num)) {
// //                                                     handleChange(
// //                                                         {
// //                                                             target: {
// //                                                                 name: e.target.name,
// //                                                                 value: num.toFixed(2), // format with 2 decimals
// //                                                             },
// //                                                         },
// //                                                         "fenicr"
// //                                                     );
// //                                                 }
// //                                             }}
// //                                         />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style'>Mo</span>
// //                                         <input type='text' className='input_style text-red-700' value={value?.fenicr?.mo + '%'}
// //                                             name='mo' onChange={(e) => {
// //                                                 handleChange({
// //                                                     target: {
// //                                                         name: e.target.name,
// //                                                         value: e.target.value.replace('%', ''),
// //                                                     },
// //                                                 }, 'fenicr');
// //                                             }}
// //                                             onBlur={(e) => {
// //                                                 let num = parseFloat(e.target.value.replace("%", ""));
// //                                                 if (!isNaN(num)) {
// //                                                     handleChange(
// //                                                         {
// //                                                             target: {
// //                                                                 name: e.target.name,
// //                                                                 value: num.toFixed(2), // format with 2 decimals
// //                                                             },
// //                                                         },
// //                                                         "fenicr"
// //                                                     );
// //                                                 }
// //                                             }}
// //                                         />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style'>Fe</span>
// //                                         <input type='input' className='input_style bg-slate-100' value={fe + '%'}
// //                                             name='fe' onChange={(e) => { }} />
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                             <div className=''>
// //                                 <p className='text-center text-slate-600 text-sm font-semibold'>Price</p>
// //                                 <div className='flex justify-center'>
// //                                     <div className='border border-slate-500 w-24 flex flex-col justify-center'>
// //                                         <span className='title_style bg-customLavender'>Ni</span>
// //                                         <input type='input' className='input_style bg-slate-100' value={addComma(value.general?.nilme * value.fenicr?.formulaNiCost / 100)}
// //                                             onChange={(e) => { }} />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style bg-customLavender'>Cr</span>
// //                                         <input type='input' className='input_style text-red-700 '
// //                                             name='crPrice' onChange={(e) => handleChange(e, 'fenicr')}
// //                                             value={focusedField === 'crPrice' ? value.fenicr?.crPrice : addComma(value.fenicr?.crPrice)}
// //                                             onFocus={() => setFocusedField('crPrice')}
// //                                             onBlur={(e) => {
// //                                                 setFocusedField(null);

// //                                                 let num = parseFloat(e.target.value);
// //                                                 if (!isNaN(num)) {
// //                                                     handleChange(
// //                                                         {
// //                                                             target: {
// //                                                                 name: e.target.name,
// //                                                                 value: num.toFixed(2), // force 2 decimals
// //                                                             },
// //                                                         },
// //                                                         "fenicr"
// //                                                     );
// //                                                 }
// //                                             }}
// //                                         />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style bg-customLavender'>Mo</span>
// //                                         <input type='input' className='input_style text-red-700'
// //                                             name='moPrice' onChange={(e) => handleChange(e, 'fenicr')}
// //                                             value={focusedField === 'moPrice' ? value.fenicr?.moPrice : addComma(value.fenicr?.moPrice)}
// //                                             onFocus={() => setFocusedField('moPrice')}
// //                                             onBlur={(e) => {
// //                                                 setFocusedField(null);

// //                                                 let num = parseFloat(e.target.value);
// //                                                 if (!isNaN(num)) {
// //                                                     handleChange(
// //                                                         {
// //                                                             target: {
// //                                                                 name: e.target.name,
// //                                                                 value: num.toFixed(2), // force 2 decimals
// //                                                             },
// //                                                         },
// //                                                         "fenicr"
// //                                                     );
// //                                                 }
// //                                             }}
// //                                         />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style bg-customLavender'>Fe</span>
// //                                         <input type='input' className='input_style text-red-700'
// //                                             name='fePrice' onChange={(e) => handleChange(e, 'fenicr')}
// //                                             value={focusedField === 'fePrice' ? value.fenicr?.fePrice : addComma(value.fenicr?.fePrice)}
// //                                             onFocus={() => setFocusedField('fePrice')}
// //                                             onBlur={(e) => {
// //                                                 setFocusedField(null);

// //                                                 let num = parseFloat(e.target.value);
// //                                                 if (!isNaN(num)) {
// //                                                     handleChange(
// //                                                         {
// //                                                             target: {
// //                                                                 name: e.target.name,
// //                                                                 value: num.toFixed(2), // force 2 decimals
// //                                                             },
// //                                                         },
// //                                                         "fenicr"
// //                                                     );
// //                                                 }
// //                                             }}
// //                                         />
// //                                     </div>
// //                                 </div>

// //                             </div>
// //                         </div>
// //                         <div className='items-end flex'>
// //                             <div className='border border-slate-500 w-24 flex flex-col'>
// //                                 <span className='title_style bg-blue-300'>Ni LME</span>
// //                                 <input type='text' className='input_style bg-slate-100' value={addComma(value?.general?.nilme)}
// //                                     name='nilme' onChange={(e) => { }} />
// //                             </div>
// //                         </div>
// //                     </div>


// //                     <div className='items-end flex pt-[44px]'>
// //                         <div className='border border-slate-500 w-24 flex flex-col'>
// //                             <span className='title_style bg-customOrange'> Formula x Ni</span>
// //                             <input type='text' className='input_style bg-orange-200 text-red-600' value={value?.fenicr?.formulaNiCost + '%'}
// //                                 name='formulaNiCost' onChange={(e) => handleChange(e, 'fenicr')}
// //                                 onBlur={(e) => {
// //                                     let num = parseFloat(e.target.value.replace("%", ""));
// //                                     if (!isNaN(num)) {
// //                                         handleChange(
// //                                             {
// //                                                 target: {
// //                                                     name: e.target.name,
// //                                                     value: num.toFixed(2), // store with 2 decimals
// //                                                 },
// //                                             },
// //                                             "fenicr"
// //                                         );
// //                                     }
// //                                 }}
// //                             />
// //                         </div>
// //                     </div>
// //                     <div className=''>
// //                         <div className='items-end flex pt-6 gap-6'>
// //                             <div className='border border-slate-500 w-24 flex flex-col'>
// //                                 <span className='title_style bg-customLavender'>Cost</span>
// //                                 <span className='title_style'>Solids Price:</span>
// //                                 <input type='text' className='input_style bg-orange-200 input_style'
// //                                     value={addComma(solidsPrice.toFixed(2))}
// //                                     name='formulaNi' onChange={(e) => { }} />
// //                             </div>
// //                             <div className='border border-slate-500 w-24 flex flex-col'>
// //                                 <span className='title_style'>Turnings Price:</span>
// //                                 <input type='text' className='input_style bg-orange-200 '
// //                                     value={addComma((solidsPrice * 0.92).toFixed(2))}
// //                                     name='formulaNi' onChange={(e) => { }} />
// //                             </div>
// //                             <div className='border border-slate-500 w-24 flex flex-col'>
// //                                 <span className='title_style'>Price/Euro:</span>
// //                                 <input type='text' className='input_style bg-customLime'
// //                                     value={addComma((solidsPrice / value.general?.euroRate).toFixed(2), 'a')}
// //                                     name='formulaNi' onChange={(e) => { }} />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className='pt-4 text-red-600'>
// //                         <p className="text-xs">* Fill in the red and + Formula x Ni</p>
// //                         <p className="text-xs">* Fe is calculated automatically</p>
// //                     </div>

// //                 </div>



// //                 <div className="col-span-2 md:col-span-1">
// //                     <p className='text-center text-slate-600 text-lg font-semibold'>Sales</p>
// //                     <div className='flex gap-6 pt-2'>
// //                         <div>
// //                             <div>
// //                                 <p className='text-center text-slate-600 text-sm font-semibold'>Composition</p>
// //                                 <div className='flex justify-center'>
// //                                     <div className='border border-slate-500 w-24 flex flex-col justify-center'>
// //                                         <span className='title_style'>Ni</span>
// //                                         <input type='input' className='input_style bg-slate-100'
// //                                             value={value?.fenicr?.ni + '%'} onChange={(e) => { }} />
// //                                     </div>
// //                                     <div className='border-y border-slate-500 border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style'>Cr</span>
// //                                         <input type='input' className='input_style bg-slate-100'
// //                                             value={value?.fenicr?.cr + '%'} onChange={(e) => { }} />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style'>Mo</span>
// //                                         <input type='input' className='input_style bg-slate-100'
// //                                             value={value?.fenicr?.mo + '%'} onChange={(e) => { }} />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style'>Fe</span>
// //                                         <input type='input' className='input_style bg-slate-100'
// //                                             value={fe + '%'} onChange={(e) => { }} />
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                             <div className=''>
// //                                 <p className='text-center text-slate-600 text-sm font-semibold'>Price</p>
// //                                 <div className='flex justify-center'>
// //                                     <div className='border border-slate-500 w-24 flex flex-col justify-center'>
// //                                         <span className='title_style bg-customLavender'>Ni</span>
// //                                         <input type='input' className='input_style bg-slate-100' value={addComma(value?.general?.nilme * value?.fenicr?.formulaNiPrice / 100)}
// //                                             onChange={(e) => { }} />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style bg-customLavender'>Cr</span>
// //                                         <input type='input' className='input_style bg-slate-100'
// //                                             value={addComma((value.general?.chargeCrLb * value.general?.mt * value?.fenicr?.crPriceArgus / 100).toFixed(2))} onChange={(e) => { }} />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style bg-customLavender'>Mo</span>
// //                                         <input type='input' className='input_style bg-slate-100'
// //                                             value={addComma((value.general?.MoOxideLb * value?.fenicr?.moPriceArgus * value.general?.mt / 100).toFixed(2))} onChange={(e) => { }} />
// //                                     </div>
// //                                     <div className='border-y border-slate-500  border-r w-24 flex flex-col justify-center'>
// //                                         <span className='title_style bg-customLavender'>Fe</span>
// //                                         <input type='input' className='input_style  text-red-600 '
// //                                             name='fePrice1' onChange={(e) => handleChange(e, 'fenicr')}
// //                                             value={focusedField === 'fePrice1' ? value.fenicr?.fePrice1 : addComma(value.fenicr?.fePrice1)}
// //                                             onFocus={() => setFocusedField('fePrice1')}
// //                                             onBlur={(e) => {
// //                                                 setFocusedField(null);

// //                                                 let num = parseFloat(e.target.value);
// //                                                 if (!isNaN(num)) {
// //                                                     handleChange(
// //                                                         {
// //                                                             target: {
// //                                                                 name: e.target.name,
// //                                                                 value: num.toFixed(2), // force 2 decimals
// //                                                             },
// //                                                         },
// //                                                         "fenicr"
// //                                                     );
// //                                                 }
// //                                             }}
// //                                         />

// //                                     </div>
// //                                 </div>
// //                             </div>
// //                             <div className='justify-start flex'>
// //                                 <div className='flex justify-center'>
// //                                     <div className='w-24 flex flex-col justify-center'>
// //                                         <span className='justify-center text-xs text-slate-500 items-center flex'>{'Lb ' + addComma(((value?.general?.nilme * value?.fenicr?.formulaNiPrice / 100) / (value?.general?.mt)).toFixed(2))}</span>
// //                                     </div>
// //                                     <div className='w-24 flex flex-col justify-center'>
// //                                         <input type='input' className='input w-full h-7 text-center border-none  cursor-default rounded-none text-red-700 text-xs'
// //                                             name='crPriceArgus' value={'Argus ' + value?.fenicr?.crPriceArgus + '%'} onChange={(e) => handleChange(e, 'fenicr')} />
// //                                     </div>
// //                                     <div className=' w-24 flex flex-col justify-center'>
// //                                         <input type='input' className='input w-full h-7 text-center border-none cursor-default rounded-none text-red-700 text-xs'
// //                                             name='moPriceArgus' value={'Argus ' + value?.fenicr?.moPriceArgus + '%'} onChange={(e) => handleChange(e, 'fenicr')} />
// //                                     </div>

// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <div className='items-end flex'>
// //                             <div className='border border-slate-500 w-24 flex flex-col mb-7'>
// //                                 <span className='title_style bg-blue-300'>Ni LME</span>
// //                                 <input type='input' className='input_style bg-slate-100' value={addComma(value?.general?.nilme)}
// //                                     onChange={(e) => { }} />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className='items-end flex pt-4'>
// //                         <div className='border border-slate-500 w-24 flex flex-col'>
// //                             <span className='title_style bg-customOrange'> Formula x Ni</span>
// //                             <input type='text' className='input_style bg-orange-200 text-red-600' value={value?.fenicr?.formulaNiPrice + '%'}
// //                                 name='formulaNiPrice' onChange={(e) => handleChange(e, 'fenicr')}
// //                                   onBlur={(e) => {
// //                                     let num = parseFloat(e.target.value.replace("%", ""));
// //                                     if (!isNaN(num)) {
// //                                         handleChange(
// //                                             {
// //                                                 target: {
// //                                                     name: e.target.name,
// //                                                     value: num.toFixed(2), // store with 2 decimals
// //                                                 },
// //                                             },
// //                                             "fenicr"
// //                                         );
// //                                     }
// //                                 }}
// //                             />
// //                         </div>
// //                     </div>
// //                     <div className=''>
// //                         <div className='items-end flex pt-6 gap-6'>
// //                             <div className='border border-slate-500 w-24 flex flex-col'>
// //                                 <span className='title_style bg-customLavender'>Sales</span>
// //                                 <span className='title_style'>Solids Price:</span>
// //                                 <input type='text' className='input_style bg-orange-200'
// //                                     value={addComma((solidsPrice1).toFixed(2))}
// //                                     name='formulaNi' onChange={(e) => { }} />
// //                             </div>
// //                             <div className='border border-slate-500 w-24 flex flex-col'>
// //                                 <span className='title_style'>Turnings Price:</span>
// //                                 <input type='text' className='input_style bg-orange-200'
// //                                     value={addComma((solidsPrice1 * 0.9).toFixed(2))}
// //                                     name='formulaNi' onChange={(e) => { }} />
// //                             </div>
// //                             <div className='border border-slate-500 w-24 flex flex-col'>
// //                                 <span className='title_style'>Price/Euro:</span>
// //                                 <input type='text' className='input_style bg-customLime '
// //                                     value={addComma((solidsPrice1 / value.general?.euroRate).toFixed(2), 'a')}
// //                                     name='formulaNi' onChange={(e) => { }} />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className='pt-4 text-red-600'>
// //                         <p className="text-xs">* Fill in the red and + Formula x Ni</p>
// //                         <p className="text-xs">* Fe is calculated automatically</p>
// //                     </div>
// //                 </div>
// //             </div>

// //         </div>
// //     ) : ''
// // };

// // export default Fenicr;
// import { useState } from "react";

// const Fenicr = ({ value, handleChange }) => {
//     const [focusedField, setFocusedField] = useState(null);

//     const fe = (100 - value?.fenicr?.ni - value?.fenicr?.cr - value?.fenicr?.mo).toFixed(2)
//     const solidsPrice = value?.fenicr?.ni * value?.general?.nilme * value?.fenicr?.formulaNiCost / 10000 +
//         value?.fenicr?.cr * value?.fenicr?.crPrice / 100 +
//         value?.fenicr?.mo * value?.fenicr?.moPrice / 100 +
//         fe * value?.fenicr?.fePrice / 100

//     const solidsPrice1 = value?.fenicr?.ni * value?.general?.nilme / 100 * value?.fenicr?.formulaNiPrice / 100 +
//         value?.fenicr?.cr / 100 * value.general?.chargeCrLb * value.general?.mt * value?.fenicr?.crPriceArgus / 100 +
//         value?.fenicr?.mo / 100 * (value.general?.MoOxideLb * value?.fenicr?.moPriceArgus * value.general?.mt / 100) +
//         fe * value?.fenicr?.fePrice1 / 100

//     const addComma = (nStr, z) => {
//         nStr += '';
//         var x = nStr.split('.');
//         var x1 = x[0];
//         var x2 = x.length > 1 ? '.' + x[1] : '';
//         var rgx = /(\d+)(\d{3})/;
//         while (rgx.test(x1)) {
//             x1 = x1.replace(rgx, '$1,$2');
//         }
//         const symbol = !z ? '$' : '€'
//         return (symbol + x1 + x2);
//     }

//     return value.fenicr != null ? (
//         <div className='border border-slate-300 p-2 sm:p-3 rounded-lg w-full overflow-x-auto'>
//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
//                 {/* COST SECTION */}
//                 <div className="w-full">
//                     <p className='text-center text-slate-600 text-base sm:text-lg font-semibold mb-3'>Cost</p>
                    
//                     {/* Composition */}
//                     <p className='text-center text-slate-600 text-sm font-semibold mb-2'>Composition</p>
//                     <div className='overflow-x-auto mb-4'>
//                         <div className='flex justify-center min-w-[400px]'>
//                             <div className='border border-slate-500 w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style text-xs sm:text-sm'>Ni</span>
//                                 <input type='text' className='input_style text-red-700 text-xs sm:text-sm' 
//                                     value={value?.fenicr?.ni + '%'}
//                                     name='ni' 
//                                     onChange={(e) => {
//                                         handleChange({
//                                             target: {
//                                                 name: e.target.name,
//                                                 value: e.target.value.replace('%', ''),
//                                             },
//                                         }, 'fenicr');
//                                     }}
//                                     onBlur={(e) => {
//                                         let num = parseFloat(e.target.value.replace("%", ""));
//                                         if (!isNaN(num)) {
//                                             handleChange({
//                                                 target: {
//                                                     name: e.target.name,
//                                                     value: num.toFixed(2),
//                                                 },
//                                             }, "fenicr");
//                                         }
//                                     }}
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style text-xs sm:text-sm'>Cr</span>
//                                 <input type='text' className='input_style text-red-700 text-xs sm:text-sm' 
//                                     value={value?.fenicr?.cr + '%'}
//                                     name='cr' 
//                                     onChange={(e) => {
//                                         handleChange({
//                                             target: {
//                                                 name: e.target.name,
//                                                 value: e.target.value.replace('%', ''),
//                                             },
//                                         }, 'fenicr');
//                                     }}
//                                     onBlur={(e) => {
//                                         let num = parseFloat(e.target.value.replace("%", ""));
//                                         if (!isNaN(num)) {
//                                             handleChange({
//                                                 target: {
//                                                     name: e.target.name,
//                                                     value: num.toFixed(2),
//                                                 },
//                                             }, "fenicr");
//                                         }
//                                     }}
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style text-xs sm:text-sm'>Mo</span>
//                                 <input type='text' className='input_style text-red-700 text-xs sm:text-sm' 
//                                     value={value?.fenicr?.mo + '%'}
//                                     name='mo' 
//                                     onChange={(e) => {
//                                         handleChange({
//                                             target: {
//                                                 name: e.target.name,
//                                                 value: e.target.value.replace('%', ''),
//                                             },
//                                         }, 'fenicr');
//                                     }}
//                                     onBlur={(e) => {
//                                         let num = parseFloat(e.target.value.replace("%", ""));
//                                         if (!isNaN(num)) {
//                                             handleChange({
//                                                 target: {
//                                                     name: e.target.name,
//                                                     value: num.toFixed(2),
//                                                 },
//                                             }, "fenicr");
//                                         }
//                                     }}
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style text-xs sm:text-sm'>Fe</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm' 
//                                     value={fe + '%'}
//                                     name='fe' 
//                                     readOnly 
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Price */}
//                     <p className='text-center text-slate-600 text-sm font-semibold mb-2'>Price</p>
//                     <div className='overflow-x-auto mb-4'>
//                         <div className='flex justify-center min-w-[400px]'>
//                             <div className='border border-slate-500 w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Ni</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm' 
//                                     value={addComma(value.general?.nilme * value.fenicr?.formulaNiCost / 100)}
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Cr</span>
//                                 <input type='text' className='input_style text-red-700 text-xs sm:text-sm'
//                                     name='crPrice' 
//                                     onChange={(e) => handleChange(e, 'fenicr')}
//                                     value={focusedField === 'crPrice' ? value.fenicr?.crPrice : addComma(value.fenicr?.crPrice)}
//                                     onFocus={() => setFocusedField('crPrice')}
//                                     onBlur={(e) => {
//                                         setFocusedField(null);
//                                         let num = parseFloat(e.target.value);
//                                         if (!isNaN(num)) {
//                                             handleChange({
//                                                 target: {
//                                                     name: e.target.name,
//                                                     value: num.toFixed(2),
//                                                 },
//                                             }, "fenicr");
//                                         }
//                                     }}
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Mo</span>
//                                 <input type='text' className='input_style text-red-700 text-xs sm:text-sm'
//                                     name='moPrice' 
//                                     onChange={(e) => handleChange(e, 'fenicr')}
//                                     value={focusedField === 'moPrice' ? value.fenicr?.moPrice : addComma(value.fenicr?.moPrice)}
//                                     onFocus={() => setFocusedField('moPrice')}
//                                     onBlur={(e) => {
//                                         setFocusedField(null);
//                                         let num = parseFloat(e.target.value);
//                                         if (!isNaN(num)) {
//                                             handleChange({
//                                                 target: {
//                                                     name: e.target.name,
//                                                     value: num.toFixed(2),
//                                                 },
//                                             }, "fenicr");
//                                         }
//                                     }}
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Fe</span>
//                                 <input type='text' className='input_style text-red-700 text-xs sm:text-sm'
//                                     name='fePrice' 
//                                     onChange={(e) => handleChange(e, 'fenicr')}
//                                     value={focusedField === 'fePrice' ? value.fenicr?.fePrice : addComma(value.fenicr?.fePrice)}
//                                     onFocus={() => setFocusedField('fePrice')}
//                                     onBlur={(e) => {
//                                         setFocusedField(null);
//                                         let num = parseFloat(e.target.value);
//                                         if (!isNaN(num)) {
//                                             handleChange({
//                                                 target: {
//                                                     name: e.target.name,
//                                                     value: num.toFixed(2),
//                                                 },
//                                             }, "fenicr");
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Ni LME Display */}
//                     <div className='flex justify-center mb-4'>
//                         <div className='border border-slate-500 w-24 sm:w-28 flex flex-col'>
//                             <span className='title_style bg-blue-300 text-xs sm:text-sm'>Ni LME</span>
//                             <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm' 
//                                 value={addComma(value?.general?.nilme)}
//                                 readOnly 
//                             />
//                         </div>
//                     </div>

//                     {/* Formula x Ni */}
//                     <div className='flex justify-center mb-4'>
//                         <div className='border border-slate-500 w-24 sm:w-28 flex flex-col'>
//                             <span className='title_style bg-customOrange text-xs sm:text-sm'>Formula x Ni</span>
//                             <input type='text' className='input_style bg-orange-200 text-red-600 text-xs sm:text-sm' 
//                                 value={value?.fenicr?.formulaNiCost + '%'}
//                                 name='formulaNiCost' 
//                                 onChange={(e) => handleChange(e, 'fenicr')}
//                                 onBlur={(e) => {
//                                     let num = parseFloat(e.target.value.replace("%", ""));
//                                     if (!isNaN(num)) {
//                                         handleChange({
//                                             target: {
//                                                 name: e.target.name,
//                                                 value: num.toFixed(2),
//                                             },
//                                         }, "fenicr");
//                                     }
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     {/* Results */}
//                     <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4'>
//                         <div className='border border-slate-500 flex flex-col'>
//                             <span className='title_style bg-customLavender text-xs sm:text-sm'>Cost</span>
//                             <span className='title_style text-xs sm:text-sm'>Solids Price:</span>
//                             <input type='text' className='input_style bg-orange-200 text-xs sm:text-sm'
//                                 value={addComma(solidsPrice.toFixed(2))}
//                                 readOnly 
//                             />
//                         </div>
//                         <div className='border border-slate-500 flex flex-col'>
//                             <span className='title_style text-xs sm:text-sm'>Turnings Price:</span>
//                             <input type='text' className='input_style bg-orange-200 text-xs sm:text-sm'
//                                 value={addComma((solidsPrice * 0.92).toFixed(2))}
//                                 readOnly 
//                             />
//                         </div>
//                         <div className='border border-slate-500 flex flex-col'>
//                             <span className='title_style text-xs sm:text-sm'>Price/Euro:</span>
//                             <input type='text' className='input_style bg-customLime text-xs sm:text-sm'
//                                 value={addComma((solidsPrice / value.general?.euroRate).toFixed(2), 'a')}
//                                 readOnly 
//                             />
//                         </div>
//                     </div>

//                     <div className='text-red-600 text-xs'>
//                         <p>* Fill in the red and + Formula x Ni</p>
//                         <p>* Fe is calculated automatically</p>
//                     </div>
//                 </div>

//                 {/* SALES SECTION */}
//                 <div className="w-full">
//                     <p className='text-center text-slate-600 text-base sm:text-lg font-semibold mb-3'>Sales</p>
                    
//                     {/* Composition (Read-only) */}
//                     <p className='text-center text-slate-600 text-sm font-semibold mb-2'>Composition</p>
//                     <div className='overflow-x-auto mb-4'>
//                         <div className='flex justify-center min-w-[400px]'>
//                             <div className='border border-slate-500 w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style text-xs sm:text-sm'>Ni</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm'
//                                     value={value?.fenicr?.ni + '%'} 
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style text-xs sm:text-sm'>Cr</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm'
//                                     value={value?.fenicr?.cr + '%'} 
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style text-xs sm:text-sm'>Mo</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm'
//                                     value={value?.fenicr?.mo + '%'} 
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style text-xs sm:text-sm'>Fe</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm'
//                                     value={fe + '%'} 
//                                     readOnly 
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Price */}
//                     <p className='text-center text-slate-600 text-sm font-semibold mb-2'>Price</p>
//                     <div className='overflow-x-auto mb-2'>
//                         <div className='flex justify-center min-w-[400px]'>
//                             <div className='border border-slate-500 w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Ni</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm' 
//                                     value={addComma(value?.general?.nilme * value?.fenicr?.formulaNiPrice / 100)}
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Cr</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm'
//                                     value={addComma((value.general?.chargeCrLb * value.general?.mt * value?.fenicr?.crPriceArgus / 100).toFixed(2))} 
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Mo</span>
//                                 <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm'
//                                     value={addComma((value.general?.MoOxideLb * value?.fenicr?.moPriceArgus * value.general?.mt / 100).toFixed(2))} 
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border-y border-slate-500 border-r w-20 sm:w-24 flex flex-col justify-center'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Fe</span>
//                                 <input type='text' className='input_style text-red-600 text-xs sm:text-sm'
//                                     name='fePrice1' 
//                                     onChange={(e) => handleChange(e, 'fenicr')}
//                                     value={focusedField === 'fePrice1' ? value.fenicr?.fePrice1 : addComma(value.fenicr?.fePrice1)}
//                                     onFocus={() => setFocusedField('fePrice1')}
//                                     onBlur={(e) => {
//                                         setFocusedField(null);
//                                         let num = parseFloat(e.target.value);
//                                         if (!isNaN(num)) {
//                                             handleChange({
//                                                 target: {
//                                                     name: e.target.name,
//                                                     value: num.toFixed(2),
//                                                 },
//                                             }, "fenicr");
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Argus percentages */}
//                     <div className='overflow-x-auto mb-4'>
//                         <div className='flex justify-center min-w-[400px]'>
//                             <div className='w-20 sm:w-24 flex justify-center items-center'>
//                                 <span className='text-xs text-slate-500'>{'Lb ' + addComma(((value?.general?.nilme * value?.fenicr?.formulaNiPrice / 100) / (value?.general?.mt)).toFixed(2))}</span>
//                             </div>
//                             <div className='w-20 sm:w-24 flex justify-center items-center'>
//                                 <input type='text' className='input w-full h-7 text-center border-none cursor-default rounded-none text-red-700 text-xs'
//                                     name='crPriceArgus' 
//                                     value={'Argus ' + value?.fenicr?.crPriceArgus + '%'} 
//                                     onChange={(e) => handleChange(e, 'fenicr')} 
//                                 />
//                             </div>
//                             <div className='w-20 sm:w-24 flex justify-center items-center'>
//                                 <input type='text' className='input w-full h-7 text-center border-none cursor-default rounded-none text-red-700 text-xs'
//                                     name='moPriceArgus' 
//                                     value={'Argus ' + value?.fenicr?.moPriceArgus + '%'} 
//                                     onChange={(e) => handleChange(e, 'fenicr')} 
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Ni LME Display */}
//                     <div className='flex justify-center mb-4'>
//                         <div className='border border-slate-500 w-24 sm:w-28 flex flex-col'>
//                             <span className='title_style bg-blue-300 text-xs sm:text-sm'>Ni LME</span>
//                             <input type='text' className='input_style bg-slate-100 text-xs sm:text-sm'
//                                 value={addComma(value?.general?.nilme)}
//                                 readOnly 
//                             />
//                         </div>
//                     </div>

//                     {/* Formula x Ni */}
//                     <div className='flex justify-center mb-4'>
//                         <div className='border border-slate-500 w-24 sm:w-28 flex flex-col'>
//                             <span className='title_style bg-customOrange text-xs sm:text-sm'>Formula x Ni</span>
//                             <input type='text' className='input_style bg-orange-200 text-red-600 text-xs sm:text-sm' 
//                                 value={value?.fenicr?.formulaNiPrice + '%'}
//                                 name='formulaNiPrice' 
//                                 onChange={(e) => handleChange(e, 'fenicr')}
//                                 onBlur={(e) => {
//                                     let num = parseFloat(e.target.value.replace("%", ""));
//                                     if (!isNaN(num)) {
//                                         handleChange({
//                                             target: {
//                                                 name: e.target.name,
//                                                 value: num.toFixed(2),
//                                             },
//                                         }, "fenicr");
//                                     }
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     {/* Results */}
//                     <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4'>
//                         <div className='border border-slate-500 flex flex-col'>
//                             <span className='title_style bg-customLavender text-xs sm:text-sm'>Sales</span>
//                             <span className='title_style text-xs sm:text-sm'>Solids Price:</span>
//                             <input type='text' className='input_style bg-orange-200 text-xs sm:text-sm'
//                                 value={addComma((solidsPrice1).toFixed(2))}
//                                 readOnly 
//                             />
//                         </div>
//                         <div className='border border-slate-500 flex flex-col'>
//                             <span className='title_style text-xs sm:text-sm'>Turnings Price:</span>
//                             <input type='text' className='input_style bg-orange-200 text-xs sm:text-sm'
//                                 value={addComma((solidsPrice1 * 0.9).toFixed(2))}
//                                 readOnly 
//                             />
//                         </div>
//                         <div className='border border-slate-500 flex flex-col'>
//                             <span className='title_style text-xs sm:text-sm'>Price/Euro:</span>
//                             <input type='text' className='input_style bg-customLime text-xs sm:text-sm'
//                                 value={addComma((solidsPrice1 / value.general?.euroRate).toFixed(2), 'a')}
//                                 readOnly 
//                             />
//                         </div>
//                     </div>

//                     <div className='text-red-600 text-xs'>
//                         <p>* Fill in the red and + Formula x Ni</p>
//                         <p>* Fe is calculated automatically</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     ) : null
// };

// export default Fenicr;


import { useState } from "react";

const Fenicr = ({ value, handleChange, focusedField, setFocusedField, addComma }) => {
    const fe = (100 - value?.fenicr?.ni - value?.fenicr?.cr - value?.fenicr?.mo).toFixed(2)
    
    const solidsPrice = value?.fenicr?.ni * value?.general?.nilme * value?.fenicr?.formulaNiCost / 10000 +
        value?.fenicr?.cr * value?.fenicr?.crPrice / 100 +
        value?.fenicr?.mo * value?.fenicr?.moPrice / 100 +
        fe * value?.fenicr?.fePrice / 100

    const solidsPrice1 = value?.fenicr?.ni * value?.general?.nilme / 100 * value?.fenicr?.formulaNiPrice / 100 +
        value?.fenicr?.cr / 100 * value.general?.chargeCrLb * value.general?.mt * value?.fenicr?.crPriceArgus / 100 +
        value?.fenicr?.mo / 100 * (value.general?.MoOxideLb * value?.fenicr?.moPriceArgus * value.general?.mt / 100) +
        fe * value?.fenicr?.fePrice1 / 100

    const formatCurrency = (num, symbol = '$') => {
        if (!num) return symbol + '0';
        const str = num.toString();
        const parts = str.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return symbol + parts.join('.');
    }

    return value.fenicr != null ? (
        <div className='w-full bg-white'>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* COST SECTION */}
                <div className="w-full">
                    <h3 className='text-base font-semibold text-[var(--port-gore)] mb-2'>Cost</h3>
                    
                    {/* Composition */}
                    <div className='mb-3'>
                        <p className='text-sm font-medium text-[var(--regent-gray)] mb-2 text-center'>Composition</p>
                        <div className='flex border border-[var(--rock-blue)] overflow-hidden'>
                            <div className='flex-1'>
                                <div className='bg-[var(--selago)] text-center py-1 text-xs font-semibold border-b border-[var(--rock-blue)]'>Ni</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2 text-sm font-medium border-0 focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]' 
                                    value={value?.fenicr?.ni + '%'}
                                    name='ni' 
                                    onChange={(e) => {
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: e.target.value.replace('%', ''),
                                            },
                                        }, 'fenicr');
                                    }}
                                    onBlur={(e) => {
                                        let num = parseFloat(e.target.value.replace("%", ""));
                                        if (!isNaN(num)) {
                                            handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: num.toFixed(2),
                                                },
                                            }, "fenicr");
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex-1 border-l border-[var(--rock-blue)]'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Cr</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2 text-sm font-medium border-0 focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]' 
                                    value={value?.fenicr?.cr + '%'}
                                    name='cr' 
                                    onChange={(e) => {
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: e.target.value.replace('%', ''),
                                            },
                                        }, 'fenicr');
                                    }}
                                    onBlur={(e) => {
                                        let num = parseFloat(e.target.value.replace("%", ""));
                                        if (!isNaN(num)) {
                                            handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: num.toFixed(2),
                                                },
                                            }, "fenicr");
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex-1 border-l border-[var(--rock-blue)]'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Mo</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2 text-sm font-medium border-0 focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]' 
                                    value={value?.fenicr?.mo + '%'}
                                    name='mo' 
                                    onChange={(e) => {
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: e.target.value.replace('%', ''),
                                            },
                                        }, 'fenicr');
                                    }}
                                    onBlur={(e) => {
                                        let num = parseFloat(e.target.value.replace("%", ""));
                                        if (!isNaN(num)) {
                                            handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: num.toFixed(2),
                                                },
                                            }, "fenicr");
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex-1 border-l border-[var(--rock-blue)]'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Fe</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2.5 text-sm font-medium bg-gray-100 border-0 cursor-not-allowed' 
                                    value={fe + '%'}
                                    readOnly 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price Row */}
                    <div className='mb-3'>
                        <p className='text-sm font-medium text-[var(--regent-gray)] mb-2 text-center'>Price</p>
                        <div className='flex border border-[var(--rock-blue)] overflow-hidden'>
                            <div className='flex-1'>
                                <div className='bg-[var(--selago)] text-center py-1 text-xs font-semibold border-b border-[var(--rock-blue)]'>Ni</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2 text-sm font-semibold bg-[var(--selago)] border-0 cursor-not-allowed' 
                                    value={formatCurrency((value.general?.nilme * value.fenicr?.formulaNiCost / 100).toFixed(2))}
                                    readOnly 
                                />
                            </div>
                            <div className='flex-1 border-l border-gray-400'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Cr</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2 text-sm font-semibold text-[var(--port-gore)] border-0 focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]'
                                    name='crPrice' 
                                    onChange={(e) => handleChange(e, 'fenicr')}
                                    value={focusedField === 'crPrice' ? value.fenicr?.crPrice : formatCurrency(value.fenicr?.crPrice)}
                                    onFocus={() => setFocusedField('crPrice')}
                                    onBlur={(e) => {
                                        setFocusedField(null);
                                        let num = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                                        if (!isNaN(num)) {
                                            handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: num.toFixed(2),
                                                },
                                            }, "fenicr");
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex-1 border-l border-[var(--rock-blue)]'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Mo</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2 text-sm font-semibold text-[var(--endeavour)] border-0 focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]'
                                    name='moPrice' 
                                    onChange={(e) => handleChange(e, 'fenicr')}
                                    value={focusedField === 'moPrice' ? value.fenicr?.moPrice : formatCurrency(value.fenicr?.moPrice)}
                                    onFocus={() => setFocusedField('moPrice')}
                                    onBlur={(e) => {
                                        setFocusedField(null);
                                        let num = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                                        if (!isNaN(num)) {
                                            handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: num.toFixed(2),
                                                },
                                            }, "fenicr");
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex-1 border-l border-gray-400'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Fe</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2 text-sm font-semibold text-[var(--endeavour)] border-0 focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]'
                                    name='fePrice' 
                                    onChange={(e) => handleChange(e, 'fenicr')}
                                    value={focusedField === 'fePrice' ? value.fenicr?.fePrice : formatCurrency(value.fenicr?.fePrice)}
                                    onFocus={() => setFocusedField('fePrice')}
                                    onBlur={(e) => {
                                        setFocusedField(null);
                                        let num = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                                        if (!isNaN(num)) {
                                            handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: num.toFixed(2),
                                                },
                                            }, "fenicr");
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Formula x Ni */}
                    <div className='bg-[var(--selago)] rounded p-2 mb-3'>
                        <p className='text-sm font-semibold text-[var(--port-gore)] mb-2'>Formula x Ni</p>
                        <input 
                            type='text' 
                            className='w-full px-3 py-2 bg-[var(--selago)] border-0 rounded text-center font-bold text-[var(--port-gore)] focus:outline-none focus:ring-2 focus:ring-[var(--endeavour)]' 
                            value={value?.fenicr?.formulaNiCost + '%'}
                            name='formulaNiCost' 
                            onChange={(e) => handleChange(e, 'fenicr')}
                            onBlur={(e) => {
                                let num = parseFloat(e.target.value.replace("%", ""));
                                if (!isNaN(num)) {
                                    handleChange({
                                        target: {
                                            name: e.target.name,
                                            value: num.toFixed(2),
                                        },
                                    }, "fenicr");
                                }
                            }}
                        />
                    </div>

                    {/* Results */}
                    <div className='space-y-2 mb-4'>
                        <div className='flex items-center gap-3'>
                            <span className='text-sm font-medium text-[var(--port-gore)] w-32'>Solids Price:</span>
                            <div className='flex-1 bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2 text-center font-bold text-base'>
                                {formatCurrency(solidsPrice.toFixed(2))}
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-sm font-medium text-[var(--port-gore)] w-32'>Turnings Price:</span>
                            <div className='flex-1 bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * 0.92).toFixed(2))}
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-sm font-medium text-[var(--port-gore)] w-32'>Price/Euro:</span>
                            <div className='flex-1 bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice / value.general?.euroRate).toFixed(2), '€')}
                            </div>
                        </div>
                    </div>

                    <div className='text-xs text-[var(--port-gore)] space-y-1'>
                        <p>* Fill in the red and + Formula x Ni</p>
                        <p>* Fe is calculated automatically</p>
                    </div>
                </div>

                {/* SALES SECTION */}
                <div className="w-full">
                    <h3 className='text-base font-semibold text-gray-700 mb-3'>Sales</h3>
                    
                    {/* Composition (Read-only) */}
                    <div className='mb-3'>
                        <p className='text-sm font-medium text-gray-600 mb-2 text-center'>Composition</p>
                        <div className='flex border border-[var(--rock-blue)] overflow-hidden'>
                            <div className='flex-1'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Ni</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2.5 text-sm font-medium bg-gray-100 border-0 cursor-not-allowed'
                                    value={value?.fenicr?.ni + '%'} 
                                    readOnly 
                                />
                            </div>
                            <div className='flex-1 border-l border-gray-400'>
                                <div className='bg-gray-200 text-center py-1.5 text-xs font-semibold border-b border-gray-400'>Cr</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2.5 text-sm font-medium bg-gray-100 border-0 cursor-not-allowed'
                                    value={value?.fenicr?.cr + '%'} 
                                    readOnly 
                                />
                            </div>
                            <div className='flex-1 border-l border-gray-400'>
                                <div className='bg-gray-200 text-center py-1.5 text-xs font-semibold border-b border-gray-400'>Mo</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2.5 text-sm font-medium bg-gray-100 border-0 cursor-not-allowed'
                                    value={value?.fenicr?.mo + '%'} 
                                    readOnly 
                                />
                            </div>
                            <div className='flex-1 border-l border-gray-400'>
                                <div className='bg-gray-200 text-center py-1.5 text-xs font-semibold border-b border-gray-400'>Fe</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2.5 text-sm font-medium bg-gray-100 border-0 cursor-not-allowed'
                                    value={fe + '%'} 
                                    readOnly 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price Row */}
                    <div className='mb-1'>
                        <p className='text-sm font-medium text-gray-600 mb-2 text-center'>Price</p>
                        <div className='flex border border-[var(--rock-blue)] overflow-hidden'>
                            <div className='flex-1'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Ni</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2.5 text-sm font-semibold bg-gray-50 border-0 cursor-not-allowed' 
                                    value={formatCurrency((value?.general?.nilme * value?.fenicr?.formulaNiPrice / 100).toFixed(2))}
                                    readOnly 
                                />
                            </div>
                            <div className='flex-1 border-l border-[var(--rock-blue)]'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Cr</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2.5 text-sm font-semibold bg-gray-50 border-0 cursor-not-allowed'
                                    value={formatCurrency((value.general?.chargeCrLb * value.general?.mt * value?.fenicr?.crPriceArgus / 100).toFixed(2))} 
                                    readOnly 
                                />
                            </div>
                            <div className='flex-1 border-l border-[var(--rock-blue)]'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Mo</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2.5 text-sm font-semibold bg-gray-50 border-0 cursor-not-allowed'
                                    value={formatCurrency((value.general?.MoOxideLb * value?.fenicr?.moPriceArgus * value.general?.mt / 100).toFixed(2))} 
                                    readOnly 
                                />
                            </div>
                            <div className='flex-1 border-l border-[var(--rock-blue)]'>
                                <div className='bg-[var(--selago)] text-center py-1.5 text-xs font-semibold border-b border-[var(--rock-blue)]'>Fe</div>
                                <input 
                                    type='text' 
                                    className='w-full text-center py-2 text-sm font-semibold text-[var(--endeavour)] border-0 focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]'
                                    name='fePrice1' 
                                    onChange={(e) => handleChange(e, 'fenicr')}
                                    value={focusedField === 'fePrice1' ? value.fenicr?.fePrice1 : formatCurrency(value.fenicr?.fePrice1)}
                                    onFocus={() => setFocusedField('fePrice1')}
                                    onBlur={(e) => {
                                        setFocusedField(null);
                                        let num = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                                        if (!isNaN(num)) {
                                            handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: num.toFixed(2),
                                                },
                                            }, "fenicr");
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Argus Info Row */}
                    <div className='flex mb-3'>
                        <div className='flex-1 text-center py-1 text-xs text-gray-500'>
                            Lb {formatCurrency(((value?.general?.nilme * value?.fenicr?.formulaNiPrice / 100) / (value?.general?.mt)).toFixed(2))}
                        </div>
                        <div className='flex-1 text-center py-1 text-xs text-[var(--port-gore)] font-medium'>
                            Argus {value?.fenicr?.crPriceArgus}%
                        </div>
                        <div className='flex-1 text-center py-1 text-xs text-[var(--port-gore)] font-medium'>
                            Argus {value?.fenicr?.moPriceArgus}%
                        </div>
                        <div className='flex-1'></div>
                    </div>

                    {/* Formula x Ni */}
                    <div className='bg-[var(--selago)] rounded p-3 mb-4'>
                        <p className='text-sm font-semibold text-gray-800 mb-2'>Formula x Ni</p>
                        <input 
                            type='text' 
                            className='w-full px-3 py-2.5 bg-[var(--selago)] border-0 rounded text-center font-bold text-[var(--port-gore)] focus:outline-none focus:ring-2 focus:ring-[var(--endeavour)]' 
                            value={value?.fenicr?.formulaNiPrice + '%'}
                            name='formulaNiPrice' 
                            onChange={(e) => handleChange(e, 'fenicr')}
                            onBlur={(e) => {
                                let num = parseFloat(e.target.value.replace("%", ""));
                                if (!isNaN(num)) {
                                    handleChange({
                                        target: {
                                            name: e.target.name,
                                            value: num.toFixed(2),
                                        },
                                    }, "fenicr");
                                }
                            }}
                        />
                    </div>

                    {/* Results */}
                    <div className='space-y-2 mb-4'>
                        <div className='flex items-center gap-3'>
                            <span className='text-sm font-medium text-gray-700 w-32'>Solids Price:</span>
                            <div className='flex-1 bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency(solidsPrice1.toFixed(2))}
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-sm font-medium text-gray-700 w-32'>Turnings Price:</span>
                            <div className='flex-1 bg-gray-100 border border-gray-300 rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice1 * 0.9).toFixed(2))}
                            </div>
                        </div>
                        <div className='flex items-center gap-3'>
                            <span className='text-sm font-medium text-gray-700 w-32'>Price/Euro:</span>
                            <div className='flex-1 bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice1 / value.general?.euroRate).toFixed(2), '€')}
                            </div>
                        </div>
                    </div>

                    <div className='text-xs text-[var(--port-gore)] space-y-1'>
                        <p>* Fill in the red and + Formula x Ni</p>
                        <p>* Fe is calculated automatically</p>
                    </div>
                </div>
            </div>
        </div>
    ) : null
};

export default Fenicr;
