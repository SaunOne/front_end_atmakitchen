import { Link } from "react-router-dom";


const About = () => {
    return <>
        <div className="max-w-container w-full  min-h-[50vh] mx-auto pt-[20px] px-[50px] md:px-[100px]">
            {/* <Breadcrumbs title="About" prevLocation={prevLocation} /> */}
            <div className="pb-10">
                <h1 className="max-w-[600px] text-[12px] text-black mb-2">
                    <span className="text-black font-semibold text-lg">Atma Kitchen</span>{" "}
                    is one of the worlds leading ecommerce brands and is internationally
                    recognized for celebrating the essence of classic Worldwide cool
                    looking style.
                </h1>
                <Link to="/shop">
                    <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                        Continue Order
                    </button>
                </Link>
            </div>
        </div>
    </>
}

export default About;

