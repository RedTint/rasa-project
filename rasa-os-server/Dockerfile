FROM python:3.6-slim as base

RUN apt-get update -qq \
 && apt-get install -y --no-install-recommends \
    # required by psycopg2 at build and runtime
    libpq-dev \
     # required for health check
    curl \
 && apt-get autoremove -y

FROM base as builder

RUN apt-get update -qq && \
  apt-get install -y --no-install-recommends \
  build-essential \
  wget \
  openssh-client \
  graphviz-dev \
  pkg-config \
  git-core \
  openssl \
  libssl-dev \
  libffi6 \
  libffi-dev \
  libpng-dev

RUN pip3 install rasa==2.0.0rc2

RUN mkdir /usr/src/app
COPY ./ /usr/src/app/
WORKDIR /usr/src/app

# RUN useradd -ms /bin/bash admin
# RUN chown -R admin:admin /usr/src/app
# RUN chmod -R 777 /usr/src/app
# USER admin

# Print the rasa version for added confirmation
RUN rasa --version

# # [BUG] Run training - initially trained model doesn't get stored in ./models folder
# # We can always run training through an API call
# RUN echo -e "no\n" | rasa train --fixed-model-name base-model

# the entry point
EXPOSE 5005

# Run Rasa OS Server
ENTRYPOINT ["rasa"]
CMD ["run", "--enable-api"]
