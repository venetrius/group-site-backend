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