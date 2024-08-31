# DenProx

## Table of Contents
- [Introducing](#introducing)
- [Implementation](#implemetation)
- [Basic Requirements](#basic-requirements)
- [Directory Structure](#directory-structure)
- [Coding Guidelines](#coding-guidelines) 
- [Simple Guide Documentation Branch Repository](#simple-guide-documentation-branch-repository)
- [Roadmap](#roadmap) 
- [Contact](#contact)
- [License](#license)
  
## Introducing

DenProx Api Gateway is a gateway to handle RESTful API & Reverse Proxy & Single Sign On Application written using the nodejs programming language.

## Implementation

![Sampe Get API](./asset-readme/Aristeku.png)

## Basic Requirements

1. Version nodejs: >= v14.15.3
2. version mongodb: >= v.6.0
3. version redis: >= 5.0.0

## Directory Structure
<pre><code>├── app
    └── config
    └── model
├── lib
    └── *.go
├── test
├── node_modules
└── server-login.js
└── server.js
</code></pre>

- app/Config/       : Place for all global config 
- app/config/lib    : Place for all global function
- test/             : Place for unit test & integration test
- server-login.js   : Script for logic login gateway
- server.js         : Script for logic proxy


## Coding Guidelines ##
Coding standar use linter [eslint](https://eslint.org/) 


## Simple Guide Documentation Branch Repository

1. The **dev-x.x.x** branch corresponds to the release actively under development.
2. The **stable-x.x.x** branches correspond to stable releases.
3. Create a branch based on **dev.x.x.x** and set up a development environment if you want to open a PR by issue (feature / bug).

   example: **dev-v.1.1.0-feature-use-linter-code-group-lib-and-file-server-js**

## Instalation

For get latest version stable, you can get from this : 

<code>git clone https://github.com/dendie-sanjaya/den-api-gateway.git</code>

## Roadmap
Based on team and community feedback, an initial roadmap will be published for a major or minor version (ex: 1.0.0, 1.1.0). The Roadmap page details what is planned and how to influence the roadmap.
you can see in : 
1. [GitHub Projects for den-api-gateway](https://github.com/dendie-sanjaya/den-api-gateway/projects?query=is%3Aopen)
2. [GitHub Milestones for den-api-gateway](https://github.com/dendie-sanjaya/den-api-gateway/milestones)


## Contact & Author

DenPro was created by Dendie and has many contributions  Thanks everyone!

If you have question, you can contact this email   
Email: dendie.sanjaya@gmail.com

## License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
