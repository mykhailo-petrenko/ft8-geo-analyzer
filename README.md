# (WIP) Geographical analyzer of received WSJT-X packages



## `tools/udp-broadcast.js` is to sent UDP packages received from 1 port to N configured ports

Problem: WSJT-X send received data, heartbeat and status to 1 UDP port (default 2237). 
RUMlogNG listen this port and can log automatically digi GSO.
In the same time I would like to listen same port using JT-Bridge and by my custom sript to collect the perception statistics.

Since we can not listen one UDP port by few applications I wrote simple script udp-broadcast.js to multicast/forward traffic from one port to few (for each application)

- WSJT-X send data to UDP 2237
- RUMlogNG listen UDP 2238
- JT-Bridge listen UDP 2239 
- `tools/listen.js` listen UDP 2240