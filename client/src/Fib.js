import {useState, useEffect} from 'react';
import axios from 'axios';

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    const fetchValues = async () => {
        const res = await axios.get('/api/values/current');
        setValues(res.data);
    }

    const fetchIndexes = async () => {
        const res = await axios.get('/api/values/all');
        setSeenIndexes(res.data);
    }        

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index
        })

        setIndex('')
    }

    useEffect(() => {
        fetchValues()
        fetchIndexes()
    }, [])

    return (    
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input value={index} onChange={e => setIndex(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {seenIndexes.map(({ number }) => number).join(', ')}

            <h3>Calculated values:</h3>
            {Object.entries(values).map(item => (
                <div key={item[0]}>
                    For index {item[0]} I calculated {item[1]}
                </div>
            ))}
        </div>
    )
}

export default Fib;
