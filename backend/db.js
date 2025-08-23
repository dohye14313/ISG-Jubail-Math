const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 안전한 절대 경로 지정
const dbPath = path.resolve(__dirname, 'math_share.db');

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error('❌ DB 연결 실패:', err.message);
      process.exit(1);
    } else {
      console.log('✅ DB 연결 성공');
    }
  }
);

module.exports = db;
