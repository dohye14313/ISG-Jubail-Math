// app.js
const express = require('express');
const cors = require('cors');
const app = express();

// ✅ DB 연결 확인을 위해 반드시 import
const db = require('./db'); // <-- 이게 빠져 있으면 SQLite 연결이 안됨

// 라우트 import
const userRoutes = require('./routes/userRoutes');
const problemRoutes = require('./routes/problemRoutes');
const solutionRoutes = require('./routes/solutionRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(cors());
app.use(express.json());

// 라우팅
app.use('/api/users', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);

// 서버 실행
const PORT = 5001;
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
