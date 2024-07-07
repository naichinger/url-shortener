# URL Link Shortener
<p style="display: flex">

[<img src="https://icon.icepanel.io/Technology/png-shadow-512/Quarkus.png" alt="quarkus icon" width="50"/>](https://quarkus.io/)
[<img src="https://icon.icepanel.io/Technology/svg/PostgresSQL.svg" alt="postgresSQL icon" width="50"/>](https://www.postgresql.org/)
[<img src="https://icon.icepanel.io/Technology/svg/Angular.svg" alt="angular icon" width="50"/>](https://angular.dev/)
[<img src="https://icon.icepanel.io/Technology/png-shadow-512/Helm.png" alt="helm icon" width="50"/>](https://helm.sh/)
[<img src="https://icon.icepanel.io/Technology/svg/Docker.svg" alt="docker icon" width="50"/>](https://www.docker.com/)
[<img src="https://icon.icepanel.io/Technology/svg/Kubernetes.svg" alt="kubernetes icon" width="50"/>](https://kubernetes.io/)
[<img src="https://icon.icepanel.io/Technology/svg/Java.svg" alt="java icon" width="50"/>](https://www.java.com/)
[<img src="https://icon.icepanel.io/Technology/svg/TypeScript.svg" alt="typescript icon" width="50"/>](https://www.typescriptlang.org/)

</p>

## Live DEMO: https://shrt.k3s.naichinger.com

This project is a URL shortener application designed to provide a simple and efficient way to shorten long URLs. The frontend is built using Angular, while the backend is developed with Quarkus and uses PostgreSQL as the database.

Key Features:

- **Backend Functionality:** Generates a random string of characters for each provided URL and stores both the original URL and the shortened string in the PostgreSQL database.
- **Frontend Interface:** Allows users to input URLs and receive their shortened versions.
- **Containerization and Deployment:**
  - Uses Helm charts to package the application for deployment on Kubernetes.
  - Employs GitHub Actions to create Docker images for the frontend and backend.
  - Utilizes ArgoCD for continuous deployment (CD) within the Kubernetes cluster.

This setup ensures a streamlined development and deployment process, making it easy to manage and scale the URL shortener application.

[![](docs/screenshot.png)](https://shrt.k3s.naichinger.com)

## Workflow

When a contributor makes a commit to the main branch, a GitHub Action is triggered. This action creates new Docker images for both the backend and frontend, tagging them with the first eight characters of the commit hash. Once these images are pushed to the registry, another workflow is triggered to update the application version in the Helm chart's `values.yml` file.

Additionally, when a tag is pushed, a GitHub Action is triggered that updates the version in the `values.yml` file using the tag (e.g., `1.0.2`) as the new version number.


## ArgoCD

![](docs/argocd.png)
