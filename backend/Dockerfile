from python:3.9.16-alpine

workdir /opt/container

copy . .

run apk add build-base && pip install -r requirements.txt

entrypoint ["python", "main.py"]
