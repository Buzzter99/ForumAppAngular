# BusarovForumApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server
Run npm install to install required dependencies.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Project uses angular as a frontend framework and tailwindcss as a styling library.Project can be run after cloning. In order to achieve full functionality of the application a working backend must be working which documentation can be found on https://github.com/Buzzter99/ForumAppREST.Project.Application uses ci/cd and deploys every time there is some change in the main branch that pushes changes of the image to dockerhub. Application is deployed in OCI(Oracle Cloud) on http://158.180.62.108. Server runs crontab once a day in 12:00 and pulls latest changes in the docker repository. Full project can be run with docker-compose file found in the current repository of the project. If file environment.prod.ts does not exist dockerfile build will fail.See workflow file for more clarity about pushing image to production env. When application is used for production(Containers) image application is working on http(port 80).
