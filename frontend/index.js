import { useState } from "react";

export default function Home() {
    const [input, setInput] = useState("{ \"data\": [\"A\", \"1\", \"B\"] }");
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:8000/bfhl", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: input,
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error("Error fetching API", error);
        }
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            <select multiple onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_alphabet">Highest Alphabet</option>
            </select>
            {response && (
                <div>
                    {selectedOptions.includes("numbers") && <p>Numbers: {JSON.stringify(response.numbers)}</p>}
                    {selectedOptions.includes("alphabets") && <p>Alphabets: {JSON.stringify(response.alphabets)}</p>}
                    {selectedOptions.includes("highest_alphabet") && <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>}
                </div>
            )}
        </div>
    );
}
