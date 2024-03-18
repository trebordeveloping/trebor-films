import React from "react";
import {
    useLoaderData,
    defer,
    Await,
} from "react-router-dom";

// import { getReviews } from "../../api";
import { getReviews } from "../../firebase/auth";
import Review from "../../components/Review";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
    await requireAuth(request);
    return defer({reviews: getReviews()})
}

function sortByDates(items) {
    const sortedItems = items.sort(
        (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
    );
    return sortedItems;
}

export default function Reviews() {

    const dataPromise = useLoaderData();
    
    function renderReviewElements(reviews) {

        const sortedReviews = sortByDates(reviews);

        const reviewElements = sortedReviews.map(review => (
            <Review key={review.id} data={review} />
        ))

        return (
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {reviewElements}
            </div>
        )
    }

    return (
        <>
            <React.Suspense fallback={<h3>Loading reviews...</h3>}>
                <Await resolve={dataPromise.reviews}>
                    {renderReviewElements}
                </Await>
            </React.Suspense>
        </>
    )
}