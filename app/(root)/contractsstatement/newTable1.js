"use client"

import Customtable from './newTable'

// Lightweight wrapper that reuses `Customtable` implementation.
// ContractsMerged expects `CustomtableStatement1` to exist — this avoids import errors
// and provides the same API as `newTable.js` (columns, data, etc.).
export default function CustomtableStatement1(props) {
	return <Customtable {...props} />
}
