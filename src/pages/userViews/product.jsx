
import { Banner } from "../../components/userView/product/banner";

export default function Page() {



    return (
        <div className="w-full">
            <Banner />
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4 py-5 d-flex justify-content-around">
                {/* Tampilkan elemen h1 hanya jika query tidak kosong */}

                <h1 className='text-black'></h1>

            </div>
        </div>
    );
}
