Portfolio
=========


Start the project
-----------------

Open terminal to retrieve and run the server
```
	cd /Users/alexagueguen/Documents/Portfolio
  git pull --rebase origin master
	npm start
```

If you have uncommited changes, git will cry, to help it feel better, save your changes then pull again as below:
```
  git add --all
  git commit -m "What you change"
  git push origin master
  git pull --rebase origin master
```

Save everything
---------------

```
  git add --all
  git commit -m "What you change"
  git push origin master
```


Save changes detailled
----------------------

Once all files are saved

If file does not exist
```
	git add README.md
```

If file already exists
```
	git add -p
	git commit -m "What you change"
```

If you don't know what has changed

```
	git status
```

Push changes to Github

```
	git push origin master
```

