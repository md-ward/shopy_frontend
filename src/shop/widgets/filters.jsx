import { useLayoutEffect, useState } from 'react';
import RatingComponent from './rating_stars';

const FilterSection = () => {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [isSliderChanging, setIsSliderChanging] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const companies = [
        { name: 'apple', label: 'Apple' },
        { name: 'samsung', label: 'Samsung' },
        { name: 'huawei', label: 'Huawei' },
        { name: 'xiaomi', label: 'Xiaomi' },
        { name: 'asus', label: 'Asus' },
    ];

    const handlePriceRangeChange = (event) => {
        setPriceRange({ ...priceRange, min: parseInt(event.target.value) });
        setIsSliderChanging(true);
    };

    const handleSliderChangeEnd = () => {
        setIsSliderChanging(false);
    };

    const toggleIsMobile = () => {
        setIsOpen(!isOpen);
    };

    useLayoutEffect(() => {
        const handleResize = () => {


            if (window.innerWidth > 640 ) {
                setIsOpen(true);
            }
             if (window.innerWidth <= 640 ) {
                setIsOpen(false);
            }

        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial window size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="bg-white sm:min-h-screen lg:w-80 p-5 m-2 rounded-lg shadow-md border border-gray-600 ease-in-out duration-300 transition-all">
            <button
                onClick={toggleIsMobile}
                type="button"
                className={`sm:hidden   flex flex-row shadow-md w-full justify-between rounded-lg p-2 custome_grad text-white `}
            >
                <h1>Filters</h1>
                <img
                    src="assets/arrow-up.svg"
                    alt="arrow button"
                    className={`h-7 transform ${isOpen ? 'rotate-180 duration-200 ease-in-out' : ''}`}
                />
            </button>

            <div
                className={`overflow-hidden transition-height duration-300 ease-in-out ${isOpen ? 'h-[400px]' : 'h-0'}`}
            >
                {/* check box filters */}
                <div className="flex flex-col justify-between backdrop-filter backdrop-blur">
                    {companies.map((company, index) => (
                        <span className="flex flex-row items-center gap-6 p-2" key={index}>
                            <input type="checkbox" name={company.label} className="w-4 h-4 cursor-pointer" />
                            <h2>{company.label}</h2>
                        </span>
                    ))}
                </div>

                {/* price range handler */}
                <div className="mt-4">
                    <span className="flex justify-between mb-6">
                        <h3 className="text-lg font-semibold mb-2">Price Range:</h3>
                        <h2>{priceRange.min}$ - {priceRange.max}$</h2>
                    </span>
                    <div className="relative">
                        <input
                            style={{
                                background: `linear-gradient(to right, #6366f1 ${(
                                    (priceRange.min / 10000) *
                                    100
                                ).toFixed(2)}%, #e2e8f0 ${(
                                    (priceRange.min / 10000) *
                                    100
                                ).toFixed(2)}%, #e2e8f0 100%)`,
                                accentColor: 'white',
                                cursor: 'pointer',
                            }}
                            type="range"
                            min={0}
                            max={10000}
                            step={100}
                            name="min"
                            value={priceRange.min}
                            onChange={handlePriceRangeChange}
                            onMouseDown={() => setIsSliderChanging(true)}
                            onMouseUp={handleSliderChangeEnd}
                            onTouchStart={() => setIsSliderChanging(true)}
                            onTouchEnd={handleSliderChangeEnd}
                            className="w-full h-4 bg-gray-300 rounded-full appearance-none"
                        />
                        <div
                            style={{ left: `${(priceRange.min / 10000) * 100}%` }}
                            className={`absolute top-0 -mt-8 left-0 px-2 py-1 bg-white rounded-full shadow text-sm transition-opacity ${isSliderChanging ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            ${priceRange.min}
                        </div>
                    </div>

                    <span className="flex flex-col justify-evenly w-full text-ellipsis items-center">
                        <h1 className="">By rate:</h1>
                        <RatingComponent className="flex mt-8 select-none justify-center" />
                    </span>
                </div>
            </div>
        </section>
    );
};

export default FilterSection;