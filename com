
docker-compose up -d 


htpasswd -Bc auth/htpasswd admin 
htpasswd -B auth/htpasswd newuser
docker run -d -p 5000:5000 --name docker-registry registry:2
curl http://localhost:5000/v2/_catalog
docker run -d -p 5001:5000 --name registry registry:2 
docker run -d -p 5000:5000 --name registry registry:2



  
docker-compose down 
kubectl apply -f nginx-pod.yaml
kubectl apply -f nginx-srv.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
kubectl apply -f mongo-data.yaml  


kubectl get pods
kubectl get svc
kubectl get deployments
kubectl get pv
kubectl get pvc
