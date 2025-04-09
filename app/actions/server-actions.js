'use server';

import {revalidatePath} from "next/cache";

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
    tracks: formData.get('tracks')
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
}