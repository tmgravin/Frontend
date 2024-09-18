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
                script {
                    // Stop and remove any existing containers
                    sh 'docker-compose -f docker-compose.yml down'

                    // Find and stop any running container using the same port (in case something else is holding it)
                    sh '''
                    RUNNING_CONTAINER=$(docker ps -q --filter ancestor=tmgchyngba/react-app)
                    if [ ! -z "$RUNNING_CONTAINER" ]; then
                        docker stop $RUNNING_CONTAINER && docker rm $RUNNING_CONTAINER
                    fi
                    '''

                    // Deploy the new version of the app
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
}
