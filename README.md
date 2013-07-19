# QUICK WALKTHROUGH FOR NEW-COMERS:

## Pre-requisites:

### Windows:
1. Install [MsysGIT and TortoiseGit](http://code.google.com/p/tortoisegit/)
2. Install [Python 2.7](http://www.python.org/download) (NOTE: Do not download Python 3.X even if you're tempted...)
3. Install [PuttyGen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
	
### Mac OS:
1. Downalod some sore of Git client. I prefer [Source Tree](http://www.sourcetreeapp.com/).
	
## Setting up the repository:

Let's start by generating SSH keys.

### Windows:
1. Run PuttyGen
2. Generate key and save both private and public keys to /Users/<your_name>/.ssh. You don't really need to add a paraphrase. A conventional naming scheme would be id_rsa for the private key and id_rsa.pub for the public key.
3. Go to your profile page in Assembla and click on the "Manage SSH Keys" link on the left navigation bar.
4. Upload the public key you've just generated.

### Mac OS:
1. Open Terminal
2. Run "ssh-keygen -t rsa" and follow the instructions. No need to add a paraphrase if you don't feel like. The public and private keys will be generated to /Users/<your_name>/.ssh.
3. Go to your profile page in Assembla and click on the "Manage SSH Keys" link on the left navigation bar.
4. Upload the public key you've just generated.

Now we can clone the Git repository.

### Windows:
1. TortoiseGit is integrated into Windows Explorer, so when you right click somewhere inside a Windows Explorer window you get the TortoiseGit context menu. Navigate to the folder in which you want to repository to reside.
2. Right click -> from the context menu select "Git Clone..."
3. In the URL box put: git@git.assembla.com:hebrew-khan.git
4. Check the "Recursive" checkbox.
5. Check "Load Putty Key" and click on the "..." button. Browse to /Users/<your_name>/.ssh and select the private key.
6. Click on "OK" and wait for Tortoise to finish cloning the repository. This will create a new folder called hebrew-khan.

### Mac OS:
If you chose to use Source Tree then you can use its very friendly UI to clone the repository. The clone URL can be found at the top of this page. 
If you're more of a shell guy/lady (which is very appreciated), then you probably know what you're doing and don't need real assistance. But just in case you forgot:
1. Go to the location in which the repository should reside.
2. run "git clone git@git.assembla.com:hebrew-khan.git". This will create a new folder called hebrew-khan.

Finally let's run a simple HTTP server to server our files.

1. (WINDOWS ONLY) Add the python installation directory to your PATH variable. Run python from cmd to see if it's working.
2. Go to the hebrew-khan folder you've just cloned.
3. Run "python -m SimpleHTTPServer". This command will run a very simple HTTP server (surprising...) that will server the files under hebrew-khan. You can use this to see your work in progress. NOTE: by default the HTTP server runs on port 8000. If this port is already taken then you can run "python -m SimpleHTTPServer <choose_a_free_port>".
4. Open a browser and go to http://localhost:8000. You should see the hebrew-khan file directory.
5. Got to /exercises and open one of the exercises HTML files. See if it's working.