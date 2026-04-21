import { useContext, useMemo } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { DataContext } from "../../../context/DataContext";
import { TrackingContext } from "../../../context/TrackingContext";

import TrackingSection from "./TrackingSection";

const TrackingLists = () => {

    const { currentUser } = useContext(AuthContext);
    const { books } = useContext(DataContext);
    const { trackingData } = useContext(TrackingContext);

    const userTracking = useMemo(() => {
        return trackingData.find(
            (t) => t.userId === currentUser.id
        );
    }, [trackingData, currentUser]);

    const mapBooks = (list) => {
        return list.map((item) => {
            const book = books.find((b) => b.id === item.bookId);
            return { ...item, book };
        });
    };

    const wanted = mapBooks(userTracking?.wanted || []);
    const completed = mapBooks(userTracking?.completed || []);
    const dropped = mapBooks(userTracking?.dropped || []);

    return (
        <div className="grid md:grid-cols-3 gap-4">

            <TrackingSection title="Wanted to Read" data={wanted} />
            <TrackingSection title="Completed" data={completed} />
            <TrackingSection title="Dropped" data={dropped} />

        </div>
    );
};

export default TrackingLists;