
pipeline {
    agent any

    options {
        disableConcurrentBuilds()
    }

    environment {
        DEPLOY_HOST = '3.26.39.159'
        DEPLOY_DIR  = '/var/www/reactapp'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/myomin313/react-blog.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
                sh 'test -f dist/index.html'
            }
        }

        stage('Deploy to ReactApp EC2') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'reactapp-ssh',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh '''
                        set -eu

                        SSH="ssh -i $SSH_KEY -o StrictHostKeyChecking=yes"
                        TARGET="$SSH_USER@$DEPLOY_HOST"

                        $SSH "$TARGET" \
                          "mkdir -p '$DEPLOY_DIR'"

                        rsync -az --delete \
                          -e "$SSH" \
                          dist/ \
                          "$TARGET:$DEPLOY_DIR/"

                        $SSH "$TARGET" \
                          "test -f '$DEPLOY_DIR/index.html'"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'React application deployed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}
