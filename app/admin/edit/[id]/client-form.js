'use client'

import {useState} from 'react';
import {redirect} from "next/navigation";

export default function ClientForm({album}) {
    const [form, setForm] = useState({
        id: album.id,
        name: album.name,
        artist: album.artist,
        released_date: album.released_date,
        tracks: album.tracks,
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]:value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch(`http://localhost:4000/albums/${form.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
        if (res.ok) {
            redirect("/");
        }
    }

    return(
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">Create New Album</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1" htmlFor="id">ID</label>
                    <input type="number" name="id" id="id" className="w-full border rounded p-2" disabled
                            value={form.id} onChange={handleChange}/>
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="w-full border rounded p-2" required
                            value={form.name} onChange={handleChange}/>
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="artist">Artist</label>
                    <input type="text" name="artist" id="artist" className="w-full border rounded p-2" required
                            value={form.artist} onChange={handleChange}/>
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="released_date">Released Date</label>
                    <input type="text" name="released_date" id="released_date" placeholder="YYYY-MM-DD" className="w-full border rounded p-2" required
                            value={form.released_date} onChange={handleChange}/>
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="tracks">Tracks</label>
                    <input type="number" name="tracks" id="tracks" className="w-full border rounded p-2" required
                            value={form.tracks} onChange={handleChange}/>
                </div>

                <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update Album
                </button>
            </form>
        </div>
    );
}