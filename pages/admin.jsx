import { useState, useEffect } from "react";

export default function Admin() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/api/results?pw=ADMIN_PASSWORD")
      .then(res => res.json())
      .then(data => setResults(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Résultats du vote</h1>
      <div className="space-y-4">
        {results.map(r => (
          <div key={r.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{r.title}</h2>
            <ul className="mt-2">
              <li>Pour : {r.choices.pour} votes</li>
              <li>Contre : {r.choices.contre} votes</li>
              <li>Abstention : {r.choices.abstention} votes</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

