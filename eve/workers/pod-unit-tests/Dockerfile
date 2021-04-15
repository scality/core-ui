FROM centos:7

ARG BUILDBOT_VERSION=2.0.1

ENV LANG=en_US.utf8

WORKDIR /home/eve/workspace

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y epel-release \
    && yum install -y gcc \
    make \
    python-devel \
    python-pip \
    python36 \
    python36-devel \
    python36-pip \
    git \
    nodejs \
    && adduser -u 1042 --home /home/eve eve \
    && chown -R eve:eve /home/eve \
    && python3.6 -m pip install \
       buildbot-worker==${BUILDBOT_VERSION}
