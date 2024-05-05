import { Carousel, IconButton } from "@material-tailwind/react";

export const Banner = () => {
    return <>
        <Carousel transition={{ duration: 2 }} className="rounded-xl h-[200px] md:h-[300px] "
            prevArrow={({ handlePrev }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4 bg-transparent"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-transparent"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </IconButton>
            )}>
            <img
                src="https://promo.ecodoe.com/wp-content/uploads/2022/04/Banner-Hampers-Lebaran-01-min-scaled.jpg"
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <img
                src="https://goodstats.id/img/articles/original/2023/04/17/hampers-kue-kering-paling-banyak-diincar-masyarakat-untuk-lebaran-2023-1IR1OBRw07.jpg?p=articles-lg"
                alt="image 2"
                className="h-full w-full object-cover"
            />
            <img
                src="https://www.blibli.com/friends-backend/wp-content/uploads/2023/01/B100276-cover.jpg"
                alt="image 3"
                className="h-full w-full object-cover"
            />
        </Carousel>
    </>
}