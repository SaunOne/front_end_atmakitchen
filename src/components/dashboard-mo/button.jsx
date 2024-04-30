import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function CreatePenitip() {
    return (
        <Link
            to="/mo/penitip/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Reservation</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

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


export function CreateStaff() {
    return (
        <Link
            to="/mo/penitip/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Reservation</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
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