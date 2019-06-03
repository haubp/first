all:
	git add -A
	git commit -m "haubp update"
	git push heroku master
	heroku ps:scale web=1
