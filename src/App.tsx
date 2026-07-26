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
        `http://localhost:8080/records/search?keyword=${encodeURIComponent(keyword)}`,
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
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>メモ検索</h1>
        <div>
          <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="キーワードを入力（例：つかれ）"
              style={{ padding: '0.5rem', width: '300px' }}
          />
        </div>

        {loading && <p>検索中...</p>}

        {searched && !loading && (
            <p>{results.length}件見つかりました</p>
        )}

        <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
          {results.map((record) => (
              <li key={record.id} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem 0' }}>
                <div>{record.date}</div>
                <div>{record.memo}</div>
                <div>疲労度: {record.fatigueLevel} / 睡眠: {record.sleepHours}時間</div>
              </li>
          ))}
        </ul>
      </div>
  )
}

export default App