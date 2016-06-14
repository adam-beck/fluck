`docker run -i -t -v $PWD:/var/lib/ghost/themes/fluck -P ghost`

Run default gulp task pointed to the exposed port (use `docker ps` to find port #)
Example:

PORT=12345 gulp

Hit localhost:3000 (proxies the ghost blog)
