# Analyze This

## Overall Architecture

```
                             -----------------------
                             |         App         |
                             -----------------------
                                        |
                                        |  POST /event
                                        V
                             -----------------------
                             |      Publisher      |
                             -----------------------
                                        |
                                        |  Publish
                                        V
                             -----------------------
                             |        Redis        |
                             -----------------------
                                       /\
                                      /  \
                                     /    \
                                    /      \
                        Subscribe  /        \  Subscribe
                                  /          \
                                 /            \
                                /              \
                               V                V
            -----------------------          ------------------------
            |  Console Subscriber |          | Dashboard Subscriber |
            -----------------------          ------------------------
                                                        ^
                                                        |  Socket.io
                                                        V
                                             -----------------------
                                             |    Dashboard App    |
                                             -----------------------


```

## Building and Running

```bash
git clone git@github.com:brophdawg11/analyze-this.git
cd analyze-this/
docker-compose build
docker-compose up
```

You can now access the dashboard at http://localhost:3003/

Events can be sent to the publisher at http://localhost:3000:

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"timestamp": "2019-06-12T12:00:00.000Z", "type": "add-to-cart", "productSlug": "jacket", "tracer": "tracer"}' \
     http://localhost:3000/event
```

## Local Dashboard Development

It is possible to work solely on the dashboard without running the full docker setup.

```bash
cd src/dashboard
npm run serve
```

You can now access the dashboard at http://localhost:8080/static/ and it will automatically feed in mock events for you.  Updates should be live-reloaded into the dashboard.
