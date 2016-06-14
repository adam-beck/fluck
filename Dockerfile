FROM ghost:latest

RUN mkdir -p /var/lib/ghost/themes/fluck
COPY ./ /var/lib/ghost/themes/fluck

