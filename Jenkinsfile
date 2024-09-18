pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/tmgravin/Frontend.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t tmgchyngba/react-app .'
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker push tmgchyngba/react-app'
                }
            }
        }
        stage('Deploy using Docker Compose') {
            steps {
                sh 'docker-compose -f docker-compose.yml up -d'
            }
        }
    }
}
