import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PostPage() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	// 임시로 작성자 ID 하드코딩 (실제론 로그인 기반으로 불러와야 함)
	const author_id = 1;

	const handleSubmit = () => {
		if (!title || !content) {
			alert('제목과 내용을 모두 입력하세요.');
			return;
		}

		axios.post('http://localhost:5001/api/problems', {
			title,
			content,
			author_id
		})
			.then(() => {
				alert('문제가 등록되었습니다.');
				navigate('/');
			})
			.catch(err => {
				console.error(err);
				alert('문제 등록에 실패했습니다.');
			});
	};

	return (
		<div className="p-4 max-w-xl mx-auto">
			<div className="header">
				<h1 className="title">Math</h1>
			</div>
			<div className="contents">
				<h2 className="text-2xl font-bold mb-4">문제 등록</h2>
				<input
					className="border p-2 mb-2 w-full"
					placeholder="제목"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					className="border p-2 mb-2 w-full h-32"
					placeholder="문제 내용을 입력하세요"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<div className="btn">
					<button
						className="bg-blue-500 text-white px-4 py-2 w-full"
						onClick={handleSubmit}
					>
						등록하기
					</button>
				</div>
			</div>
		</div>
	);
}
