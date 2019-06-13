# Analyze This

## Overall Architecture

```
                             -----------------------
                             |         App         |
                             -----------------------
                                        |
                                        |  POST http://localhost:3000
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

## Local Dashboard Development

It is possible to work solely on the dashboard without running the full docker setup.

```bash
cd src/dashboard
npm run serve
```

You can now access the dashboard at http://localhost:8080/static/ and it will automatically feed in mock events for you.  Updates should be live-reloaded into the dashboard.
