
const CheckBox=({size, checked,  onChange})=>{

	return(
		<input type="checkbox"  checked={checked} onChange={onChange}
			className={`checkbox ${size} border cursor-pointer
			appearance-none rounded-lg border-[var(--rock-blue)] shrink-0
			`}	
			/>
	)
}

export default CheckBox;
