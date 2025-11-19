const API_URL = "http://localhost:5000/api";

export async function fetchReviews(postId, token) {
    const res = await fetch(`${API_URL}/posts/${postId}/reviews`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error al cargar reviews");
    return await res.json();
}

export async function createReview(postId, review, token) {
    const res = await fetch(`${API_URL}/posts/${postId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(review),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al crear review");
    return data;
}

export async function updateReview(reviewId, updatedReview, token) {
    const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedReview),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al actualizar review");
    return data;
}

export async function deleteReview(reviewId, token) {
    const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al eliminar review");
    }

    return true;
}
