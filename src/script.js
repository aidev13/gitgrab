const log = localStorage.getItem('logged_in');
const end_point = localStorage.getItem('endpoint');

console.log(end_point);
document.getElementById('logout_btn').addEventListener('click', () => {
	localStorage.clear();
	window.location.href = '/login.html';
});

const gitHub = async git_endpoint => {
	if (!log) {
		console.log('not logged it');
		document.getElementById('zebra').innerHTML = `
  <h2>404 Forbidden access</h2>
  <a href="login.html" class="btn btn-primary mt-3">Go to Login</a>
`;
	} else {
		try {
			const res = await fetch(`https://api.github.com/users/${end_point}`);
			const prom = await res.json();
			return prom;
		} catch (e) {
			console.log('error:', e);
		}
	}
};

const login_name = document.getElementById('profile_name');
const profile_pic = document.getElementById('profile_pic');
const bio = document.getElementById('about');
const repos = document.getElementById('repos');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const member = document.getElementById('member');
const git_link = document.getElementById('git_link');

gitHub().then(d => {
	console.log(d);
	login_name.textContent = d.login;
	profile_pic.src = d.avatar_url;
	bio.textContent = d.bio;
	repos.textContent = d.public_repos;
	followers.textContent = d.followers;
	following.textContent = d.following;
	member.textContent = d.created_at;
	git_link.href = d.html_url;
});
