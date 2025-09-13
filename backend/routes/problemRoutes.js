const express = require('express');
const router = express.Router();
const db = require('../db'); // db.js에서 export한 sqlite3 Database 인스턴스

// 문제 전체 조회
router.get('/', (req, res) => {
	db.all('SELECT * FROM problems ORDER BY id DESC', [], (err, rows) => {
		if (err) {
			console.error('DB 오류:', err.message);
			return res.status(500).json({ success: false, message: 'DB 오류' });
		}
		res.json(rows);
	});
});

router.get('/:id', (req, res) => {
	const problemId = req.params.id;

	db.get('SELECT * FROM problems WHERE id = ?', [problemId], (err, row) => {
		if(err) {
			console.error('DB 오류:', err);
			return res.status(500).json({ success: false, message: 'DB 오류'});
		}
		if (!row) {
			return res.status(404).json({ success: false, message: '문제를 찾을 수 없습니다.'});
		}
		res.json(row);
	});
});

// 문제 등록
router.post('/', (req, res) => {
	console.log('등록 요청 도착:', req.body);

	const title = (req.body.title || '').trim();
	const description = (req.body.description || '').trim();
	const username = (req.body.username || '').trim();

	if (!title || !description || !username) {
		return res.status(400).json({ success: false, message: '필수값 누락' });
	}

	const sql = 'INSERT INTO problems (title, description, username) VALUES (?, ?, ?)';
	const params = [title, description, username];

	db.run(sql, params, function (err) {
		if (err) {
			console.error('[INSERT ERR]', err.message, { sql, params });
			return res.status(500).json({ success: false, message: err.message });
		}
		res.json({ success: true, id: this.lastID });
	});
});

module.exports = router;