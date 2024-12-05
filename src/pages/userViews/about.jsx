import { Link } from "react-router-dom";


const About = () => {
    return <>
        <div className="max-w-container w-full  min-h-[50vh] mx-auto pt-[20px] px-[50px] md:px-[100px]">
            {/* <Breadcrumbs title="About" prevLocation={prevLocation} /> */}
            <div className="pb-10">
                <h1 className=" geologica-300 text-justify text-[22px] text-black mb-2">
                Di Atma Kitchen, kami percaya bahwa setiap momen istimewa layak dirayakan dengan 
                kue dan pastry yang tak hanya lezat, tetapi juga dibuat dengan penuh cinta dan dedikasi. 
                Berdiri sejak 2024, Atma Kitchen telah menjadi destinasi favorit bagi pecinta kuliner manis 
                yang menginginkan kualitas terbaik dalam setiap gigitan. Kami menggunakan bahan-bahan pilihan 
                terbaik dan resep turun-temurun yang dipadukan dengan sentuhan inovasi modern, menghasilkan 
                produk yang memuaskan baik dari segi rasa maupun estetika. Tim baker profesional kami 
                berdedikasi untuk menciptakan kreasi unik yang selalu menyenangkan pelanggan kami. 
                Kami bangga dapat menyajikan kue yang tidak hanya menggugah selera, tetapi juga membawa 
                kebahagiaan dan kehangatan ke dalam setiap rumah. Terima kasih telah menjadi bagian dari 
                perjalanan kami, dan kami berharap dapat terus menjadi bagian dari momen-momen spesial Anda.
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

