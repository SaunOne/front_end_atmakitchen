import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FirstBanner } from "../../components/userView/home/first-banner";
import { Information } from "../../components/userView/home/information";
import { Description } from "../../components/userView/home/description";

const Home = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // Memperbarui state fadeIn ketika user melakukan scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight) {
                setFadeIn(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={{
                    visible: { opacity: 1 },
                    hidden: { opacity: 0 },
                }}
                transition={{ duration: 2 }}
            >
                <FirstBanner />
            </motion.div>

            <motion.div
                animate={{ opacity: fadeIn ? 1 : 0, scale: fadeIn ? 1 : 0 }}
                transition={{ duration: 1.5 }}
            >
                <Information />
            </motion.div>


            <motion.div
                animate={{ opacity: fadeIn ? 1 : 0, x: fadeIn ? 0 : 4000 }}
                transition={{ duration: 3 }}
            >
                <Description />
            </motion.div>

            <div className="min-h-screen w-[100%] py-[50px] px-[50px] md:py-[100px] md:px-[100px]"></div>

        </>
    );
}

export default Home;
