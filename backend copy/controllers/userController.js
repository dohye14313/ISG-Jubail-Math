// controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // sqlite 연결

// 회원가입
exports.registerUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: '모든 필드를 입력하세요.' });
		}

		// 사용자 중복 확인
		const userExists = await new Promise((resolve, reject) => {
			db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
				if (err) reject(err);
				else resolve(row);
			});
		});
		if (userExists) {
			return res.status(409).json({ message: '이미 존재하는 사용자입니다.' });
		}

		// 비밀번호 암호화
		const hashedPassword = await bcrypt.hash(password, 10);

		// 사용자 저장
		db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ message: '회원가입 실패' });
			}
			return res.status(201).json({ message: '회원가입 성공' });
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: '서버 오류' });
	}
};

// 로그인
exports.loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: '모든 필드를 입력하세요.' });
		}

		// 사용자 찾기
		const user = await new Promise((resolve, reject) => {
			db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
				if (err) reject(err);
				else resolve(row);
			});
		});

		if (!user) {
			return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
		}

		// 비밀번호 비교
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
		}

		// 토큰 생성
		const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });

		res.json({ token, user: { id: user.id, username: user.username } });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: '로그인 실패' });
	}
};
