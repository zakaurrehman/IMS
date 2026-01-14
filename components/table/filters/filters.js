import Tltip from '../../../components/tlTip';
import { getTtl } from '../../../utils/languages';
import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";

const Filters = (ln, filterOn, setFilterOn) => {
    const setFilter = () => {
        setFilterOn(!filterOn)
    }

    return (
        <div>
            <Tltip direction='bottom' tltpText={getTtl('Filters', ln)}>
                <button onClick={() => setFilter()}
                    className="group hover:bg-[var(--selago)] text-[var(--port-gore)] justify-center w-10 h-10 inline-flex
     items-center text-sm rounded-full hover:drop-shadow-md focus:outline-none transition-colors"
                >
                    {
                        filterOn ?
                            <MdFilterAlt className="scale-[1.4] text-[var(--port-gore)]" />
                            :
                            <MdFilterAltOff className="scale-[1.4] text-[var(--port-gore)]" />
                    }
                </button>
            </Tltip>
        </div>
    );
}


export default Filters;
