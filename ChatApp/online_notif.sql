CREATE TABLE online_notif (
	online_status BOOLEAN NOT NULL,
	last_logged_in TIMESTAMP,
	user_id INTEGER REFERENCES users(user_id) NOT NULL UNIQUE
)

SELECT * FROM online_notif;