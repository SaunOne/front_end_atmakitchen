import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


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
    return (
        <form >
            <button className="rounded-md border-[#e8e8e8] p-2 hover:bg-gray-100">
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
    return (
        <form >
            <button className="rounded-md border-[#e8e8e8] p-2 hover:bg-gray-100">
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