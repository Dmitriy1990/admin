exports.API_SERVERS = [
  {
    "type": "rest",
    "url": "https://dev.planb.buzz/api/docs/controllers/swagger.json",
    "output": "src/api",
    "name": "Rest"
  },
  {
    "type": "s-server",
    "url": "https://dev.planb.buzz/api/docs/hubs/swagger.json",
    "output": "src/api",
    "name": "Server"
  },
  {
    "type": "s-client",
    "url": "https://dev.planb.buzz/api/docs/hubs.client/swagger.json",
    "output": "src/api",
    "name": "Client"
  },
];