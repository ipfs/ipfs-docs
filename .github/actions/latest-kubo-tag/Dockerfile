FROM golang:1.17

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y jq && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
