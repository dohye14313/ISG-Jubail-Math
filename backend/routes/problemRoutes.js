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

	const { title, description, author_id } = req.body;

	if (!title || !description || !author_id) {
		return res.status(400).json({ success: false, message: '필수값 누락' });
	}

	const sql = 'INSERT INTO problems (title, description, author_id) VALUES (?, ?, ?)';
	const params = [title, description, author_id];

	db.run(sql, params, function (err) {
		if (err) {
			console.error('DB 오류:', err.message);
			return res.status(500).json({ success: false, message: 'DB 오류' });
		}
		res.json({ success: true, id: this.lastID }); // sqlite에서는 this.lastID로 삽입된 row id 확인
	});
});

module.exports = router;
