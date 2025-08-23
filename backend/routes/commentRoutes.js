const express = require('express');
const router = express.Router();
const db = require('../db');

// 댓글 조회 (특정 문제)
router.get('/:problemId', (req, res) => {
	const { problemId } = req.params;
	db.all('SELECT * FROM comments WHERE problem_id = ? ORDER BY created_at DESC', [problemId], (err, rows) => {
		if (err) return res.status(500).json({ error: 'DB 오류' });
		res.json(rows);
	});
});

// 댓글 등록
router.post('/', (req, res) => {
	const { problem_id, user_id, content } = req.body;
	if (!problem_id || !content) {
		return res.status(400).json({ error: '필수 항목 누락' });
	}
	db.run(
		'INSERT INTO comments (problem_id, user_id, content) VALUES (?, ?, ?)',
		[problem_id, user_id || null, content],
		function (err) {
			if (err) return res.status(500).json({ error: 'DB 오류' });
			res.json({ success: true, id: this.lastID });
		}
	);
});

module.exports = router;
