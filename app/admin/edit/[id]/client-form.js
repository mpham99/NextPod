'use client'

import {useState} from 'react';
import {redirect} from "next/navigation";
import {editAlbum} from "@/app/actions/server-actions";

export default function ClientForm({album}) {
    const [form, setForm] = useState({
        id: album.id,
        name: album.name,
        artist: album.artist,
        released_date: album.released_date,
        tracks: album.tracks,
        description: album.description || ''
    });
    const [errors, setErrors] = useState([]);

    function handleChange(e) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]:value}));
    }

    function formValidation(data) {
        const errorList = [];

        if (data.name.trim().length < 1 || data.name.trim().length > 200) {
            errorList.push('Album name must be between 1 and 200 characters in length');
        }

        if (!Number.isInteger(Number(data.tracks)) || Number(data.tracks) <= 0) {
            errorList.push('Album needs to have 1 track at minimum');
        }

        if (data.description.length > 1000) {
            errorList.push('Description must not exceed 1000 characters in length.');
        }

        return errorList;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Form Validation
        const errorList = formValidation(form);
        if (errorList.length > 0){
            setErrors(errorList);
            return;
        }

        await editAlbum(form);
    }

    return(
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">Create New Album</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {errors.length > 0 && (
                    <ul className="bg-red-100 border border-red-400 text-red-700 p-4 rounded text-sm space-y-1">
                        {errors.map((err, index) => (
                            <li key={index}>• {err}</li>
                        ))}
                    </ul>
                )}
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

                <div>
                    <label className="block font-medium mb-1" htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" className="w-full border rounded p-2" required
                           value={form.description} onChange={handleChange}/>
                </div>

                <button type="submit" className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                    Update Album
                </button>
            </form>
        </div>
    );
}