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
                    className="group hover:bg-[var(--selago)] text-[var(--port-gore)] justify-center w-10 h-10 inline-flex items-center text-sm rounded-full hover:drop-shadow-md focus:outline-none transition-colors"
                >
                    <Image src="/logo/filter.svg" alt="Filter" width={22} height={22} className="scale-[1.4]" />
                </button>
            </Tltip>
        </div>
    );
}


export default Filters;
