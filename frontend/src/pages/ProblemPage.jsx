import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProblemPages() {
	const [problems, setProblems] = useState([]);

	useEffect(() => {
		let mounted = true;

		axios
			.get('https://isg-jubail-math.onrender.com/api/problems')
			.then((res) => {
				// ✅ 불변 업데이트: 새 객체로 복사해서 참조 고정
				const data = Array.isArray(res.data) ? res.data : [];
				const normalized = data.map((p) => {
					// 키 불일치 대비(혹시 author/user_name로 오는 경우)
					const uname =
						(typeof p.username === 'string' && p.username) ||
						(typeof p.author === 'string' && p.author) ||
						(typeof p.user_name === 'string' && p.user_name) ||
						'';
					return { ...p, username: uname };
				});
				if (mounted) setProblems(normalized);
			})
			.catch((err) => {
				console.error('[GET /api/problems] failed:', err?.response?.data || err.message);
			});

		return () => {
			mounted = false;
		};
	}, []);

	return (
		<div className="p-4">
			<div className="header">
				<h1 className="title">Math</h1>
			</div>

			<div className="contents">
				<h2 className="text-2xl font-bold mb-4">문제 목록</h2>

				{problems.length === 0 ? (
					<p className="text-gray-700">등록된 문제가 없습니다.</p>
				) : (
					problems.map((problem) => (
						<div key={problem.id ?? `${problem.title}-${Math.random()}`} className="border p-4 mb-2 shadow">
							<h3 className="text-xl font-semibold mb-1">
								<Link to={`/problems/${problem.id}`} className="text-blue-500">
									{problem.title}
								</Link>
							</h3>

							{/* ✅ 안전 가드 + 명시 색상(테마 충돌 예방) */}
							<div className="text-sm mb-2 text-gray-800">
								작성자 ID:{' '}
								<span className="font-semibold">
									{problem?.username?.trim() || '(익명)'}
								</span>
							</div>

							{/* 디버그용: 필요할 때만 잠깐 켜서 실제 렌더 시점 값을 확인하세요 */}
							<pre className="text-xs bg-gray-50 border rounded p-2 overflow-auto">
								{JSON.stringify(problem, null, 2)}
							</pre>
						</div>
					))
				)}

				<div className="btn mt-4">
					<Link to="/problems/new">
						<button>문제 등록하러 가기</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
