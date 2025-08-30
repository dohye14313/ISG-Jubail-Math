import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProblemPages() {
	const [problems, setProblems] = useState([]);

	useEffect(() => {
		axios.get('https://isg-jubail-math.onrender.com/api/problems')
			.then(res => setProblems(res.data))
			.catch(err => console.error(err));
	}, []);

	return (
		<div className="p-4">
			<div className="header">
				<h1 className="title">Math</h1>
			</div>
			<div className="contents">
				<h2 className="text-2xl font-bold mb-4">문제 목록</h2>
				{problems.length === 0 ? (
					<p>등록된 문제가 없습니다.</p>
				) : (
					problems.map(problem => (
						<div key={problem.id} className="border p-4 mb-2 shadow">
							<h3 className="text-xl font-semibold mb-1">{problem.title}</h3>
							<p className="text-sm mb-2">작성자 ID: {problem.userId}</p>
							{console.log(problem)}
							<Link to={`/problems/${problem.id}`} className="text-blue-500">상세보기</Link>
						</div>
					))
				)}
			</div>
		</div>
	);
}