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
            setResults([])
            setSearched(false)
            return
        }
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
    }, [keyword])

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="メモを検索（例：睡眠）"
                className="form-control"
                style={{ width: '300px' }}
            />
            {loading && <p className="text-muted small mt-1">検索中...</p>}
            {searched && !loading && (
                <p className="small mt-1">{results.length}件見つかりました</p>
            )}
            <ul className="list-unstyled mt-2">
                {results.map((record) => (
                    <li key={record.id} className="border-bottom py-2">
                        <small className="text-muted">{record.date}</small>
                        <p className="mb-0 small">{record.memo}</p>
                        <small className="text-muted">疲労度: {record.fatigueLevel} / 睡眠: {record.sleepHours}時間</small>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App