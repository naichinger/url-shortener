# URL Link Shortener
<p style="display: flex">
<img src="https://icon.icepanel.io/Technology/png-shadow-512/Quarkus.png" alt="quarkus icon" width="50"/>
<img src="https://icon.icepanel.io/Technology/svg/PostgresSQL.svg" alt="postgresSQL icon" width="50"/>
<img src="https://icon.icepanel.io/Technology/svg/Angular.svg" alt="angular icon" width="50"/>
<img src="https://icon.icepanel.io/Technology/png-shadow-512/Helm.png" alt="helm icon" width="50"/>
<img src="https://icon.icepanel.io/Technology/svg/Docker.svg" alt="docker icon" width="50"/>
<img src="https://icon.icepanel.io/Technology/svg/Kubernetes.svg" alt="kubernetes icon" width="50"/>
<img src="https://icon.icepanel.io/Technology/svg/Java.svg" alt="java icon" width="50"/>
<img src="https://icon.icepanel.io/Technology/svg/TypeScript.svg" alt="typescript icon" width="50"/>
</p>

## Live DEMO: https://shrt.k3s.naichinger.com

This is demo app for continuous deployment of a helm app with argo cd. It uses quarkus as a backend which stores links in a postgres database.

![](docs/screenshot.png)

## Workflow

When a contributor commits on the main branch a github action gets triggered. This github actions creates new images for the backend and frontend and tags them with the first eight characters of the commit hash. After both images are pushed to the registry another workflow get triggered which updates the version of the application in the helm chart `values.yml`. There also exists another trigger for when a tag gets pushed which will also update values file.


## ArgoCD

![](docs/argocd.png)