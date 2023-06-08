
<div align="center">
<h1 align="center">

<br>
p2p-json
</h1>
<h3 align="center">📍 Share and exchange without the centralized reign, powered by p2p-json on GitHub domain!</h3>
<h3 align="center">⚙️ Developed with the software and tools below:</h3>

<p align="center">
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=for-the-badge&logo=Nodemon&logoColor=white" alt="Nodemon" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=for-the-badge&logo=ts-node&logoColor=white" alt="tsnode" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=for-the-badge&logo=JSON&logoColor=white" alt="JSON" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=for-the-badge&logo=Markdown&logoColor=white" alt="Markdown" />
</p>
</div>

---


## Overview

This project is a basic implementation of a peer-to-peer network using NodeJS. It provides a Node class that enables nodes to connect and communicate with each other using sockets and messages of specified packet types. The core functionalities offered include broadcasting and direct messaging, handling connections and incoming messages, and generating unique node IDs. Overall, this project serves as a simple yet functional framework for initiating small, decentralized networks with a variety of use cases.

---

## Project Structure


```bash
repo
├── README.md
├── nodemon.json
├── package-lock.json
├── package.json
├── src
│   └── index.ts
└── tsconfig.json

2 directories, 6 files
```

---

## Modules

<details closed><summary>Src</summary>

| File     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                     | Module       |
|:---------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------|
| index.ts | The code snippet provides a Node class with methods like broadcast and direct message, handshake and connect with other nodes, as well as handling incoming messages and connections using sockets and packets of specified packet types. The class utilizes an EventEmitter for event handling and a UUID package to generate unique node IDs, providing the rough backbones of a simple NodeJS-based peer-to-peer network implementation. | src/index.ts |

</details>

---

## Getting Started



### Installation

1. Clone the p2p-json repository:
```sh
git clone https://github.com/putto11262002/p2p-json
```

2. Change to the project directory:
```sh
cd p2p-json
```

3. Install the dependencies:
```sh
npm install
```

### Using p2p-json

```sh
npm run build && node dist/main.js
```


