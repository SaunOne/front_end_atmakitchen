import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DeleteBahanBakuById } from "@/api/bahanBakuApi";
import { DeleteProdukById } from "@/api/produkApi";
import { useContext } from "react";
import { GlobalContext } from "@/context/global_context";

export function UpdateGaji({ id }) {
    return (
        <Link
            to={`/owner/gaji/edit/${id}`}
            className="rounded-md border  p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteGaji({ id }) {
    return (
        <form >
            <button className="rounded-md border-[#e8e8e8] p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}

export function UpdateProduct({ id }) {
    return (
        <Link
            to={`/admin/product/editProduk/${id}`}
            className="rounded-md border  p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteProduct({ id }) {
    const { setSuccess, success } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        DeleteProdukById(id)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setSuccess({ bool: true, message: 'Bahan Baku berhasil dihapus' });

            })
            .catch((err) => {
                console.error(err);
            });

    }
    return (
        <form onSubmit={handleSubmit} >
            <button type="submit" className="rounded-md border-[#e8e8e8] p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}

export function UpdateBahanBaku({ id }) {
    return (
        <Link
            to={`/admin/bahanBaku/editBahanBaku/${id}`}
            className="rounded-md border p-2 mr-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteBahanBaku({ id }) {
    const { setSuccess, success } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        DeleteBahanBakuById(id)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setSuccess({ bool: true, message: 'Bahan Baku berhasil dihapus' });

            })
            .catch((err) => {
                console.error(err);
            });

    }
    return (
        <form onSubmit={handleSubmit} >
            <button type="submit" className="rounded-md border-[#e8e8e8] p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}

export function ConfirmPesanan() {
    return (
        <Link
            to={`/admin/listPesanan`}
            className="rounded-md border p-2 mr-2 hover:bg-green-200 bg-green-100"
        >
            <span className="w-5 text-green-600">Confirm</span>
            {/* <FontAwesomeIcon icon={faCheck} className="w-5 text-black" /> */}
        </Link>
    );
}

export function DeletePesanan({ id }) {
    const { setSuccess, success } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        DeleteBahanBakuById(id)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setSuccess({ bool: true, message: 'Bahan Baku berhasil dihapus' });

            })
            .catch((err) => {
                console.error(err);
            });

    }
    return (
        <form onSubmit={handleSubmit} >
            <button type="submit" className="rounded-md border-[#e8e8e8] p-2 hover:bg-red-200 bg-red-100 text-black">
                <span className="w-5 text-red-600">Delete</span>
            </button>
        </form>
    );
}

export function ConfirmJarak() {
    return (
        <Link
            to={`/admin/jarakPengiriman`}
            className="rounded-md border p-2 mr-2 hover:bg-green-200 bg-green-100"
        >
            <span className="w-5 text-green-600">Confirm</span>
            {/* <FontAwesomeIcon icon={faCheck} className="w-5 text-black" /> */}
        </Link>
    );
}

export function DeleteJarak({ id }) {
    const { setSuccess, success } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        DeleteBahanBakuById(id)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setSuccess({ bool: true, message: 'Bahan Baku berhasil dihapus' });

            })
            .catch((err) => {
                console.error(err);
            });

    }
    return (
        <form onSubmit={handleSubmit} >
            <button type="submit" className="select-none rounded-md bg-red-100 p-2 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <span className="w-5 text-red-600">Delete</span>
            </button>
        </form>
    );
}