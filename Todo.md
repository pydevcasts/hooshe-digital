ssh siyamak@79.127.11.44

gunicorn  conf.wsgi:application --bind 79.127.11.44:8004
pgrep gunicorn
sudo systemctl restart gunicorn.service
sudo systemctl start gunicorn.service
sudo systemctl enable gunicorn.service
systemctl daemon-reload gunicorn.service

sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
sudo systemctl status gunicorn.socket


sudo systemctl restart supervisor.service 
sudo systemctl status supervisor
sudo service nginx start

/home/siyamak/venv/bin/gunicorn.sh
sudo tail /home/siyamak/venv/logs/supervisor.log

sudo supervisorctl reload
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl status

sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled/djact.conf
sudo certbot — nginx -d 79.127.11.44 -d http://79.127.11.44

#!/bin/bash
NAME="Backend" #name of the service to be run by supervisor
DJANGODIR=/home/siyamak/venv/hooshe-digital/Backend/
SOCKFILE=/home/siyamak/venv/run/gunicorn.sock
USER=siyamak
GROUP=siyamak
NUM_WORKERS=3

DJANGO_SETTINGS_MODULE=conf.settings
DJANGO_WSGI_MODULE=conf.wsgi

echo "Starting $NAME as `whoami`"

cd $DJANGODIR
source /home/siyamak/venv/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH 

RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

exec /home/siyamak/venv/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \ 
--name $NAME \
--workers $NUM_WORKERS \
--user=$USER --group=$GROUP \
--log-level=debug \
--bind=unix:





nano /etc/supervisor/conf.d/djact.conf   
[program:Backend]
command = /home/siyamak/venv/bin/gunicorn.sh eue:work database --daemon --sleep=3 --tries=3
user = siyamak
stdout_logfile = /home/siyamak/venv/logs/supervisor.log
autostart=true
autorestart=true
redirect_stderr=true
startsecs = 0
environment=LANG=en_US.UTF-8,LC_ALL=en_US.UTF-8




sudo nano /etc/systemd/system/gunicorn.service
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target
[Service]
User=siyamak
Group=siyamak
WorkingDirectory=/home/siyamak/hooshe-digital/Backend/
ExecStart=/home/siyamak/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/siyamak/venv/run/gunicorn.sock/ conf.wsg>
[Install]
WantedBy=multi-user.target



sudo nano /etc/nginx/sites-available/myprojec
upstream Backend_app_server {
        server unix:/home/siyamak/venv/run/gunicorn.sock fail_timeout=0;
}
server {
    listen 80;
    server_name 79.127.11.44;
    client_max_body_size 4G;
    location / {
        proxy_set_header Host $http_host;
        proxy_redirect off;
        if (!-f $request_filename){
                proxy_pass http://Backend_app_server;
                }
        }
    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/siyamak/venv/hooshe-digital/Backend;
    }

#    location / {
 #       include proxy_params;
  #      proxy_pass http://unix:/run/gunicorn.sock;
   # }
}





https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04