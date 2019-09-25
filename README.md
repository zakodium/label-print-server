# label-print-server

Print server for network-connected label printers

## Test scripts

### Zebra HTTP

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
