export async function getAlbums() {
    const res = await fetch("http://localhost:4000/albums");
    return res.json();
}

export async function getAlbumDetail(id) {
    return await fetch(`http://localhost:4000/albums/${id}`);
}