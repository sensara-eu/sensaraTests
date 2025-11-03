// See https://github.com/sensara-eu/jenkins-pipeline-util
@Library("jenkins-pipeline-util") _

def scrambledName = "conntests"  // contracted (yet unique within the Sensara-environment) name of the project. Needed for Jenkins

static def podCustomTemplate(){
return """
 apiVersion: v1
 kind: Pod
 spec:
   nodeSelector:
     cloud.google.com/gke-nodepool: jenkins-builders
   tolerations:
   - key: "dedicated"
     operator: "Equal"
     value: "jenkins-builders"
     effect: "NoSchedule"
   serviceAccountName: jenkins
   containers:
   - name: node
     image: eclipse-temurin:21.0.5_11-jre-jammy
     command:
       - cat
     tty: true
     resources:
       requests:
         cpu: "1"
         memory: "2Gi"
       limits:
         cpu: "2"
         memory: "4Gi"
 """
}

def podLabelBuilder = eu.sensara.PipelineUtils.generateBuilderPodLabel(scrambledName)


podTemplate(namespace: eu.sensara.Constants.k8sWorkersNamespace, label: podLabelBuilder, yaml: podCustomTemplate()) {
    node(podLabelBuilder) {
        stage("Building") {
            try {
                container("node") {
                    confirm(this, "Continue ?")
                    checkout scm
                    sh "apt update"
                    sh "yes | apt install nodejs"
                    sh "node --version"
                    sh "apt install npm"
                    sh "npm --version"
                    confirm(this, "Continue ?")

                    sh "npx playwright install"
                    sh "npx playwright --version"
                    confirm(this, "Continue ?")
                    stage("Test") {
                        sh "npx playwright test"
                    }
                }
                return true
            } catch (e) {
                //PipelineUtils.notifyBuildFailed(script)
                throw e
            }
        }
    }
}

def confirm(script, String text) {
    node("master") {
        stage("Confirm from the console output!") {
            script.timeout(time: 1, unit: "DAYS") {
                script.input "$text"
            }
        }
    }
}

