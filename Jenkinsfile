pipeline {
    agent any

    environment {
        DOCKERHUB_REPO     = 'vcanedo21/brutalist_portifolio'
        DOCKERHUB_CRED_ID  = 'dockerhub_credentials'

        DOCKER_CONFIG      = '/.containers/brutalist-portifolio/docker-compose.yml'
        
        RELEASE_TAG        = "${env.GITHUB_REF ? env.GITHUB_REF.tokenize('/').last() : 'latest'}"
    }

    stages {
        stage('Visualizar Contexto') {
            steps {
                echo "Iniciando Pipeline para a Release: ${env.RELEASE_TAG}"
            }
        }

        stage('Build das Imagens Docker') {
            steps {
                script {
                    echo "Buildando imagem com a tag da release (${env.RELEASE_TAG}) e latest..."
                    // Builda a imagem localmente aplicando as duas tags
                    sh "docker build -t ${env.DOCKERHUB_REPO}:${env.RELEASE_TAG} -t ${env.DOCKERHUB_REPO}:latest ."
                }
            }
        }

        stage('Push para o DockerHub') {
            steps {
                script {
                    // Realiza o login seguro no DockerHub utilizando as credenciais do Jenkins
                    withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CRED_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    }
                    
                    echo "Publicando imagens no DockerHub..."
                    sh "docker push ${env.DOCKERHUB_REPO}:${env.RELEASE_TAG}"
                    sh "docker push ${env.DOCKERHUB_REPO}:latest"
                }
            }
        }

        stage('Deploy em Produção') {
            steps {
                echo "Iniciando o deploy em produção..."
                // Sobe o ambiente de produção apontando para as novas imagens (garanta que o docker-compose.yml use a tag correspondente ou latest)
                sh "docker compose -f ${env.DOCKER_CONFIG} up -d --build"
            }
        }
    }

    post {
        always {
            echo "Limpando imagens locais antigas para liberar espaço no servidor..."
            sh "docker image prune -f"
        }
        success {
            echo "Pipeline executado com sucesso! Release ${env.RELEASE_TAG} implantada."
        }
        failure {
            echo "Falha no pipeline. Verifique os logs para mais detalhes."
        }
    }
}