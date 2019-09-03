# Celsius gRPC API

a cross language implementation of celsius's api for speedy and efficient data transfer / streaming.

[grpc](https://grpc.io/) uses a single connection over http2 to transfer data, so there is less data transferred, and it is done using [protobufs](https://developers.google.com/protocol-buffers/docs/overview) which is a buffer structure so you don't have string parsing then object parsing in whichever language you're in like http.

`protos/v1.proto` folder has the protobuf definition. `server` folder has the server. `client` has an example of what a client might look like, which is used in the `tests/unit` files.

based the repo on the docs available here: https://developers.celsius.network/swagger/

it seems like there is a slightly more up to date [sdk](https://github.com/CelsiusNetwork/celsius-js-sdk) though so i may try to use that to fill in some gaps until the full api comes out

until then, i just used the publicly accessable apis to fill in some gaps that i found in the dev tools of their home page

- [supported currencies](https://api.celsius.network/api/v3/web/supported_currencies)
- [community](https://api.celsius.network/api/v3/web/community)
