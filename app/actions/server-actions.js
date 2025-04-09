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