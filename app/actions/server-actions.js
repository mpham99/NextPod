'use server';

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function getAlbums() {
  const res = await fetch("http://localhost:4000/albums");
  return res.json();
}

export async function getAlbumDetail(id) {
  return await fetch(`http://localhost:4000/albums/${id}`);
}

export async function deleteAlbum(id) {
  await fetch(`http://localhost:4000/albums/${id}`,
                {method: 'DELETE'}
  );

    // Revalidate pages
    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');
}

export async function createAlbum(formData){
  const rawFormData = {
    id: formData.get('id'),
    name: formData.get('name'),
    artist: formData.get('artist'),
    released_date: formData.get('released_date'),
    tracks: formData.get('tracks'),
    description: formData.get('description')
  };

  await fetch("http://localhost:4000/albums", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(rawFormData)
  });

  // Revalidate pages
  revalidatePath('/collection');
  revalidatePath('/admin');
  // Redirect to home page
  redirect('/collection');
}

export async function editAlbum(formData){
  const rawFormData = {
    id: formData.id,
    name: formData.name,
    artist: formData.artist,
    released_date: formData.released_date,
    tracks: formData.tracks,
    description: formData.description
  };

  await fetch(`http://localhost:4000/albums/${rawFormData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(rawFormData)
  });

  // Revalidate pages
  revalidatePath('/collection');
  revalidatePath(`/collection/${rawFormData.id}`);
  revalidatePath('/admin');
  revalidatePath(`/admin/${rawFormData.id}`);
  // Redirect to admin page
  redirect('/admin');
}