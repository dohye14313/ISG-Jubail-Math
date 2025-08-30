import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProblemDetail = () => {
	const { id } = useParams();
	const [problem, setProblem] = useState(null);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');

	useEffect(() => {
		fetch(`http://localhost:5001/api/problems/${id}`)
			.then(res => res.json())
			.then(data => setProblem(data));

		fetch(`http://localhost:5001/api/comments/${id}`)
			.then(res => res.json())
			.then(data => setComments(data));
	}, [id]);

	const handleCommentSubmit = async () => {
		if (!newComment.trim()) return;
		await fetch(`http://localhost:5001/api/comments`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				problem_id: id,
				user_id: 1, // 로그인 사용자 ID가 있으면 대체
				content: newComment
			}),
		});
		setNewComment('');
		// 새로고침
		const res = await fetch(`http://localhost:5001/api/comments/${id}`);
		setComments(await res.json());
	};

	if (!problem) return <div>Loading...</div>;

	return (
		<div>
			<div className="header">
				<h1 className="title">Math</h1>
			</div>
			<div className="contents">
				<h2>{problem.title}</h2>
				<p>{problem.description}</p>

				<hr />
				<h3>댓글</h3>
				<ul>
					{comments.map((comment) => (
						<li key={comment.id}>
							<p>{comment.content}</p>
							<small>{new Date(comment.created_at).toLocaleString()}</small>
						</li>
					))}
				</ul>

				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="댓글을 입력하세요"
				/>
				<br />
				<div className="btn">
					<button onClick={handleCommentSubmit}>댓글 등록</button>	
				</div>
			</div>	
		</div>
	);
};

export default ProblemDetail;
	