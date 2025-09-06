FROM python:3.13-slim-trixie

COPY --from=ghcr.io/astral-sh/uv:0.8.15 /uv /uvx /bin/

WORKDIR /app

COPY pyproject.toml ./

RUN uv sync --locked

COPY . .

CMD ["uv", "run", "src/main.py"]
