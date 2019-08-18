install:
	npm install

develop:
	npm run develop

build:
	npm run build

deploy:	
	build
	npx surge --domain `cat ./CNAME` --project dist/ 

lint:
	npm run lint
