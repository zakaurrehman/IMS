import Tltip from '../../../components/tlTip';
import { getTtl } from '../../../utils/languages';
import { AiOutlineClear } from "react-icons/ai";


const Filters = (ln, resetTable, filterOn) => {



    return (
        <div>
            {filterOn && <Tltip direction='bottom' tltpText={getTtl('Reset Table', ln)}>
                <button onClick={() => resetTable()}
                    className="group hover:bg-[var(--selago)] text-[var(--port-gore)] justify-center w-10 h-10 inline-flex
     items-center text-sm rounded-full hover:drop-shadow-md focus:outline-none transition-colors"
                >
                    {
                        <AiOutlineClear className="scale-[1.4] text-[var(--endeavour)]" />
                    }
                </button>
            </Tltip>
            }
        </div>
    );
}


export default Filters;
