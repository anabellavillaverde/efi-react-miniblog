const API_URL = "http://localhost:5000/api/posts";

export async function fetchPosts() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al cargar posts");
    return await res.json();
}

export async function createPost(post, token) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al crear post");
    return data;
}

export async function updatePost(postId, updatedPost, token) {
    const res = await fetch(`${API_URL}/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
    });

    const data = await res.json();
    if (!res.ok) throw new Error("Error al actualizar post");
    return data;
}

export async function deletePost(postId, token) {
    const res = await fetch(`${API_URL}/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Error al eliminar post");
    return true;
}

export async function fetchPostById(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) throw new Error("Error al obtener post por ID");
        return await res.json();
    } catch (err) {
        console.error("fetchPostById error:", err);
        throw err;
    }
}
