import Tltip from '../../../components/tlTip';
import { getTtl } from '../../../utils/languages';
import Image from 'next/image';

const Filters = (ln, filterOn, setFilterOn) => {
    const setFilter = () => {
        setFilterOn(!filterOn)
    }

    return (
        <div>
            <Tltip direction='bottom' tltpText={getTtl('Filters', ln)}>
                <button
                    onClick={setFilter}
                    className="group text-[var(--port-gore)] justify-center w-10 h-10 inline-flex items-center text-sm rounded-full hover:drop-shadow-md focus:outline-none transition-colors"
                >
                    <Image 
                        src={filterOn ? "/logo/filter.svg" : "/logo/filter_inactive.svg"} 
                        alt="Filter" 
                        width={32} 
                        height={32} 
                        className="w-8 h-8 object-cover inline-block align-middle" 
                        priority 
                    />
                </button>
            </Tltip>
        </div>
    );
}


export default Filters;
