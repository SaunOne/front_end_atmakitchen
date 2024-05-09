import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { DeleteBahanBakuById } from "@/api/bahanBakuApi";
import { useContext } from "react";
import { GlobalContext } from "@/context/context";

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
            to={`/owner/gaji/edit/${id}`}
            className="rounded-md border  p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteProduct({ id }) {
    return (
        <form >
            <button className="rounded-md border-[#e8e8e8] p-2 hover:bg-gray-100">
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