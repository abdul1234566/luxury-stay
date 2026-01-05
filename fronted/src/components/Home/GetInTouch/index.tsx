// import Link from 'next/link';

// const GetInTouch: React.FC = () => {
//     return (
//         <section>
//             <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
//                 <div className="relative rounded-t-2xl overflow-hidden">
//                     <video
//                         className="w-full absolute top-0 left-0 object-cover -z-10"
//                         autoPlay
//                         loop
//                         muted
//                         aria-label="Video background showing luxurious hotel amenities"
//                     >
//                         <source src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4" type="video/mp4" />
//                     </video>

//                     <div className="bg-black/30 lg:py-64 md:py-28 py-10">
//                         <div className="flex flex-col items-center gap-8">
//                             <h2 className='text-white lg:text-52 md:text-40 text-3xl max-w-3/4 text-center font-medium'>
//                                 Experience luxury hospitality where comfort and
//                                 exceptional service meet.
//                             </h2>
//                             <Link href="#" className='bg-white py-4 px-8 rounded-full text-dark hover:bg-dark hover:text-white duration-300'>
//                                 Book Your Stay
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-full py-5 bg-primary rounded-b-2xl overflow-hidden">
//                     <div className="flex items-center gap-40 animate-slide">
//                         <p className='text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32'>
//                             BOOK DIRECT AND SAVE—EXCLUSIVE HOTEL DEALS AND PACKAGES!
//                         </p>
//                         <p className='text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32'>
//                             ENJOY LUXURY AMENITIES INCLUDING SPA, POOL, AND FINE DINING!
//                         </p>
//                         <p className='text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32'>
//                             BOOK DIRECT AND SAVE—EXCLUSIVE HOTEL DEALS AND PACKAGES!
//                         </p>
//                         <p className='text-white whitespace-nowrap relative after:absolute after:w-20 after:h-px after:bg-white after:top-3 after:-right-32'>
//                             ENJOY LUXURY AMENITIES INCLUDING SPA, POOL, AND FINE DINING!
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default GetInTouch;


import Link from 'next/link';

const GetInTouch: React.FC = () => {
    return (
        <section className="font-poppins">
            <div className="max-w-8xl mx-auto px-5 2xl:px-0">

                {/* Background Section */}
                <div className="relative rounded-t-2xl overflow-hidden">

                    {/* Luxury Background Video */}
                    <video
                        className="w-full h-[70vh] lg:h-[90vh] object-cover absolute top-0 left-0 -z-10"
                        autoPlay
                        loop
                        muted
                    >
                        <source src="https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    </video>

                    {/* Gold Gradient Overlay */}
                    <div className="bg-gradient-to-b from-black/60 via-[#2C2C2C]/40 to-black/60 dark:from-black/70 dark:via-black/40 dark:to-black/80 py-32 lg:py-64 flex flex-col items-center gap-10">

                        {/* Heading */}
                        <h2 className="text-white text-center lg:text-5xl md:text-4xl text-3xl font-playfair leading-tight tracking-wide max-w-3xl">
                            Experience luxury hospitality where comfort meets
                            <span className="text-[#D4AF37]"> exceptional service.</span>
                        </h2>

                        {/* Button */}
                        <Link
                            href="#"
                            className="px-10 py-4 rounded-full bg-[#D4AF37] text-black font-medium tracking-wide 
                            hover:bg-[#b8932d] transition-all duration-300 dark:bg-[#D4AF37] dark:text-black"
                        >
                            Book Your Stay
                        </Link>
                    </div>
                </div>

                {/* Luxury Scrolling Strip */}
                <div className="w-full py-6 bg-[#D4AF37] rounded-b-2xl overflow-hidden">

                    <div className="flex items-center gap-32 animate-slide">

                        {[
                            "BOOK DIRECT AND SAVE—EXCLUSIVE LUXURY DEALS!",
                            "ENJOY SPA, POOL, GYM & WORLD-CLASS DINING!",
                            "EXPERIENCE PREMIUM SUITES WITH CITY VIEWS!",
                            "24/7 CONCIERGE & PERSONALIZED SERVICE!"
                        ].map((text, index) => (
                            <p
                                key={index}
                                className="text-black font-medium whitespace-nowrap tracking-wider relative 
                                after:absolute after:w-14 after:h-[2px] after:bg-black after:top-3 after:-right-20"
                            >
                                {text}
                            </p>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default GetInTouch;
