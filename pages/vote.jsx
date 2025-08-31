import { useState, useEffect } from "react";

export default function Vote() {
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    fetch("/api/resolutions")
      .then(res => res.json())
      .then(data => setResolutions(data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Votez pour l'Assemblée Générale</h1>
      <form className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {resolutions.map(r => (
          <div key={r.id} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{r.title}</h2>
            {r.description && <p className="text-gray-600 mt-1">{r.description}</p>}
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" name={`resolution-${r.id}`} value="pour" className="form-radio text-blue-600"/>
                <span className="ml-2">Pour</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name={`resolution-${r.id}`} value="contre" className="form-radio text-red-600"/>
                <span className="ml-2">Contre</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name={`resolution-${r.id}`} value="abstention" className="form-radio text-gray-500"/>
                <span className="ml-2">Abstention</span>
              </label>
            </div>
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
          Valider mon vote
        </button>
      </form>
    </div>
  );
}

