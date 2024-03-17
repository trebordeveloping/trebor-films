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

export default function Reviews() {

    const dataPromise = useLoaderData();
    
    function renderReviewElements(reviews) {

        const reviewElements = reviews.map(review => (
            <Review key={review.id} data={review} />
        ))

        return (
            <>
                {reviewElements}
            </>
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