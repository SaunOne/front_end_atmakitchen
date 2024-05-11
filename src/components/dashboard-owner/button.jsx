import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "@/context/context";
import { DeleteKaryawanById } from "@/api/gajiKaryawanApi";

export function UpdateGaji({ id }) {
    return (
        <Link
            to={`/owner/gaji/editGaji/${id}`}
            className="rounded-md border  p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteGaji({ id }) {
    const { setSuccess, success } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id);
        DeleteKaryawanById(id)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setSuccess({ bool: true, message: 'Karyawan berhasil dihapus' });

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