import { useState, useContext } from "react";

import Sidebar from "../components/app/layout/Sidebar";
import AppNavbar from "../components/app/layout/AppNavbar";

import CollectionCard from "../components/app/collections/CollectionCard";
import AddBookModal from "../components/app/books/AddBookModal";

import { DataContext } from "../context/DataContext";

const Collections = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { addBook } = useContext(DataContext);

    return (
        <div className="h-screen flex overflow-hidden">

            <title>Your collections | Bookey</title>

            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onAddBook={() => setOpenModal(true)}
            />

            {/* main app */}
            <div className="flex-1 flex flex-col">

                <AppNavbar setIsOpen={setIsOpen} />

                {/* content */}
                <div className="flex-1 overflow-y-auto bg-bgLight dark:bg-darkBg p-4">

                    <div className="mb-6 space-y-2">
                        <h1 className="text-4xl font-bold text-primary capitalize">
                            Your Collections
                        </h1>
                        <p className="text-sm text-gray-600 font-semibold">
                            Build your own collections
                        </p>
                    </div>

                    {/* collections */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-3 text-primary">
                            Your Collections
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <CollectionCard type="liked" />
                            <CollectionCard
                                type="create"
                                onClick={() => console.log("Create playlist")}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* add book btn */}
            <AddBookModal
                isOpen={openModal}
                setIsOpen={setOpenModal}
                onSubmit={addBook}
            />

        </div>
    );
};

export default Collections;