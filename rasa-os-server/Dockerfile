FROM rasa/rasa

# change shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN ls
# the entry point
EXPOSE 5005
ENTRYPOINT ["rasa"]
CMD ["init"]
