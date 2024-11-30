docker compose -f docker-compose.gitlab.yml exec runner gitlab-runner register \
    --non-interactive \
    --docker-tlsverify=false \
    --url "http://gitlab.vbcard" \
    --token "token" \
    --executor "docker" \
    --docker-image "docker:27.3.1-dind" \
    --docker-network-mode "vbcard-api_gitlab_default" \
    --docker-privileged