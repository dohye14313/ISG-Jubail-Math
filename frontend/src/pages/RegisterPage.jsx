import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleRegister = () => {
		if (!username || !password) {
			alert('아이디와 비밀번호를 모두 입력하세요.');
			return;
		}

		axios.post('https://isg-jubail-math-frontend.onrender.com/api/auth/register', { username, password })
			.then(() => {
				alert('회원가입이 완료되었습니다.');
				navigate('/login');
			})
			.catch(err => {
				console.error(err);
				alert('회원가입 실패.');
			});
	};

	return (
		<div className="p-4 max-w-md mx-auto">
			<div className="header">
				<h1 className="title">Math</h1>
			</div>
			<div className="contents">
				<h2 className="text-2xl font-bold mb-4">회원가입</h2>
				<input
					className="border p-2 mb-2 w-full"
					placeholder="아이디"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					className="border p-2 mb-2 w-full"
					placeholder="비밀번호"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="btn">
					<button
						className="bg-blue-500 text-white px-4 py-2 w-full"
						onClick={handleRegister}
					>
						회원가입
					</button>
				</div>
			</div>
		</div>
	);
}
