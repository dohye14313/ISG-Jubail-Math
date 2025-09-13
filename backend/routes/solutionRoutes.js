const express = require('express');
const router = express.Router();
const db = require('../db'); // db 연결 파일 경로에 따라 수정

// 풀이 등록
router.post('/', (req, res) => {
	const { problem_id, content, username } = req.body;
	db.execute(
		'INSERT INTO solutions (problem_id, content, username) VALUES (?, ?, ?)',
		[problem_id, content, username],
		(err, results) => {
			if (err) return res.status(500).json({ success: false, message: 'DB 오류' });
			res.json({ success: true });
		}
	);
});

// 특정 문제에 대한 풀이 전체 조회 (선택적 구현)
router.get('/:problemId', (req, res) => {
	const { problemId } = req.params;
	db.execute(
		'SELECT * FROM solutions WHERE problem_id = ? ORDER BY created_at DESC',
		[problemId],
		(err, results) => {
			if (err) return res.status(500).json({ success: false, message: 'DB 오류' });
			res.json(results);
		}
	);
});

module.exports = router;
