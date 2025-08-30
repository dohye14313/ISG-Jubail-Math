import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('https://isg-jubail-math-backend.onrender.com/api/auth/login', {
				username,
				password,
			});
			localStorage.setItem('token', res.data.token);
			navigate('/problems/new');
		} catch (err) {
			setError('로그인 실패: ' + err.response?.data?.message || err.message);
		}
	};

	return (
		<div>
			<div className="header">
				<h1 className="title">Math</h1>
			</div>
			<div className="contents">
				<h2>로그인</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="아이디"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="비밀번호"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit">로그인</button>
				</form>
				{error && <p>{error}</p>}
				<p>
					계정이 없으신가요? <Link to="/register">회원가입</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
