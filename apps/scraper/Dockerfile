# An example using multi-stage image builds to create a final image without uv.

# First, build the application in the `/app` directory.
FROM ghcr.io/astral-sh/uv:python3.12-alpine AS builder
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy

# Disable Python downloads, because we want to use the system interpreter
# across both images.
ENV UV_PYTHON_DOWNLOADS=0

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --no-install-project --no-dev

COPY . /app

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --no-dev

# Then, use a final image without uv
FROM python:3.12-alpine

# Copy the application from the builder
COPY --from=builder /app /app

WORKDIR /app

# Place executables in the environment at the front of the path
ENV PATH="/app/.venv/bin:$PATH"

# Run the application
CMD ["python", "src/main.py"]
