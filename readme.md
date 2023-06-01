# Faça o clone do projeto

> git clone https://github.com/rafapalamim/catalogo_veiculos_laravel.git deploy

Entre na pasta criada

> cd deploy

# Execute o shell script

Talvez seja necessário colocar permissão de execução no script

```bash
chmod +x deploy.sh
ou
chmod +x deploy_sudo.sh
```

Execute o comando deploy_sudo.sh

```bash
bash deploy.sh
ou
bash deploy_sudo.sh
```

O front-end será servido em http://localhost:3000. A API, em http://localhost

# Área administrativa

usuário: admin@verzel.com
senha: password

O acesso foi criado no processo de seed, crio também 10 veículos por padrão.