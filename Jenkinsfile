pipeline {
    agent any
    
    environment {
        // Define environment variables if needed
        NODE_ENV = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your repository
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js if necessary
                    def nodeVersion = '14.x'
                    sh "nvm install ${nodeVersion}"
                    sh "nvm use ${nodeVersion}"
                    
                    // Install project dependencies
                    sh 'npm install'
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Build the Next.js application
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    // Run tests
                    sh 'npm test'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Deploy the application (customize this part as needed)
                    // This could be a command to deploy to a server or cloud provider
                    // Example: sh 'npm run deploy'
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup actions or notifications
            echo 'Pipeline completed'
        }
        success {
            echo 'Pipeline succeeded'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
