// // import { useState } from "react";

// // const CellPerc = ({ num, name, title, handleChange }) => {
// //     return (
// //         <div className={`border border-slate-500 w-24 flex flex-col justify-center ${name === 'fe' ? '' : 'border-r-0'}`}>
// //             <span className="title_style">{title}</span>
// //             <input
// //                 type="text"
// //                 className={`input_style ${name === "fe" ? "bg-slate-100" : "text-red-700"}`}
// //                 name={name}
// //                 value={
// //                     num !== undefined && num !== ""
// //                         ? (name === "fe" ? parseFloat(num).toFixed(2) + "%" : num + "%")
// //                         : "0.00%"
// //                 }
// //                 onChange={(e) => {
// //                     if (name === "fe") return; // disable editing for 'fe'
// //                     handleChange(
// //                         {
// //                             target: {
// //                                 name: e.target.name,
// //                                 value: e.target.value.replace("%", ""),
// //                             },
// //                         },
// //                         "supperalloys"
// //                     );
// //                 }}
// //                 onBlur={(e) => {
// //                     if (name === "fe") return; // no formatting for 'fe', just display
// //                     let n = parseFloat(e.target.value.replace("%", ""));
// //                     if (isNaN(n)) n = 0; // default to 0
// //                     handleChange(
// //                         {
// //                             target: {
// //                                 name: e.target.name,
// //                                 value: n.toFixed(2), // store with 2 decimals
// //                             },
// //                         },
// //                         "supperalloys"
// //                     );
// //                 }}
// //             />

// //         </div>
// //     );
// // };


// // const CellPrice = ({ num, name, title, handleChange, setFocusedField }) => {
// //     return (
// //         <div className={`border border-slate-500 w-24 flex flex-col justify-center ${name === 'fePrice' ? '' : 'border-r-0'}`}>
// //             <span className="title_style">{title}</span>
// //             <input
// //                 type="text"
// //                 className={`input_style ${name === 'niPrice' || name === 'MoOxideLb' ? 'cursor-default bg-slate-100' : 'text-red-700'} `}
// //                 name={name}
// //                 value={num}
// //                 onChange={e => handleChange({
// //                     target: {
// //                         name: e.target.name,
// //                         value: e.target.value.replace('%', ''),
// //                     },
// //                 }, 'supperalloys')}
// //                 onFocus={() => {
// //                     if (name === "niPrice" || name === 'MoOxideLb') return; // skip for niPrice
// //                     setFocusedField(name);
// //                 }}
// //                 //  onBlur={() => setFocusedField(null)}
// //                 onBlur={(e) => {
// //                     if (name === "niPrice" || name === 'MoOxideLb') return; // no formatting for 'fe', just display
// //                     let n = parseFloat(e.target.value.replace("%", ""));
// //                     setFocusedField(null)
// //                     if (isNaN(n)) n = 0; // default to 0
// //                     handleChange(
// //                         {
// //                             target: {
// //                                 name: e.target.name,
// //                                 value: n.toFixed(2), // store with 2 decimals
// //                             },
// //                         },
// //                         "supperalloys"
// //                     );
// //                 }}
// //             />
// //         </div>
// //     );
// // };

// // const SupperAlloys = ({ value, handleChange }) => {

// //     const [focusedField, setFocusedField] = useState(null);
// //     const fe = 100 - value?.supperalloys?.ni - value?.supperalloys?.cr - value?.supperalloys?.mo -
// //         value?.supperalloys?.nb - value?.supperalloys?.co - value?.supperalloys?.w -
// //         value?.supperalloys?.hf - value?.supperalloys?.ta

// //     const solidsPrice = value?.supperalloys?.ni * (value.general.nilme / value.general.mt) / 100 +
// //         value?.supperalloys?.cr * value?.supperalloys?.crPrice / 100 +
// //         value?.supperalloys?.mo * value?.supperalloys?.moPrice / 100 +
// //         value?.supperalloys?.nb * value?.supperalloys?.nbPrice / 100 +
// //         value?.supperalloys?.co * value?.supperalloys?.coPrice / 100 +
// //         value?.supperalloys?.w * value?.supperalloys?.wPrice / 100 +
// //         value?.supperalloys?.hf * value?.supperalloys?.hfPrice / 100 +
// //         value?.supperalloys?.ta * value?.supperalloys?.taPrice / 100


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


// //     return (
// //         <div className='border border-slate-300 p-3 rounded-lg flex flex-col md:flex-row w-full'>
// //             <div className='justify-start'>
// //                 <p className='text-center text-slate-600 text-lg font-semibold'>Cost</p>
// //                 <p className='text-center text-slate-600 text-sm font-semibold'>Composition</p>
// //                 <div className='flex justify-center'>
// //                     <CellPerc num={value.supperalloys?.ni} name='ni' title='Ni' handleChange={handleChange} />
// //                     <CellPerc num={value?.supperalloys?.cr} name='cr' title='Cr' handleChange={handleChange} />
// //                     <CellPerc num={value?.supperalloys?.mo} name='mo' title='Mo' handleChange={handleChange} />
// //                     <CellPerc num={value?.supperalloys?.nb} name='nb' title='Nb' handleChange={handleChange} />
// //                     <CellPerc num={value?.supperalloys?.co} name='co' title='Co' handleChange={handleChange} />
// //                     <CellPerc num={value?.supperalloys?.w} name='w' title='W' handleChange={handleChange} />
// //                     <CellPerc num={value?.supperalloys?.hf} name='hf' title='Hf' handleChange={handleChange} />
// //                     <CellPerc num={value?.supperalloys?.ta} name='ta' title='Ta' handleChange={handleChange} />
// //                     <CellPerc num={fe} name='fe' title='Fe' handleChange={{}} />
// //                 </div>

// //                 <p className='text-center text-slate-600 text-sm font-semibold pt-2'>Price/Lbs</p>
// //                 <div className='flex justify-center'>
// //                     <CellPrice num={addComma((value.general.nilme / value.general.mt).toFixed(2))} name='niPrice' title='Ni' handleChange={handleChange} />
// //                     <CellPrice num={focusedField === 'crPrice' ? value.supperalloys?.crPrice : addComma(value.supperalloys?.crPrice)}
// //                         name='crPrice' title='Cr' handleChange={handleChange} setFocusedField={setFocusedField} />
// //                     <CellPrice num={addComma(value?.general?.MoOxideLb)} name='MoOxideLb' title='Mo' handleChange={handleChange} />
// //                     <CellPrice num={focusedField === 'nbPrice' ? value.supperalloys?.nbPrice : addComma(value.supperalloys?.nbPrice)}
// //                         name='nbPrice' title='Nb' handleChange={handleChange} setFocusedField={setFocusedField} />
// //                     <CellPrice num={focusedField === 'coPrice' ? value.supperalloys?.coPrice : addComma(value.supperalloys?.coPrice)}
// //                         name='coPrice' title='Co' handleChange={handleChange} setFocusedField={setFocusedField} />
// //                     <CellPrice num={focusedField === 'wPrice' ? value.supperalloys?.wPrice : addComma(value.supperalloys?.wPrice)}
// //                         name='wPrice' title='W' handleChange={handleChange} setFocusedField={setFocusedField} />
// //                     <CellPrice num={focusedField === 'hfPrice' ? value.supperalloys?.hfPrice : addComma(value.supperalloys?.hfPrice)}
// //                         name='hfPrice' title='Hf' handleChange={handleChange} setFocusedField={setFocusedField} />
// //                     <CellPrice num={focusedField === 'taPrice' ? value.supperalloys?.taPrice : addComma(value.supperalloys?.taPrice)}
// //                         name='taPrice' title='Ta' handleChange={handleChange} setFocusedField={setFocusedField} />
// //                     <CellPrice num={focusedField === 'fePrice' ? value.supperalloys?.fePrice : addComma(value.supperalloys?.fePrice)}
// //                         name='fePrice' title='Fe' handleChange={handleChange} setFocusedField={setFocusedField} />
// //                 </div>



// //                 <div className="grid-cols-2 gap-10 w-full pt-6 justify-between flex">
// //                     <div className="col-span-2 md:col-span-1 justify-center flex">

// //                         <div className=''>
// //                             <div className='border border-slate-500 w-24 flex flex-col justify-center text-center'>
// //                                 <span className='title_style bg-customOrange'> Formula Intrinsic</span>
// //                                 <input type='text' className='input_style bg-orange-200 text-red-600' value={value?.supperalloys?.formulaIntsCost + '%'}
// //                                     name='formulaIntsCost' onChange={(e) => handleChange(e, 'supperalloys')}
// //                                     onBlur={(e) => {
// //                                         let num = parseFloat(e.target.value.replace("%", ""));
// //                                         if (isNaN(num)) num = 0; // default to 0
// //                                         handleChange(
// //                                             {
// //                                                 target: {
// //                                                     name: e.target.name,
// //                                                     value: num.toFixed(2), // store with 2 decimals
// //                                                 },
// //                                             },
// //                                             "supperalloys"
// //                                         );
// //                                     }} />
// //                             </div>

// //                             <div className='pt-6 gap-5 flex items-end'>
// //                                 <div className='border border-slate-500 w-24 flex flex-col'>
// //                                     <span className='title_style bg-customLavender'>Cost</span>
// //                                     <span className='title_style'>Solids Price:</span>
// //                                     <input type='text' className='input_style bg-orange-200'
// //                                         value={addComma((solidsPrice * value?.supperalloys?.formulaIntsCost / 100).toFixed(2))}
// //                                         name='formulaNi' onChange={(e) => { }} />
// //                                 </div>
// //                                 <div className='border border-slate-500 w-24 flex flex-col'>
// //                                     <span className='title_style bg-blue-300'>Price per MT:</span>
// //                                     <input type='text' className='input_style bg-slate-100 '
// //                                         value={addComma((solidsPrice * value?.supperalloys?.formulaIntsCost / 100 * value.general.mt).toFixed(2))}
// //                                         name='formulaNi' onChange={(e) => { }} />
// //                                 </div>
// //                                 <div className='border border-slate-500 w-24 flex flex-col'>
// //                                     <span className='title_style'>Price/Euro:</span>
// //                                     <input type='text' className='input_style bg-customLime'
// //                                         value={addComma((solidsPrice * value?.supperalloys?.formulaIntsCost / 100 / value.general?.euroRate).toFixed(2), 'a')}
// //                                         name='formulaNi' onChange={(e) => { }} />
// //                                 </div>
// //                             </div>
// //                             <div className='border border-slate-500 w-24 mt-4 flex flex-col'>
// //                                 <span className='title_style '>Turnings Price:</span>
// //                                 <input type='text' className='input_style bg-orange-200'
// //                                     value={addComma((solidsPrice * value?.supperalloys?.formulaIntsCost / 100 * 0.95).toFixed(2))}
// //                                     name='formulaNi' onChange={(e) => { }} />
// //                             </div>
// //                             <div className='pt-4 text-red-600'>
// //                                 <p className="text-xs">* Fill in the red and + Formula x Ni</p>
// //                                 <p className="text-xs">* Fe is calculated automatically</p>
// //                             </div>
// //                         </div>
// //                     </div>



// //                     <div className="col-span-2 md:col-span-1 justify-center flex">
// //                         <div className='flex'>
// //                             <div className=''>
// //                                 <div className='border border-slate-500 w-24 flex flex-col justify-center'>
// //                                     <span className='title_style bg-customOrange text-center'> Formula Intrinsic</span>
// //                                     <input type='text' className='input_style bg-orange-200 text-red-600' value={value?.supperalloys?.formulaIntsPrice + '%'}
// //                                         name='formulaIntsPrice' onChange={(e) => handleChange(e, 'supperalloys')}
// //                                         onBlur={(e) => {
// //                                             let num = parseFloat(e.target.value.replace("%", ""));
// //                                             if (isNaN(num)) num = 0; // default to 0
// //                                             handleChange(
// //                                                 {
// //                                                     target: {
// //                                                         name: e.target.name,
// //                                                         value: num.toFixed(2), // store with 2 decimals
// //                                                     },
// //                                                 },
// //                                                 "supperalloys"
// //                                             );
// //                                         }} />
// //                                 </div>
// //                                 <div className='pt-6 gap-5 flex items-end'>
// //                                     <div className='border border-slate-500 w-24 flex flex-col'>
// //                                         <span className='title_style bg-customLavender'>Sales</span>
// //                                         <span className='title_style'>Solids Price:</span>
// //                                         <input type='text' className='input_style bg-orange-200 '
// //                                             value={addComma((solidsPrice * value?.supperalloys?.formulaIntsPrice / 100).toFixed(2))}
// //                                             onChange={(e) => { }} />
// //                                     </div>
// //                                     <div className='border border-slate-500 w-24 flex flex-col'>
// //                                         <span className='title_style bg-blue-300'>Price per MT:</span>
// //                                         <input type='text' className='input_style bg-slate-100 '
// //                                             value={addComma((solidsPrice * value?.supperalloys?.formulaIntsPrice / 100 * value.general.mt).toFixed(2))}
// //                                             name='formulaNi' onChange={(e) => { }} />
// //                                     </div>

// //                                     <div className='border border-slate-500 w-24 flex flex-col'>
// //                                         <span className='title_style'>Price/Euro:</span>
// //                                         <input type='text' className='input_style bg-customLime '
// //                                             value={addComma((solidsPrice * value?.supperalloys?.formulaIntsPrice / 100 / value.general?.euroRate).toFixed(2), 'a')}
// //                                             name='formulaNi' onChange={(e) => { }} />
// //                                     </div>
// //                                 </div>
// //                                 <div className='border border-slate-500 w-24 mt-4 flex flex-col'>
// //                                     <span className='title_style'>Turnings Price:</span>
// //                                     <input type='text' className='input_style bg-orange-200'
// //                                         value={addComma((solidsPrice * value?.supperalloys?.formulaIntsPrice / 100 * 0.95).toFixed(2))}
// //                                         name='formulaNi' onChange={(e) => { }} />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // };

// // export default SupperAlloys;
// import { useState } from "react";

// const CellPerc = ({ num, name, title, handleChange }) => {
//     return (
//         <div className='border border-slate-500 min-w-[70px] sm:min-w-[80px] flex flex-col justify-center'>
//             <span className="title_style text-xs sm:text-sm">{title}</span>
//             <input
//                 type="text"
//                 className={`input_style text-xs sm:text-sm ${name === "fe" ? "bg-slate-100" : "text-red-700"}`}
//                 name={name}
//                 value={
//                     num !== undefined && num !== ""
//                         ? (name === "fe" ? parseFloat(num).toFixed(2) + "%" : num + "%")
//                         : "0.00%"
//                 }
//                 onChange={(e) => {
//                     if (name === "fe") return;
//                     handleChange(
//                         {
//                             target: {
//                                 name: e.target.name,
//                                 value: e.target.value.replace("%", ""),
//                             },
//                         },
//                         "supperalloys"
//                     );
//                 }}
//                 onBlur={(e) => {
//                     if (name === "fe") return;
//                     let n = parseFloat(e.target.value.replace("%", ""));
//                     if (isNaN(n)) n = 0;
//                     handleChange(
//                         {
//                             target: {
//                                 name: e.target.name,
//                                 value: n.toFixed(2),
//                             },
//                         },
//                         "supperalloys"
//                     );
//                 }}
//             />
//         </div>
//     );
// };

// const CellPrice = ({ num, name, title, handleChange, setFocusedField }) => {
//     return (
//         <div className='border border-slate-500 min-w-[70px] sm:min-w-[80px] flex flex-col justify-center'>
//             <span className="title_style text-xs sm:text-sm">{title}</span>
//             <input
//                 type="text"
//                 className={`input_style text-xs sm:text-sm ${name === 'niPrice' || name === 'MoOxideLb' ? 'cursor-default bg-slate-100' : 'text-red-700'}`}
//                 name={name}
//                 value={num}
//                 onChange={e => handleChange({
//                     target: {
//                         name: e.target.name,
//                         value: e.target.value.replace('%', ''),
//                     },
//                 }, 'supperalloys')}
//                 onFocus={() => {
//                     if (name === "niPrice" || name === 'MoOxideLb') return;
//                     setFocusedField(name);
//                 }}
//                 onBlur={(e) => {
//                     if (name === "niPrice" || name === 'MoOxideLb') return;
//                     let n = parseFloat(e.target.value.replace("%", ""));
//                     setFocusedField(null)
//                     if (isNaN(n)) n = 0;
//                     handleChange(
//                         {
//                             target: {
//                                 name: e.target.name,
//                                 value: n.toFixed(2),
//                             },
//                         },
//                         "supperalloys"
//                     );
//                 }}
//             />
//         </div>
//     );
// };

// const SupperAlloys = ({ value, handleChange }) => {
//     const [focusedField, setFocusedField] = useState(null);
    
//     const fe = 100 - value?.supperalloys?.ni - value?.supperalloys?.cr - value?.supperalloys?.mo -
//         value?.supperalloys?.nb - value?.supperalloys?.co - value?.supperalloys?.w -
//         value?.supperalloys?.hf - value?.supperalloys?.ta

//     const solidsPrice = value?.supperalloys?.ni * (value.general.nilme / value.general.mt) / 100 +
//         value?.supperalloys?.cr * value?.supperalloys?.crPrice / 100 +
//         value?.supperalloys?.mo * value?.supperalloys?.moPrice / 100 +
//         value?.supperalloys?.nb * value?.supperalloys?.nbPrice / 100 +
//         value?.supperalloys?.co * value?.supperalloys?.coPrice / 100 +
//         value?.supperalloys?.w * value?.supperalloys?.wPrice / 100 +
//         value?.supperalloys?.hf * value?.supperalloys?.hfPrice / 100 +
//         value?.supperalloys?.ta * value?.supperalloys?.taPrice / 100

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

//     return (
//         <div className='border border-slate-300 p-2 sm:p-3 rounded-lg w-full'>
//             <div className='w-full'>
//                 <p className='text-center text-slate-600 text-base sm:text-lg font-semibold mb-3'>Cost</p>
                
//                 {/* Composition Section */}
//                 <p className='text-center text-slate-600 text-sm font-semibold mb-2'>Composition</p>
//                 <div className='overflow-x-auto mb-4'>
//                     <div className='flex justify-center gap-0 min-w-[650px]'>
//                         <CellPerc num={value.supperalloys?.ni} name='ni' title='Ni' handleChange={handleChange} />
//                         <CellPerc num={value?.supperalloys?.cr} name='cr' title='Cr' handleChange={handleChange} />
//                         <CellPerc num={value?.supperalloys?.mo} name='mo' title='Mo' handleChange={handleChange} />
//                         <CellPerc num={value?.supperalloys?.nb} name='nb' title='Nb' handleChange={handleChange} />
//                         <CellPerc num={value?.supperalloys?.co} name='co' title='Co' handleChange={handleChange} />
//                         <CellPerc num={value?.supperalloys?.w} name='w' title='W' handleChange={handleChange} />
//                         <CellPerc num={value?.supperalloys?.hf} name='hf' title='Hf' handleChange={handleChange} />
//                         <CellPerc num={value?.supperalloys?.ta} name='ta' title='Ta' handleChange={handleChange} />
//                         <CellPerc num={fe} name='fe' title='Fe' handleChange={{}} />
//                     </div>
//                 </div>

//                 {/* Price/Lbs Section */}
//                 <p className='text-center text-slate-600 text-sm font-semibold mb-2'>Price/Lbs</p>
//                 <div className='overflow-x-auto mb-6'>
//                     <div className='flex justify-center gap-0 min-w-[650px]'>
//                         <CellPrice 
//                             num={addComma((value.general.nilme / value.general.mt).toFixed(2))} 
//                             name='niPrice' 
//                             title='Ni' 
//                             handleChange={handleChange} 
//                             setFocusedField={setFocusedField}
//                         />
//                         <CellPrice 
//                             num={focusedField === 'crPrice' ? value.supperalloys?.crPrice : addComma(value.supperalloys?.crPrice)}
//                             name='crPrice' 
//                             title='Cr' 
//                             handleChange={handleChange} 
//                             setFocusedField={setFocusedField} 
//                         />
//                         <CellPrice 
//                             num={addComma(value?.general?.MoOxideLb)} 
//                             name='MoOxideLb' 
//                             title='Mo' 
//                             handleChange={handleChange}
//                             setFocusedField={setFocusedField}
//                         />
//                         <CellPrice 
//                             num={focusedField === 'nbPrice' ? value.supperalloys?.nbPrice : addComma(value.supperalloys?.nbPrice)}
//                             name='nbPrice' 
//                             title='Nb' 
//                             handleChange={handleChange} 
//                             setFocusedField={setFocusedField} 
//                         />
//                         <CellPrice 
//                             num={focusedField === 'coPrice' ? value.supperalloys?.coPrice : addComma(value.supperalloys?.coPrice)}
//                             name='coPrice' 
//                             title='Co' 
//                             handleChange={handleChange} 
//                             setFocusedField={setFocusedField} 
//                         />
//                         <CellPrice 
//                             num={focusedField === 'wPrice' ? value.supperalloys?.wPrice : addComma(value.supperalloys?.wPrice)}
//                             name='wPrice' 
//                             title='W' 
//                             handleChange={handleChange} 
//                             setFocusedField={setFocusedField} 
//                         />
//                         <CellPrice 
//                             num={focusedField === 'hfPrice' ? value.supperalloys?.hfPrice : addComma(value.supperalloys?.hfPrice)}
//                             name='hfPrice' 
//                             title='Hf' 
//                             handleChange={handleChange} 
//                             setFocusedField={setFocusedField} 
//                         />
//                         <CellPrice 
//                             num={focusedField === 'taPrice' ? value.supperalloys?.taPrice : addComma(value.supperalloys?.taPrice)}
//                             name='taPrice' 
//                             title='Ta' 
//                             handleChange={handleChange} 
//                             setFocusedField={setFocusedField} 
//                         />
//                         <CellPrice 
//                             num={focusedField === 'fePrice' ? value.supperalloys?.fePrice : addComma(value.supperalloys?.fePrice)}
//                             name='fePrice' 
//                             title='Fe' 
//                             handleChange={handleChange} 
//                             setFocusedField={setFocusedField} 
//                         />
//                     </div>
//                 </div>

//                 {/* Results Section - Two columns on desktop, stack on mobile */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//                     {/* Cost Column */}
//                     <div className="flex flex-col items-center">
//                         <div className='border border-slate-500 w-full max-w-[200px] flex flex-col justify-center text-center mb-4'>
//                             <span className='title_style bg-customOrange text-xs sm:text-sm'>Formula Intrinsic</span>
//                             <input 
//                                 type='text' 
//                                 className='input_style bg-orange-200 text-red-600 text-xs sm:text-sm' 
//                                 value={value?.supperalloys?.formulaIntsCost + '%'}
//                                 name='formulaIntsCost' 
//                                 onChange={(e) => handleChange(e, 'supperalloys')}
//                                 onBlur={(e) => {
//                                     let num = parseFloat(e.target.value.replace("%", ""));
//                                     if (isNaN(num)) num = 0;
//                                     handleChange(
//                                         {
//                                             target: {
//                                                 name: e.target.name,
//                                                 value: num.toFixed(2),
//                                             },
//                                         },
//                                         "supperalloys"
//                                     );
//                                 }} 
//                             />
//                         </div>

//                         <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 w-full mb-4'>
//                             <div className='border border-slate-500 flex flex-col'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Cost</span>
//                                 <span className='title_style text-xs sm:text-sm'>Solids Price:</span>
//                                 <input 
//                                     type='text' 
//                                     className='input_style bg-orange-200 text-xs sm:text-sm'
//                                     value={addComma((solidsPrice * value?.supperalloys?.formulaIntsCost / 100).toFixed(2))}
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border border-slate-500 flex flex-col'>
//                                 <span className='title_style bg-blue-300 text-xs sm:text-sm'>Price per MT:</span>
//                                 <input 
//                                     type='text' 
//                                     className='input_style bg-slate-100 text-xs sm:text-sm'
//                                     value={addComma((solidsPrice * value?.supperalloys?.formulaIntsCost / 100 * value.general.mt).toFixed(2))}
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border border-slate-500 flex flex-col'>
//                                 <span className='title_style text-xs sm:text-sm'>Price/Euro:</span>
//                                 <input 
//                                     type='text' 
//                                     className='input_style bg-customLime text-xs sm:text-sm'
//                                     value={addComma((solidsPrice * value?.supperalloys?.formulaIntsCost / 100 / value.general?.euroRate).toFixed(2), 'a')}
//                                     readOnly 
//                                 />
//                             </div>
//                         </div>

//                         <div className='border border-slate-500 w-full max-w-[200px] flex flex-col mb-4'>
//                             <span className='title_style text-xs sm:text-sm'>Turnings Price:</span>
//                             <input 
//                                 type='text' 
//                                 className='input_style bg-orange-200 text-xs sm:text-sm'
//                                 value={addComma((solidsPrice * value?.supperalloys?.formulaIntsCost / 100 * 0.95).toFixed(2))}
//                                 readOnly 
//                             />
//                         </div>

//                         <div className='text-red-600 text-xs'>
//                             <p>* Fill in the red and + Formula x Ni</p>
//                             <p>* Fe is calculated automatically</p>
//                         </div>
//                     </div>

//                     {/* Sales Column */}
//                     <div className="flex flex-col items-center">
//                         <div className='border border-slate-500 w-full max-w-[200px] flex flex-col justify-center mb-4'>
//                             <span className='title_style bg-customOrange text-center text-xs sm:text-sm'>Formula Intrinsic</span>
//                             <input 
//                                 type='text' 
//                                 className='input_style bg-orange-200 text-red-600 text-xs sm:text-sm' 
//                                 value={value?.supperalloys?.formulaIntsPrice + '%'}
//                                 name='formulaIntsPrice' 
//                                 onChange={(e) => handleChange(e, 'supperalloys')}
//                                 onBlur={(e) => {
//                                     let num = parseFloat(e.target.value.replace("%", ""));
//                                     if (isNaN(num)) num = 0;
//                                     handleChange(
//                                         {
//                                             target: {
//                                                 name: e.target.name,
//                                                 value: num.toFixed(2),
//                                             },
//                                         },
//                                         "supperalloys"
//                                     );
//                                 }} 
//                             />
//                         </div>

//                         <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 w-full mb-4'>
//                             <div className='border border-slate-500 flex flex-col'>
//                                 <span className='title_style bg-customLavender text-xs sm:text-sm'>Sales</span>
//                                 <span className='title_style text-xs sm:text-sm'>Solids Price:</span>
//                                 <input 
//                                     type='text' 
//                                     className='input_style bg-orange-200 text-xs sm:text-sm'
//                                     value={addComma((solidsPrice * value?.supperalloys?.formulaIntsPrice / 100).toFixed(2))}
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border border-slate-500 flex flex-col'>
//                                 <span className='title_style bg-blue-300 text-xs sm:text-sm'>Price per MT:</span>
//                                 <input 
//                                     type='text' 
//                                     className='input_style bg-slate-100 text-xs sm:text-sm'
//                                     value={addComma((solidsPrice * value?.supperalloys?.formulaIntsPrice / 100 * value.general.mt).toFixed(2))}
//                                     readOnly 
//                                 />
//                             </div>
//                             <div className='border border-slate-500 flex flex-col'>
//                                 <span className='title_style text-xs sm:text-sm'>Price/Euro:</span>
//                                 <input 
//                                     type='text' 
//                                     className='input_style bg-customLime text-xs sm:text-sm'
//                                     value={addComma((solidsPrice * value?.supperalloys?.formulaIntsPrice / 100 / value.general?.euroRate).toFixed(2), 'a')}
//                                     readOnly 
//                                 />
//                             </div>
//                         </div>

//                         <div className='border border-slate-500 w-full max-w-[200px] flex flex-col'>
//                             <span className='title_style text-xs sm:text-sm'>Turnings Price:</span>
//                             <input 
//                                 type='text' 
//                                 className='input_style bg-orange-200 text-xs sm:text-sm'
//                                 value={addComma((solidsPrice * value?.supperalloys?.formulaIntsPrice / 100 * 0.95).toFixed(2))}
//                                 readOnly 
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default SupperAlloys;

import { useState } from "react";

const SupperAlloys = ({ value, handleChange }) => {
    const [focusedField, setFocusedField] = useState(null);
    
    const fe = (100 - (value?.supperalloys?.ni || 0) - (value?.supperalloys?.cr || 0) - (value?.supperalloys?.mo || 0) -
        (value?.supperalloys?.nb || 0) - (value?.supperalloys?.co || 0) - (value?.supperalloys?.w || 0) -
        (value?.supperalloys?.hf || 0) - (value?.supperalloys?.ta || 0)).toFixed(2);

    const solidsPrice = (value?.supperalloys?.ni || 0) * (value.general.nilme / value.general.mt) / 100 +
        (value?.supperalloys?.cr || 0) * (value?.supperalloys?.crPrice || 0) / 100 +
        (value?.supperalloys?.mo || 0) * (value?.supperalloys?.moPrice || 0) / 100 +
        (value?.supperalloys?.nb || 0) * (value?.supperalloys?.nbPrice || 0) / 100 +
        (value?.supperalloys?.co || 0) * (value?.supperalloys?.coPrice || 0) / 100 +
        (value?.supperalloys?.w || 0) * (value?.supperalloys?.wPrice || 0) / 100 +
        (value?.supperalloys?.hf || 0) * (value?.supperalloys?.hfPrice || 0) / 100 +
        (value?.supperalloys?.ta || 0) * (value?.supperalloys?.taPrice || 0) / 100;

    const formatCurrency = (num, symbol = '$') => {
        if (!num && num !== 0) return symbol + '0';
        const str = num.toString();
        const parts = str.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return symbol + parts.join('.');
    };

    const elements = ['ni', 'cr', 'mo', 'nb', 'co', 'w', 'hf', 'ta', 'fe'];
    const elementLabels = ['Ni', 'Cr', 'Mo', 'Nb', 'Co', 'W', 'Hf', 'Ta', 'Fe'];
    const priceFields = ['niPrice', 'crPrice', 'MoOxideLb', 'nbPrice', 'coPrice', 'wPrice', 'hfPrice', 'taPrice', 'fePrice'];

    return value.supperalloys != null ? (
        <div className='w-full bg-white'>
            <h3 className='text-base font-semibold text-[var(--port-gore)] mb-3 text-center'>Cost</h3>
            
            {/* Composition Section */}
            <p className='text-sm font-medium text-[var(--regent-gray)] mb-2 text-center'>Composition</p>
            <div className='overflow-x-auto mb-3'>
                <div className='flex border border-[var(--rock-blue)] overflow-hidden' style={{minWidth: '700px'}}>
                    {elements.map((elem, idx) => (
                        <div key={elem} className={`flex-1 min-w-[70px] ${idx > 0 ? 'border-l border-gray-400' : ''}`}>
                            <div className='bg-[var(--selago)] text-center py-1 text-xs font-semibold border-b border-[var(--rock-blue)]'>
                                {elementLabels[idx]}
                            </div>
                            <input
                                type="text"
                                className={`w-full text-center py-2 text-sm font-medium border-0 ${elem === 'fe' ? 'bg-[var(--selago)] cursor-not-allowed' : 'focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]'}`}
                                name={elem}
                                value={elem === 'fe' ? fe + '%' : (value.supperalloys?.[elem] || '0') + '%'}
                                readOnly={elem === 'fe'}
                                onChange={(e) => {
                                    if (elem === 'fe') return;
                                    handleChange({
                                        target: {
                                            name: e.target.name,
                                            value: e.target.value.replace("%", ""),
                                        },
                                    }, "supperalloys");
                                }}
                                onBlur={(e) => {
                                    if (elem === 'fe') return;
                                    let n = parseFloat(e.target.value.replace("%", ""));
                                    if (!isNaN(n)) {
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: n.toFixed(2),
                                            },
                                        }, "supperalloys");
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Price/Lbs Section */}
            <p className='text-sm font-medium text-[var(--regent-gray)] mb-2 text-center'>Price/Lbs</p>
            <div className='overflow-x-auto mb-6'>
                <div className='flex border border-gray-400 overflow-hidden' style={{minWidth: '700px'}}>
                    {priceFields.map((field, idx) => {
                        const isReadOnly = field === 'niPrice' || field === 'MoOxideLb';
                        const displayValue = field === 'niPrice' 
                            ? formatCurrency((value.general.nilme / value.general.mt).toFixed(2))
                            : field === 'MoOxideLb'
                            ? formatCurrency(value?.general?.MoOxideLb || '0')
                            : focusedField === field 
                            ? value.supperalloys?.[field] || ''
                            : formatCurrency(value.supperalloys?.[field] || '0');

                        return (
                            <div key={field} className={`flex-1 min-w-[70px] ${idx > 0 ? 'border-l border-gray-400' : ''}`}>
                                <div className='bg-purple-100 text-center py-1.5 text-xs font-semibold border-b border-gray-400'>
                                    {elementLabels[idx]}
                                </div>
                                <input
                                    type="text"
                                    className={`w-full text-center py-2.5 text-sm font-semibold border-0 ${
                                        isReadOnly 
                                        ? 'bg-gray-50 cursor-not-allowed' 
                                        : 'text-[var(--endeavour)] focus:outline-none focus:ring-1 focus:ring-[var(--endeavour)]'
                                    }`}
                                    name={field}
                                    value={displayValue}
                                    readOnly={isReadOnly}
                                    onChange={(e) => {
                                        if (isReadOnly) return;
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: e.target.value.replace(/[^0-9.]/g, ''),
                                            },
                                        }, 'supperalloys');
                                    }}
                                    onFocus={() => {
                                        if (!isReadOnly) setFocusedField(field);
                                    }}
                                    onBlur={(e) => {
                                        if (isReadOnly) return;
                                        setFocusedField(null);
                                        let n = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
                                        if (!isNaN(n)) {
                                            handleChange({
                                                target: {
                                                    name: e.target.name,
                                                    value: n.toFixed(2),
                                                },
                                            }, "supperalloys");
                                        }
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-4xl mx-auto">
                {/* Formula Intrinsic Boxes */}
                <div className='flex gap-4 mb-6 justify-center flex-wrap'>
                    <div className='bg-[var(--selago)] rounded-lg p-3 w-full sm:w-auto sm:min-w-[200px]'>
                        <p className='text-sm font-semibold text-gray-800 mb-2 text-center'>Formula Intrinsic</p>
                        <input 
                            type='text' 
                            className='w-full px-4 py-2.5 bg-[var(--selago)] border-0 rounded text-center font-bold text-[var(--port-gore)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--endeavour)]' 
                            value={(value?.supperalloys?.formulaIntsCost || '0') + '%'}
                            name='formulaIntsCost' 
                            onChange={(e) => handleChange(e, 'supperalloys')}
                            onBlur={(e) => {
                                let num = parseFloat(e.target.value.replace("%", ""));
                                if (!isNaN(num)) {
                                    handleChange({
                                        target: {
                                            name: e.target.name,
                                            value: num.toFixed(2),
                                        },
                                    }, "supperalloys");
                                }
                            }} 
                        />
                    </div>

                    <div className='bg-[var(--selago)] rounded-lg p-4 w-full sm:w-auto sm:min-w-[200px]'>
                        <p className='text-sm font-semibold text-gray-800 mb-2 text-center'>Formula Intrinsic</p>
                        <input 
                            type='text' 
                            className='w-full px-4 py-2.5 bg-[var(--selago)] border-0 rounded text-center font-bold text-[var(--port-gore)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--endeavour)]' 
                            value={(value?.supperalloys?.formulaIntsPrice || '0') + '%'}
                            name='formulaIntsPrice' 
                            onChange={(e) => handleChange(e, 'supperalloys')}
                            onBlur={(e) => {
                                let num = parseFloat(e.target.value.replace("%", ""));
                                if (!isNaN(num)) {
                                    handleChange({
                                        target: {
                                            name: e.target.name,
                                            value: num.toFixed(2),
                                        },
                                    }, "supperalloys");
                                }
                            }} 
                        />
                    </div>
                </div>

                {/* Results Table */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3'>
                    {/* Left Column Results */}
                    <div className='space-y-2'>
                        <div>
                            <p className='text-xs text-[var(--regent-gray)] mb-1.5 font-medium'>Solids Price:</p>
                            <div className='bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * (value?.supperalloys?.formulaIntsCost || 0) / 100).toFixed(2))}
                            </div>
                        </div>
                        <div>
                            <p className='text-xs text-gray-600 mb-1.5 font-medium'>Price per MT:</p>
                            <div className='bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * (value?.supperalloys?.formulaIntsCost || 0) / 100 * value.general.mt).toFixed(2))}
                            </div>
                        </div>
                        <div>
                            <p className='text-xs text-gray-600 mb-1.5 font-medium'>Price/Euro:</p>
                            <div className='bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * (value?.supperalloys?.formulaIntsCost || 0) / 100 / value.general?.euroRate).toFixed(2), '€')}
                            </div>
                        </div>
                        <div>
                            <p className='text-xs text-gray-600 mb-1.5 font-medium'>Turnings Price:</p>
                            <div className='bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * (value?.supperalloys?.formulaIntsCost || 0) / 100 * 0.95).toFixed(2))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column Results */}
                    <div className='space-y-2'>
                        <div>
                            <p className='text-xs text-gray-600 mb-1.5 font-medium'>Solids Price:</p>
                            <div className='bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * (value?.supperalloys?.formulaIntsPrice || 0) / 100).toFixed(2))}
                            </div>
                        </div>
                        <div>
                            <p className='text-xs text-gray-600 mb-1.5 font-medium'>Price per MT:</p>
                            <div className='bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * (value?.supperalloys?.formulaIntsPrice || 0) / 100 * value.general.mt).toFixed(2))}
                            </div>
                        </div>
                        <div>
                            <p className='text-xs text-gray-600 mb-1.5 font-medium'>Price/Euro:</p>
                            <div className='bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * (value?.supperalloys?.formulaIntsPrice || 0) / 100 / value.general?.euroRate).toFixed(2), '€')}
                            </div>
                        </div>
                        <div>
                            <p className='text-xs text-gray-600 mb-1.5 font-medium'>Turnings Price:</p>
                            <div className='bg-[var(--selago)] border border-[var(--rock-blue)] rounded px-3 py-2.5 text-center font-bold text-base'>
                                {formatCurrency((solidsPrice * (value?.supperalloys?.formulaIntsPrice || 0) / 100 * 0.95).toFixed(2))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-xs text-[var(--port-gore)] space-y-1 text-center sm:text-left'>
                    <p>* Fill in the red and + Formula Intrinsic</p>
                    <p>* Fe is calculated automatically</p>
                </div>
            </div>
        </div>
    ) : null;
};

export default SupperAlloys;