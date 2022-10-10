FROM python:3.10-buster
ENV AM_I_IN_A_DOCKER_CONTAINER Yes

RUN pip install --upgrade pip && \
    pip install pipenv==2022.10.4
    
COPY . /app
WORKDIR /app

RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

EXPOSE 8080
CMD pipenv run python manage.py runserver 0.0.0.0:8080