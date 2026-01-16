import Tltip from '../../../components/tlTip';
import { getTtl } from '../../../utils/languages';
import Image from 'next/image';


const Filters = (ln, resetTable, filterOn) => {



    return (
        <div>
            {filterOn && <Tltip direction='bottom' tltpText={getTtl('Reset Table', ln)}>
                <button onClick={() => resetTable()}
                    className="group hover:bg-[var(--selago)] text-[var(--port-gore)] justify-center w-10 h-10 inline-flex
     items-center text-sm rounded-full hover:drop-shadow-md focus:outline-none transition-colors"
                >
                    <Image 
                        src="/logo/reset.svg" 
                        alt="Reset Table" 
                        width={32} 
                        height={32} 
                        className="w-8 h-8 object-cover inline-block align-middle" 
                        priority 
                    />
                </button>
            </Tltip>
            }
        </div>
    );
}


export default Filters;
