import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProblemRegister = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		// 로그인된 사용자 확인
		const token = localStorage.getItem('token');
		if (!token) {
			alert('로그인이 필요합니다.');
			navigate('/login');
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');
			const userId = JSON.parse(atob(token.split('.')[1])).id; // 토큰에서 user ID 추출

			await axios.post(
				'http://localhost:5001/api/problems',
				{ title, description, author_id: userId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			alert('문제가 성공적으로 등록되었습니다!');
			navigate('/');
		} catch (err) {
			console.error(err);
			setError('문제 등록 실패');
		}
	};

	return (
		<div>
			<div className="header">
				<h1 className="title">Math</h1>
			</div>
			<h2>문제 등록</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="문제 제목"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<textarea
					placeholder="문제 내용"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<button type="submit">등록하기</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
};

export default ProblemRegister;
