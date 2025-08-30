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
// tabs로 들여쓰기
app.post('/', requireAuth, (req, res, next) => {
	try {
		const { title, content } = req.body || {};
		if (!title || !content) return res.status(400).json({ message: 'title, content 필수' });

		const userId = req.user.id;	// 토큰에서 꺼낸 사용자 id

		db.run(
			'INSERT INTO problems (title, content, user_id) VALUES (?, ?, ?)',
			[title, content, userId],
			function(err) {
				if (err) return next(err);
				return res.status(201).json({ id: this.lastID });
			});
	} catch (e) { next(e); }
});

module.exports = router;