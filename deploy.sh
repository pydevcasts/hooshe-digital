echo "Switching to branch master"
git checkout master

echo "Building app ..."
npm run build 

echo "Deploying file to server..."
scp -r Frontend/build/* siyamak@79.127.11.44:/var/www/79.127.11.44/

echo "Done!"