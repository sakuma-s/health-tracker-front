import { useState, useEffect } from 'react'

type HealthRecord = {
    id: number
    date: string
    memo: string
    fatigueLevel: number
    sleepHours: number
}

function App() {
    const [keyword, setKeyword] = useState('')
    const [results, setResults] = useState<HealthRecord[]>([])
    const [searched, setSearched] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!keyword.trim()) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResults([])
            setSearched(false)
            setLoading(false)
            return
        }

        const timer = setTimeout(() => {
            setLoading(true)
            fetch(
                `/records/search?keyword=${encodeURIComponent(keyword)}`,
                { credentials: 'include' }
            )
                .then((res) => res.json())
                .then((data: HealthRecord[]) => {
                    setResults(data)
                    setSearched(true)
                })
                .catch((e) => console.error(e))
                .finally(() => setLoading(false))
        }, 300)

        return () => clearTimeout(timer)
    }, [keyword])
    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="メモを検索（例：睡眠）"
                className="form-control"
                style={{ width: '300px' }}
            />
            {(searched || loading) && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '300px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    zIndex: 1000,
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}>
                    {loading && <p className="text-muted small p-2">検索中...</p>}
                    {searched && !loading && results.length === 0 && (
                        <p className="text-muted small p-2">該当なし</p>
                    )}
                    <ul className="list-unstyled mb-0">
                        {results.map((record) => (
                            <li key={record.id} className="border-bottom p-2">
                                <small className="text-muted">{record.date}</small>
                                <p className="mb-0 small">{record.memo}</p>
                                <small className="text-muted">疲労度: {record.fatigueLevel} / 睡眠: {record.sleepHours}時間</small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default App