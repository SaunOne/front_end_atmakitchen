import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { DeletePenitipById } from "@/api/penitipApi";
import { DeletePengeluaranBahanBakuById } from "@/api/pengeluaranBahanBakuApi";
import { useContext } from "react";
import { GlobalContext } from "@/context/context";


export function UpdatePenitip({ id }) {
    return (
        <Link
            to={`/mo/penitip/edit/${id}`}
            className="rounded-md border  p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeletePenitip({ id }) {
    const { setSuccess, success } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        DeletePenitipById(id)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setSuccess({ bool: true, message: 'Penitip berhasil dihapus' });

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

export function UpdateStaff({ id }) {
    return (
        <Link
            to={`/mo/staff/edit/${id}`}
            className="rounded-md border  p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteStaff({ id }) {
    return (
        <form >
            <button className="rounded-md border-[#e8e8e8] p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}

export function UpdatePengeluaranBahan({ id }) {
    return (
        <Link
            to={`/mo/pengeluaran-bahan-baku/edit/${id}`}
            className="rounded-md border  p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function UpdatePengeluaranLain({ id }) {
    return (
        <Link
            to={`/mo/pengeluaran-lain-lain/edit/${id}`}
            className="rounded-md border  p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeletePengeluaranBahan({ id }) {
    const { setSuccess, success } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        DeletePengeluaranBahanBakuById(id)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setSuccess({ bool: true, message: 'Pengadaan Barang Baku berhasil dihapus' });

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

export function DeletePengeluaranLain({ id }) {
    return (
        <form >
            <button className="rounded-md border-[#e8e8e8] p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}