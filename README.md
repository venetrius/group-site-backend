# Deploying to Heroku:
## To make it compatible with current PG cient version and Heroku requiremens
- It is important to specify
    ```javascript
        ssl: { rejectUnauthorized: false }
    ```
    in the knex file production settings.
- To work around error:
    ```javasript
    sql_error_code = 28000 FATAL: no pg_hba.conf entry for host "122.180.247.11", user "u3idolso5k2v83", database "dc85788d13v9ej", SSL off
    ```
    Specify next env var in Heroku:
    ``` PGSSLMODE=no-verify ```


# Developing Locally
##Clone branch: 
```
git clone https://github.com/venetrius/group-site-backend.git
```
## run `npm -i` to download dependencies

## get PSQL if you don't have it yet
https://www.postgresql.org/download/
create a new data base using console or pgAdmin

## Create GitHub app 
https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app

## Copy paste .env-example end rename it to .env
It is in the root folder
Fill out details using you new DB and GitHub app credentials

## Run `npm start` to run server

## +1 to run front end clone: https://github.com/software-developers-of-calgary/groupsite.git 

