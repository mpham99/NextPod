import {createAlbum} from '@/app/actions/server-actions';

 export default async function Create() {
    return (
        <div className="max-w-xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">Create New Album</h1>

            <form action={createAlbum} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1" htmlFor="id">ID</label>
                    <input type="number" name="id" id="id" className="w-full border rounded p-2" required />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="w-full border rounded p-2" required />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="artist">Artist</label>
                    <input type="text" name="artist" id="artist" className="w-full border rounded p-2" required />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="released_date">Released Date</label>
                    <input type="text" name="released_date" id="released_date" placeholder="YYYY-MM-DD" className="w-full border rounded p-2" required />
                </div>

                <div>
                    <label className="block font-medium mb-1" htmlFor="tracks">Tracks</label>
                    <input type="number" name="tracks" id="tracks" className="w-full border rounded p-2" required />
                </div>

                <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Create Album
                </button>
            </form>
        </div>
    );
}