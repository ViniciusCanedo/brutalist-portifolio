pipeline {
    agent any

    environment {
        DOCKERHUB_REPO    = 'vcanedo21/brutalist_portifolio'
        DOCKERHUB_CRED_ID = 'dockerhub_credentials'
        
        RELEASE_TAG       = "${env.GITHUB_REF ? env.GITHUB_REF.tokenize('/').last() : 'latest'}"
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

        stage('Testes Automatizados (PEST & Socket)') {
            steps {
                script {
                    try {
                        echo "Subindo ambiente de testes com Docker Compose..."
                        // Sobe os serviços de teste (ex: App, Banco de Dados, Redis)
                        sh "docker compose -f docker-compose.test.yml up -d"

                        echo "Executando auditoria de dependências com o Socket..."
                        // Executa a verificação do Socket (ajuste o comando conforme seu setup, ex: via npx ou cli global)
                        sh "docker compose -f docker-compose.test.yml exec -T app npx socket cli scan"

                        echo "Executando testes automatizados com PEST PHP..."
                        // Executa os testes do Laravel 12 usando PEST
                        sh "docker compose -f docker-compose.test.yml exec -T app php artisan test --parallel"
                        
                    } finally {
                        echo "Limpando o ambiente de testes..."
                        // Garante que os containers de teste serão derrubados mesmo se os testes falharem
                        sh "docker compose -f docker-compose.test.yml down -v"
                    }
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
                sh "docker compose -f docker-compose.yml up -d --build"
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