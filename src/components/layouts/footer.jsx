import logo from '../../assets/img/logo-hero.png';

const Footer = () => {
    return <>
        <div className="container-footer w-screen bg-gradient-to-tr bg-[#784100] h-auto py-[30px] px-[50px] md:py-[60px] md:px-[100px]">
            <div className="md:flex md:justify-start">
                <div>
                    <div className="inline-block h-auto p-5 bg-[#F9E4BD] rounded-[20px]">
                        <img className="w-32 object-cover" src={logo} alt={logo} />
                    </div>
                    <p className="mt-8 geologica-300 text-justify w-[400px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem temporibus quae rerum cupiditate, maiores aliquid doloremque pariatur non. Aperiam voluptatem repudiandae a! Sapiente culpa eius qui nam repudiandae molestiae eos!
                    </p>
                </div>
                <div className="md:ml-[10%]" >
                    <div className="md:flex md:justify-start gap-5">
                        <div className="w-[210px]">
                            <h2 className=" geologica-600 text-justify text-[20px] w-[400px]">Navigasi</h2>
                            <ul>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Beranda</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Produk</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Tentang Kami</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Kontak</a>
                                </li>
                            </ul>

                        </div>
                        <div className="w-[210px]">
                            <h2 className=" geologica-600 text-justify text-[20px] w-[400px]">Sosial Media</h2>
                            <ul>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Beranda</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Produk</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Tentang Kami</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Kontak</a>
                                </li>
                            </ul>

                        </div>
                        <div className="w-[210px]">
                            <h2 className=" geologica-600 text-justify text-[20px] w-[400px]">Kontak Kami</h2>
                            <ul>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Beranda</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Produk</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Tentang Kami</a>
                                </li>
                                <li className="mt-3">
                                    <a className="geologica-300 text-white text-justify text-[16px] w-[400px]" href="#">Kontak</a>
                                </li>
                            </ul>

                        </div>

                        
                    </div>
                    <h2 className="mt-14 geologica-300 text-justify text-[16px]">Copy right @ 2024 Yogyakarta | Power By P3L’Asik</h2>
                </div>
            </div>
        </div>
    </>
}

export default Footer;
