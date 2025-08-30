import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePages() {
	const [problems, setProblems] = useState([]);

	useEffect(() => {
		// 서버에서 문제 리스트 가져오기
		axios.get('https://isg-jubail-math.onrender.com/api/problems')
			.then(res => setProblems(res.data))
			.catch(err => console.error('문제 불러오기 실패:', err));
	}, []);

	return (
		<div>
			<div className="header">
				<h1 className="title">Math</h1>
			</div>
			<div className="contents">
				<h2 className="problem_list">문제 목록</h2>
				{problems.length === 0 ? (
					<div>
						<p>등록된 문제가 없습니다.</p>
					</div>
				) : (
					<ul>
						{problems.map(problem => (
							<li key={problem.id}>
								<strong>{problem.title}</strong><br/>
								{problem.content}
							</li>
						))}
					</ul>
				)}		
			</div>
			<div className="footer">
				<div className="btn">
					<Link to="/problems/new">
						<button>문제 등록하러 가기</button>
					</Link>
				</div>
				<div className="btn">
					<Link to="/problems">
						<button>문제 보러가기</button>
					</Link>
				</div>
				<div className="btn">
					<Link to="/login">
						<button>로그인하기</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
