
import { Banner } from "../../../components/userView/product/banner";
import Sidebar from "../../../components/layouts/sidebar-product";
import { ListProduct } from "@/components/userView/product/list-product";
import { useContext } from "react";
import { GlobalContext } from "@/context/global_context";

export default function Page() {



    return (

        <div className="w-full p-7">
            <div className="md:flex justify-start">
                {/* <Sidebar /> */}
                <div className="w-full">
                    <Banner />
                    <div className="mt-3">
                        {/* Tampilkan elemen h1 hanya jika query tidak kosong */}

                        <ListProduct />

                    </div>
                </div>
            </div>


        </div>

    );
}
