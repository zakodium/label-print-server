# label-print-server

Print server for network-connected label printers

## Usage with Docker

The server is published on the [Docker hub](https://hub.docker.com/r/zakodium/label-print-server).

To make it run, you need a MongoDB instance accessible from the container,
and setup the following environment variables:

- `NODE_ENV`: Default: `production`.
- `LOG_LEVEL`: Default: `info`.
- `MONGODB_URL`: URL to the MongoDB instance.
- `MONGODB_DATABASE`: Name of the MongoDB database to use.

## Test scripts

### Zebra

#### Get printer status

```console
node scripts/zebra/getStatus.js <ip address>
```

### IPP

#### Get all printer attributes

```console
node scripts/ipp/getAttributes.js <ip address>
```

#### Get printer status (selected attributes)

```console
node scripts/ipp/getStatus.js <ip address>
```
