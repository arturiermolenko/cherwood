FROM python:3.10.4-slim
LABEL maintainer="arturiermolenko@gmail.com"

ENV PYTHONUNBUFFERED 1

WORKDIR app/

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

RUN mkdir -p /vol/web/media

RUN adduser \
    --disabled-password \
    --no-create-home \
    django-user

RUN chown -R django-user:django-user /vol/
RUN chmod -R 755 /vol/web/
RUN chgrp -R www-data /vol/web/
RUN chmod -R g+w  /vol/web/

USER django-user