'use client';
import { PlatformContact } from './platformContact';
import { PlatformCard1 } from './platformCard1';
import { PlatformCard2 } from './platformCard2';
import { PlatformCard3 } from './platformCard3';

export function PlatformSection() {
  return (
    <section className="py-20 bg-white overflow-hidden flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">



   {/* Card 2: Real Time Data Analytics (1 column) */}
          <div className="w-full mb-20">
            <PlatformCard2 />
          </div>


            {/* Card 3: Credit Balance & Security (1 column) */}
          <div className="w-full">
            <PlatformCard3 />
          </div>

          
          {/* Card 1: Multiple Platform (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative min-h-[400px] mb-20">
            <PlatformContact />
            <PlatformCard1 />
          </div>

       

        

        </div>
      </div>
    </section>
  );
}

export default PlatformSection;
