FROM pytorch/pytorch:1.3-cuda10.1-cudnn7-devel

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN git clone https://github.com/NVIDIA/apex.git && cd apex && python setup.py install --cuda_ext --cpp_ext

RUN apt-get update && apt-get -y install libglib2.0-0 libsm6 libxext6 libxrender-dev

WORKDIR /workspace

RUN pip install cupy

ENV TORCH_HOME=/tmp/torch-cache

RUN apt-get -y install ffmpeg

COPY ./requirements.txt ./requirements.txt

RUN pip install -r ./requirements.txt

