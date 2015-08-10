mkdir cert
cd cert
openssl genrsa -out quiz-ds-key.pem 2048
openssl req -new -sha256 -key quiz-ds-key.pem -out quiz-ds-csr.pem
openssl x509 -req -in quiz-ds-csr.pem -signkey quiz-ds-key.pem -out quiz-ds-cert.pem
