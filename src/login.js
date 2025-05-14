const auth = {
	logged_in: false,
};

let end_point = null;

function get_end_point(end_point) {
	console.log(end_point)
	localStorage.setItem('endpoint', end_point);
}

const notify = document.getElementById('notify');

const user_name = document.getElementById('username');
const password = document.getElementById('password');

async function login() {
	try {
		const res = await fetch('data.json');
		const prom = await res.json();
		return prom;
	} catch (e) {
		console.log('Error:', e);
	}
}

const redirect = () => {
	auth.logged_in = true;
	notify.innerHTML = `<div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
	localStorage.setItem('logged_in', 'true');
	setTimeout(() => {
		window.location.href = '/index.html';
	}, 2000);
};

const failed = () => {
	notify.textContent = 'Login failed, please check username or password';
};

const btn = document.getElementById('btn');

if (btn) {
	btn.addEventListener('click', () => {
		login().then(data => {
				const match = data.find(u => u.username === user_name.value);
			if (match && password.value === match.password) {
				get_end_point(match.end_point);
				redirect();
			} else {
				failed();
				console.log('nope');
			}
		});
	});
}
