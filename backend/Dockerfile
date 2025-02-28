FROM ubuntu:20.04
#setup user and add bash shell as default shell for user sandbox
RUN useradd -ms /bin/bash sandbox

# add working directory

WORKDIR /home/snadbox

#Update Ubuntu machine 
RUN apt update && apt upgrade -y

#install nano and curl 
RUN apt install nano curl -y
#install node js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash && apt-get install -y nodejs


RUN echo "PS1='\w'" >> /home/sandbox/.bashrc
# final working dorectory
WORKDIR /home/sandbox/app