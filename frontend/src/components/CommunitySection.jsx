function CommunitySection() {
    return (
        <>
            {/* Left Part - Community Section */}
            <div className="w-full lg:w-5/12 bg-gradient-to-br from-lime-400 to-green-500 flex flex-col gap-6 justify-center text-center items-center p-8 md:p-12 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-white animate-[float_6s_ease-in-out_infinite]"></div>
                    <div className="absolute top-1/2 right-20 w-24 h-24 rounded-full bg-white animate-[float_7s_ease-in-out_infinite_1s]"></div>
                    <div className="absolute bottom-10 left-1/3 w-20 h-20 rounded-full bg-white animate-[float_5s_ease-in-out_infinite_2s]"></div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10">
                    Join our <span className="text-green-900">community</span>
                </h2>

                <p className="text-lg md:text-xl text-white/90 relative z-10 max-w-md">
                    Join our vibrant community to stay updated with the latest features, announcements, and exclusive content.
                </p>

                <button className="relative z-10 px-8 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <a href="https://t.me/+dU8Ee-FfAoBkYzA1" className="flex items-center gap-2">
                        <span>Join Now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </button>
            </div>
        </>
    );
}

export default CommunitySection;